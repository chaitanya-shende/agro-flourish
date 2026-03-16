import { Leaf, Droplet, CalendarDays, TrendingUp, Beaker, Sprout, Box, CheckCircle2 } from "lucide-react";

export const siteContent = {
  global: {
    businessName: "AgroFlourish",
    tagline: "Fresh, Pesticide-Free Hydroponic Vegetables Grown Locally.",
    shortDescription: "We grow plants smartly without soil, using nutrient-rich water and coco peat for a sustainable future.",
  },
  contact: {
    phone: "+91 97672 56288",
    whatsapp: "+919767256288",
    email: "hello.agroflourish@gmail.com",
    address: "Bhandara, Maharashtra, India",
    mapsUrl: "https://maps.app.goo.gl/g6Qjf6VeSaFQNBsAA",
    socials: {
      instagram: "https://www.instagram.com/agro.flourish",
      facebook: "https://www.facebook.com/agroflourish",
      youtube: "https://www.youtube.com/@agroflourish"
    },
  },
  hero: {
    title: "Fresh, Pesticide-Free Hydroponic Vegetables",
    subtitle: "Grown locally. Delivered fresh. We use advanced hydroponic farming with coco peat and nutrient-rich water to bring you the cleanest, tastiest produce all year round.",
    badges: ["Pesticide Free", "90% Less Water", "Daily Fresh Harvest", "Farm to Home"],
  },
  about: {
    title: "About AgroFlourish",
    mission: "Our mission is to revolutionize local food systems by growing the freshest, most nutrient-dense produce while protecting our planet's precious resources.",
    description: "At AgroFlourish, we believe that the future of farming is smart, sustainable, and soil-less. We replaced traditional farming challenges with precise hydroponic technology. By using a growing medium of natural coco peat and carefully balanced, nutrient-rich water, our plants get exactly what they need to thrive. The result? Unbelievably crisp, delicious, and 100% pesticide-free vegetables that go from our climate-controlled farm straight to your table.",
  },
  whyHydroponics: [
    { title: "100% Pesticide Free", description: "Our controlled indoor environment eliminates pests naturally, meaning zero harsh chemicals touch your food.", icon: Leaf },
    { title: "90% Less Water", description: "We recirculate our nutrient-rich water, using a fraction of the water required by traditional soil farming.", icon: Droplet },
    { title: "Year-Round Growing", description: "Seasons don't dictate our harvest. We provide a consistent supply of your favorite greens 365 days a year.", icon: CalendarDays },
    { title: "Faster, Healthier Growth", description: "Direct delivery of oxygen and nutrients to the roots means our plants grow up to 50% faster and healthier.", icon: TrendingUp },
  ],
  howItWorks: [
    { step: "01", title: "Nutrient Water Prep", description: "We meticulously balance essential plant nutrients in pure water, creating the perfect food source.", icon: Beaker },
    { step: "02", title: "Seed Germination", description: "Premium, non-GMO seeds are sprouted in a dedicated nursery to ensure strong, healthy seedlings.", icon: Sprout },
    { step: "03", title: "Coco Peat Medium", description: "Seedlings are transplanted into organic coco peat, supporting roots while allowing optimal oxygen flow.", icon: Box },
    { step: "04", title: "Daily Care & Harvest", description: "We monitor climate and water daily, harvesting only when perfectly ripe for maximum flavor.", icon: CheckCircle2 },
  ],
  products: [
    { name: "Crisp Butterhead Lettuce", description: "Sweet, buttery flavor with a tender, crisp texture. Perfect for premium salads.", category: "Leafy Greens", available: true, emoji: "🥬" },
    { name: "Tuscan Kale", description: "Dark, nutrient-dense leaves. Exceptionally tender compared to soil-grown varieties.", category: "Leafy Greens", available: true, emoji: "🥬" },
    { name: "Sweet Basil", description: "Highly aromatic, large-leaf basil that elevates any pasta, pizza, or pesto.", category: "Herbs", available: true, emoji: "🌿" },
    { name: "Ruby Cherry Tomatoes", description: "Vine-ripened, incredibly sweet and bursting with flavor. A perfect healthy snack.", category: "Fruiting", available: true, emoji: "🍅" },
    { name: "Vibrant Bell Peppers", description: "Thick-walled, crunchy, and exceptionally sweet bell peppers in red, yellow, and orange.", category: "Fruiting", available: true, emoji: "🫑" },
    { name: "Baby Spinach", description: "Delicate, sweet leaves packed with iron. Completely grit and sand free.", category: "Leafy Greens", available: true, emoji: "🍃" },
    { name: "Spicy Microgreens Mix", description: "A potent blend of radish, mustard, and arugula microgreens for a nutritional punch.", category: "Microgreens", available: true, emoji: "🌱" },
    { name: "Fresh Coriander", description: "Bright, citrusy, and deeply flavorful. Essential for garnishing your favorite dishes.", category: "Herbs", available: false, emoji: "🌿" },
  ],
  testimonials: [
    { name: "Sarah Jenkins", role: "Local Chef", quote: "The quality of AgroFlourish's basil and cherry tomatoes has completely transformed my summer menu. The freshness is unmatched, and I love that it's pesticide-free." },
    { name: "Mark T.", role: "Health Enthusiast", quote: "I've never tasted lettuce this crisp. Knowing exactly how it's grown and that it uses 90% less water makes me feel great about buying from them every week." },
    { name: "Elena Rodriguez", role: "Mother of two", quote: "Finally, vegetables my kids actually want to eat! The bell peppers are so sweet they eat them like apples. Plus, there's never any dirt to wash off!" },
  ],
};
