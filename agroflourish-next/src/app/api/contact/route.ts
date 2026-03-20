import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "hello.agroflourish@gmail.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Name is required (at least 2 characters)." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return NextResponse.json({ error: "Valid phone number is required (8–15 digits)." }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: "AgroFlourish Contact <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Contact form: ${name}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(phoneRaw || phoneDigits)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
