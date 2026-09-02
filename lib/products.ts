export type ProductModelType =
  | "bottle" // lush wood body oil
  | "pump" // herbal glow body wash
  | "dropper" // baovera hair oil
  | "jar" // body butter
  | "vial" // perfume oil
  | "slim" // shimmer oil
  | "bar"; // black luxe soap

export type Category = "BODY" | "HAIR" | "FRAGRANCE" | "CLEANSING";

export interface ProductTheme {
  /** page/card background tint */
  bg: string;
  /** accent color */
  accent: string;
  /** is a dark theme */
  dark?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  size: string;
  blurb: string;
  description: string;
  image: string; // /products/<slug>.png — swap your photo at this exact path
  theme: ProductTheme;
  model: ProductModelType;
  benefits: string[];
  ingredients: string[];
  howToUse: string[];
  details: string[];
  featured?: boolean; // appears in cinematic storytelling section
  signature?: boolean; // eligible for the Signature Ritual spotlight
}

export const CATEGORIES = ["ALL", "BODY", "HAIR", "FRAGRANCE", "CLEANSING"] as const;

export const PRODUCTS: Product[] = [
  {
    slug: "lush-wood-body-oil",
    name: "Lush Wood Body Oil",
    category: "BODY",
    price: 18500,
    size: "100ml",
    blurb:
      "A luxurious body oil designed as part of an elevated body-care ritual — warm woods, soft amber and deep, lasting nourishment.",
    description:
      "Lush Wood Body Oil is the heart of the AfriEssence ritual. A slow, golden blend of cold-pressed oils and warm botanical woods that melts into the skin, leaving it soft, scented and quietly radiant. Designed to be massaged in with intention — morning or night — it turns an everyday moment into a ceremony of self-care.",
    image: "/products/lush-wood-body-oil.png",
    theme: { bg: "#EFE6D8", accent: "#8A6A4B" },
    model: "bottle",
    featured: true,
    signature: true,
    benefits: [
      "Deeply nourishes and softens skin",
      "Warm, grounding scent of sandalwood & amber",
      "Fast-absorbing, never greasy",
      "Seals in moisture for lasting radiance"
    ],
    ingredients: [
      "Coconut Oil",
      "Sweet Almond Oil",
      "Sandalwood",
      "Amber Extract",
      "Vitamin E"
    ],
    howToUse: [
      "Warm a few drops between your palms",
      "Massage into damp skin after bathing",
      "Focus on elbows, knees and décolleté",
      "Inhale deeply — let the ritual begin"
    ],
    details: [
      "100ml amber glass bottle with wooden cap",
      "Cruelty-free · Vegan",
      "Handcrafted in Nigeria"
    ]
  },
  {
    slug: "herbal-glow-body-wash",
    name: "Herbal Glow Body Wash",
    category: "CLEANSING",
    price: 14500,
    size: "250ml",
    blurb:
      "A botanical-inspired cleansing ritual that refreshes the skin and leaves a soft, radiant veil of glow.",
    description:
      "Herbal Glow Body Wash turns cleansing into a morning ritual. A gentle, botanical-rich formula infused with green botanicals and cool water extracts that purifies without stripping, leaving skin refreshed, luminous and softly scented with fresh herbs.",
    image: "/products/herbal-glow-body-wash.png",
    theme: { bg: "#E4E8D8", accent: "#5C7050" },
    model: "pump",
    featured: true,
    benefits: [
      "Gently purifies without stripping",
      "Refreshing botanical scent",
      "Leaves skin luminous and soft",
      "pH-balanced daily cleanser"
    ],
    ingredients: [
      "Aloe Vera",
      "Eucalyptus Leaf",
      "Green Tea Extract",
      "Coconut Surfactants",
      "Glycerin"
    ],
    howToUse: [
      "Lather between palms or on a loofah",
      "Massage over damp skin in circular motions",
      "Rinse with warm water",
      "Follow with Lush Wood Body Oil"
    ],
    details: [
      "250ml pump bottle",
      "Cruelty-free · Vegan",
      "Handcrafted in Nigeria"
    ]
  },
  {
    slug: "baovera-hair-oil",
    name: "Baovera Hair Oil",
    category: "HAIR",
    price: 16500,
    size: "50ml",
    blurb:
      "A nourishing hair-care ritual — baobab and botanical oils that restore softness, shine and strength.",
    description:
      "Baovera Hair Oil is a premium hair-care ritual in a single golden drop. Baobab seed oil — the ancient African 'tree of life' — meets aloe and warm botanicals to nourish the scalp, seal the hair shaft and restore a glossy, healthy radiance from root to tip.",
    image: "/products/baovera-hair-oil.png",
    theme: { bg: "#F0E4D0", accent: "#7A5C34" },
    model: "dropper",
    signature: true,
    benefits: [
      "Nourishes scalp and strands",
      "Baobab 'tree of life' oil",
      "Restores softness and shine",
      "Lightweight, non-greasy finish"
    ],
    ingredients: [
      "Baobab Seed Oil",
      "Aloe Vera",
      "Argan Oil",
      "Rosemary",
      "Vitamin E"
    ],
    howToUse: [
      "Apply 3–5 drops to palms",
      "Massage into scalp and lengths",
      "Seal ends for extra nourishment",
      "Use 2–3 times per week"
    ],
    details: [
      "50ml glass dropper bottle",
      "Cruelty-free · Vegan",
      "Handcrafted in Nigeria"
    ]
  },
  {
    slug: "body-butter",
    name: "Body Butter",
    category: "BODY",
    price: 15000,
    size: "200ml",
    blurb:
      "A rich, whipped body butter that leaves skin deeply moisturized, cared for and touchably soft.",
    description:
      "Body Butter is the embrace at the end of the ritual. A rich, whipped blend of shea and cocoa butters that melts on contact and sinks in deeply, leaving skin deeply moisturized, supple and cared for — a quiet luxury you can feel long after application.",
    image: "/products/body-butter.png",
    theme: { bg: "#F3ECDF", accent: "#B08968" },
    model: "jar",
    signature: true,
    benefits: [
      "Deep 24-hour moisture",
      "Whipped shea & cocoa butters",
      "Soothes dry, thirsty skin",
      "Soft, creamy unscented base"
    ],
    ingredients: [
      "Shea Butter",
      "Cocoa Butter",
      "Mango Seed Butter",
      "Coconut Oil",
      "Vitamin E"
    ],
    howToUse: [
      "Scoop a small amount",
      "Warm between fingertips",
      "Massage into skin until absorbed",
      "Use daily, especially after bathing"
    ],
    details: [
      "200ml frosted glass jar with gold lid",
      "Cruelty-free · Vegan",
      "Handcrafted in Nigeria"
    ]
  },
  {
    slug: "perfume-oil",
    name: "Perfume Oil",
    category: "FRAGRANCE",
    price: 22000,
    size: "10ml",
    blurb:
      "A concentrated fragrance experience — an elegant personal scent ritual in a single drop.",
    description:
      "Perfume Oil is scent as ceremony. A concentrated, alcohol-free fragrance that unfolds slowly on the skin — warm amber, smoked woods and a whisper of floral — intimate, long-lasting and entirely yours. One drop at the pulse points becomes your signature.",
    image: "/products/perfume-oil.png",
    theme: { bg: "#241812", accent: "#C9AE7E", dark: true },
    model: "vial",
    signature: true,
    benefits: [
      "Long-lasting concentrated oil",
      "Alcohol-free, kind to skin",
      "Unfolds beautifully over hours",
      "A personal signature scent"
    ],
    ingredients: [
      "Amber",
      "Smoked Woods",
      "Jasmine Absolute",
      "Vanilla Bourbon",
      "Fractionated Coconut Oil"
    ],
    howToUse: [
      "Roll a single drop onto pulse points",
      "Wrists, neck, behind the ears",
      "Do not rub — let it bloom",
      "Reapply through the day as desired"
    ],
    details: [
      "10ml faceted glass vial with gold dropper",
      "Cruelty-free · Vegan",
      "Handcrafted in Nigeria"
    ]
  },
  {
    slug: "shimmer-oil",
    name: "Shimmer Oil",
    category: "BODY",
    price: 17500,
    size: "80ml",
    blurb:
      "A luminous body oil that adds a subtle, radiant sheen — light, captured on skin.",
    description:
      "Shimmer Oil is radiance, bottled. A weightless veil of golden oil with finely milled reflective particles that catch the light and leave skin with a soft, sun-kissed luminosity. For shoulders, collarbones and the moments that deserve a little more glow.",
    image: "/products/shimmer-oil.png",
    theme: { bg: "#F0E8D8", accent: "#C9A227" },
    model: "slim",
    benefits: [
      "Subtle radiant sheen",
      "Finely milled golden particles",
      "Weightless, silky finish",
      "Hydrates while it glows"
    ],
    ingredients: [
      "Jojoba Oil",
      "Golden Mica",
      "Vitamin E",
      "Sweet Almond Oil",
      "Champagne Extract"
    ],
    howToUse: [
      "Shake gently before use",
      "Glide over shoulders and collarbones",
      "Layer over Body Butter",
      "For evenings — or every day"
    ],
    details: [
      "80ml glass bottle with gold cap",
      "Cruelty-free · Vegan",
      "Handcrafted in Nigeria"
    ]
  },
  {
    slug: "black-luxe-soap",
    name: "Black Luxe Soap",
    category: "CLEANSING",
    price: 8500,
    size: "150g",
    blurb:
      "A sophisticated cleansing bar — the signature AfriEssence ritual of purity and polish.",
    description:
      "Black Luxe Soap is the signature of the collection. A deep, sophisticated cleansing bar born of the African black-soap tradition, refined into a modern luxury object. It clarifies, smooths and polishes the skin, leaving it clean, calm and beautifully balanced.",
    image: "/products/black-luxe-soap.png",
    theme: { bg: "#17100B", accent: "#C9C2B8", dark: true },
    model: "bar",
    benefits: [
      "Clarifies and refines skin",
      "Traditional African black-soap wisdom",
      "Calming, balanced finish",
      "Long-lasting luxury bar"
    ],
    ingredients: [
      "Plantain Ash",
      "Shea Butter",
      "Cocoa Pod Ash",
      "Palm Kernel Oil",
      "Honey"
    ],
    howToUse: [
      "Work to a rich lather in palms",
      "Massage over damp skin",
      "Rinse thoroughly",
      "Rest on a dry dish between uses"
    ],
    details: [
      "150g matte black bar",
      "Cruelty-free · Vegan",
      "Handcrafted in Nigeria"
    ]
  }
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatNGN = (n: number) =>
  "₦" + n.toLocaleString("en-NG");

export const SIGNATURE_ROTATION = PRODUCTS.filter((p) => p.signature);
