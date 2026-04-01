import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@meghaspanchgavya.com" },
    update: {},
    create: {
      name: "Megha Admin",
      email: "admin@meghaspanchgavya.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create test user
  const userPassword = await bcrypt.hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "ghee-dairy" },
      update: {},
      create: {
        name: "Ghee & Dairy",
        slug: "ghee-dairy",
        description: "Pure desi cow ghee and dairy products",
      },
    }),
    prisma.category.upsert({
      where: { slug: "health-wellness" },
      update: {},
      create: {
        name: "Health & Wellness",
        slug: "health-wellness",
        description: "Ayurvedic health and wellness products",
      },
    }),
    prisma.category.upsert({
      where: { slug: "personal-care" },
      update: {},
      create: {
        name: "Personal Care",
        slug: "personal-care",
        description: "Natural personal care and beauty products",
      },
    }),
    prisma.category.upsert({
      where: { slug: "home-garden" },
      update: {},
      create: {
        name: "Home & Garden",
        slug: "home-garden",
        description: "Organic home and garden products",
      },
    }),
    prisma.category.upsert({
      where: { slug: "puja-essentials" },
      update: {},
      create: {
        name: "Puja Essentials",
        slug: "puja-essentials",
        description: "Sacred items for daily puja and rituals",
      },
    }),
    prisma.category.upsert({
      where: { slug: "hair-care" },
      update: {},
      create: {
        name: "Hair Care",
        slug: "hair-care",
        description: "Natural Ayurvedic hair care products",
      },
    }),
    prisma.category.upsert({
      where: { slug: "skin-care" },
      update: {},
      create: {
        name: "Skin Care",
        slug: "skin-care",
        description: "Natural Ayurvedic skin care products",
      },
    }),
    prisma.category.upsert({
      where: { slug: "food-nutrition" },
      update: {},
      create: {
        name: "Food & Nutrition",
        slug: "food-nutrition",
        description: "Pure natural food and nutrition products",
      },
    }),
  ]);

  const [
    gheeDairy,
    healthWellness,
    personalCare,
    homeGarden,
    pujaEssentials,
    hairCare,
    skinCare,
    foodNutrition,
  ] = categories;

  // Create products - including all 7 real product images
  const products = [
    // === REAL PRODUCTS WITH ACTUAL IMAGES ===
    {
      name: "Panchgavya Coconut Oil",
      slug: "panchgavya-coconut-oil",
      description:
        "Premium cold-pressed Panchgavya Coconut Oil made with the finest quality coconut and enriched with sacred cow-derived ingredients. This multi-purpose oil is perfect for cooking, skin care, and hair nourishment. Our traditional extraction process preserves all natural nutrients and beneficial properties, making it a versatile addition to your daily wellness routine.",
      ingredients:
        "Cold-Pressed Virgin Coconut Oil, Panchgavya Extract (Cow Milk, Cow Ghee, Cow Curd, Gomutra, Cow Dung Ash). No preservatives, no chemicals.",
      usage:
        "For cooking: Use as a healthy cooking oil for everyday meals. For skin: Apply directly on skin as a natural moisturizer. For hair: Warm the oil slightly and massage into scalp and hair roots. Leave for at least 30 minutes before washing.",
      benefits:
        "Rich in medium-chain fatty acids for heart health. Natural antimicrobial and antifungal properties. Deep moisturizing for skin and hair. Boosts metabolism when used in cooking. Strengthens hair from root to tip. Traditional Panchgavya infusion adds Ayurvedic wellness benefits.",
      price: 449,
      mrp: 599,
      sku: "MP-COCOIL-500",
      stock: 80,
      images: ["/products/panchgavya-oil.png"],
      categoryId: personalCare.id,
      featured: true,
      bestSeller: true,
      isNew: false,
      weight: "500ml",
      soldThisWeek: 52,
      rating: 4.8,
      reviewCount: 134,
    },
    {
      name: "Neem Tulsi Body Powder",
      slug: "neem-tulsi-body-powder",
      description:
        "Megha's Panchgavya Neem Tulsi Body Powder is a 100% natural Ayurvedic body powder crafted from the finest neem and tulsi leaves, enriched with sacred Panchgavya ingredients. This chemical-free body powder keeps your skin fresh, dry, and protected throughout the day while harnessing the powerful antibacterial properties of neem and the healing essence of holy basil (tulsi).",
      ingredients:
        "Neem Leaf Powder, Tulsi (Holy Basil) Powder, Sandalwood Powder, Panchgavya Extract, Multani Mitti, Rose Petal Powder, Natural Fragrance. 100% Panchgavya Formula. No talc, no chemicals.",
      usage:
        "After bathing, apply the powder generously on dry skin. Focus on areas prone to sweating — underarms, neck, and body folds. Can also be used as a face mask by mixing with rose water. Suitable for daily use for the entire family.",
      benefits:
        "Natural antibacterial protection from neem. Absorbs excess moisture and prevents body odor. Tulsi provides natural skin healing. Keeps skin cool and comfortable in hot weather. Prevents skin rashes and fungal infections. Safe for sensitive skin with no harsh chemicals.",
      price: 249,
      mrp: 349,
      sku: "MP-NTBP-200",
      stock: 120,
      images: ["/products/neem-tulsi-body-powder.png"],
      categoryId: skinCare.id,
      featured: true,
      bestSeller: false,
      isNew: true,
      weight: "200g",
      soldThisWeek: 38,
      rating: 4.6,
      reviewCount: 87,
    },
    {
      name: "Herbal Hair Pack",
      slug: "herbal-hair-pack",
      description:
        "Megha's Panchgavya Herbal Hair Pack is a potent blend of Ayurvedic herbs that strengthens, revitalizes, and promotes healthy hair growth. Formulated with time-tested ingredients like Amla, Shikakai, Bhringraj, and enriched with Panchgavya, this hair pack provides deep conditioning and nourishment from root to tip. Ideal for all hair types.",
      ingredients:
        "Bhringraj Powder, Amla Powder, Shikakai Powder, Reetha (Soap Nut) Powder, Brahmi, Hibiscus Powder, Fenugreek Powder, Neem Leaf Powder, Panchgavya Extract. No synthetic additives.",
      usage:
        "Mix 3-4 tablespoons of hair pack with curd or water to make a smooth paste. Apply evenly on scalp and hair. Leave for 30-45 minutes. Rinse thoroughly with lukewarm water. Use once or twice a week for best results.",
      benefits:
        "Strengthens hair roots and reduces hair fall. Promotes new hair growth with Bhringraj and Brahmi. Natural conditioning with Amla and Shikakai. Prevents premature greying. Adds natural shine and volume. Controls dandruff and scalp infections. Chemical-free deep conditioning treatment.",
      price: 299,
      mrp: 399,
      sku: "MP-HHP-250",
      stock: 65,
      images: ["/products/herbal-hair-pack.png"],
      categoryId: hairCare.id,
      featured: true,
      bestSeller: true,
      isNew: false,
      weight: "250g",
      soldThisWeek: 41,
      rating: 4.7,
      reviewCount: 112,
    },
    {
      name: "Herbal Face Pack",
      slug: "herbal-face-pack",
      description:
        "Megha's Panchgavya Herbal Face Pack is a luxurious Ayurvedic skincare treatment that deep cleanses, nourishes, and rejuvenates your skin naturally. Made with premium herbs and enriched with Panchgavya, this face pack tackles multiple skin concerns including acne, pigmentation, dullness, and uneven skin tone. Experience the radiance of naturally beautiful skin.",
      ingredients:
        "Multani Mitti (Fuller's Earth), Turmeric, Sandalwood Powder, Rose Petal Powder, Neem Powder, Aloe Vera Extract, Kumkumadi Oil, Panchgavya Extract, Saffron. No parabens, no artificial colors.",
      usage:
        "Mix 2 tablespoons of face pack with rose water or raw milk to form a smooth paste. Apply evenly on clean face and neck, avoiding the eye area. Leave for 15-20 minutes until semi-dry. Gently wash off with lukewarm water. Use 2-3 times per week for glowing results.",
      benefits:
        "Deep pore cleansing with Multani Mitti. Reduces dark spots and pigmentation with turmeric and saffron. Anti-acne properties from neem. Soothes inflammation and redness. Natural anti-aging benefits. Brightens and evens out skin tone. Suitable for all skin types.",
      price: 399,
      mrp: 549,
      sku: "MP-HFP-200",
      stock: 55,
      images: ["/products/herbal-face-pack.png"],
      categoryId: skinCare.id,
      featured: true,
      bestSeller: false,
      isNew: true,
      weight: "200g",
      soldThisWeek: 29,
      rating: 4.8,
      reviewCount: 96,
    },
    {
      name: "Panchgavya Herbal Soap",
      slug: "panchgavya-herbal-soap",
      description:
        "Megha's Panchgavya Herbal Soap is a handcrafted artisan soap made with pure Panchgavya and potent Ayurvedic herbs. Cold-processed to retain all the natural goodness, this soap gently cleanses while nourishing your skin with the sacred five cow-derived ingredients. Enriched with neem, turmeric, and natural oils for a truly holistic bathing experience.",
      ingredients:
        "Panchgavya Base (Cow Milk, Cow Ghee, Cow Curd, Gomutra Extract, Cow Dung Ash), Coconut Oil, Neem Oil, Turmeric, Sandalwood, Castor Oil, Shea Butter, Natural Essential Oils. No SLS, no parabens, no artificial fragrance.",
      usage:
        "Wet the soap and lather between your hands or on a loofah. Apply to body and face. Rinse thoroughly with water. Suitable for all skin types including sensitive skin. For best results, use daily.",
      benefits:
        "Deep cleansing with natural moisturizing. Rich in lactic acid from cow milk for gentle exfoliation. Antibacterial properties of neem protect the skin. Turmeric brightens and evens skin tone. No harsh chemicals or SLS. Handmade with love using traditional cold-process method. Eco-friendly and biodegradable.",
      price: 149,
      mrp: 199,
      sku: "MP-SOAP-125",
      stock: 250,
      images: ["/products/herbal-soap.png"],
      categoryId: personalCare.id,
      featured: false,
      bestSeller: true,
      isNew: false,
      weight: "125g",
      soldThisWeek: 94,
      rating: 4.5,
      reviewCount: 218,
    },
    {
      name: "Natural Gulkand",
      slug: "natural-gulkand",
      description:
        "Megha's Panchgavya Natural Gulkand is a delicious, sweet preserve made from fresh Damask rose petals layered with mishri (rock sugar) and aged using traditional methods. This Ayurvedic delicacy is not just a treat for your taste buds but a powerful natural coolant and digestive aid that has been cherished in Indian households for centuries.",
      ingredients:
        "Fresh Damask Rose Petals, Mishri (Rock Sugar), Elaichi (Cardamom), Praval Pishti, Muktashukti Bhasma. No artificial colors, no preservatives, no refined sugar.",
      usage:
        "Take 1-2 teaspoons after meals as a natural digestive. Mix with milk for a refreshing rose milk drink. Spread on bread or parathas. Add to paan for the traditional experience. Can be used in desserts and sweets for natural rose flavor.",
      benefits:
        "Natural body coolant — perfect for summers. Excellent digestive aid and reduces acidity. Rich in antioxidants from rose petals. Reduces stress and promotes mental calmness. Improves skin complexion from within. Boosts hemoglobin and purifies blood. Good for mouth ulcers and gum health. Natural energy booster without artificial sugars.",
      price: 349,
      mrp: 449,
      sku: "MP-GULKAND-400",
      stock: 90,
      images: ["/products/natural-gulkand.png"],
      categoryId: foodNutrition.id,
      featured: true,
      bestSeller: true,
      isNew: false,
      weight: "400g",
      soldThisWeek: 63,
      rating: 4.9,
      reviewCount: 187,
    },
    {
      name: "Shiro Amrit Anti-Dandruff Hair Oil",
      slug: "shiro-amrit-anti-dandruff-hair-oil",
      description:
        "Megha's Panchgavya Shiro Amrit Anti-Dandruff Hair Oil is a powerful Ayurvedic formulation specifically designed to combat dandruff, itchy scalp, and flaky skin while promoting healthy hair growth. Infused with potent anti-fungal herbs and enriched with Panchgavya goodness, this oil treats the root cause of dandruff rather than just masking symptoms.",
      ingredients:
        "Sesame Oil Base, Panchgavya Extract, Tea Tree Oil, Neem Oil, Camphor, Rosemary Oil, Bhringraj, Amla, Methi (Fenugreek), Kalonji (Black Seed) Oil, Lemon Extract, Vitamin E.",
      usage:
        "Warm the oil slightly between your palms. Apply directly to scalp, parting hair into sections. Massage gently in circular motions for 10-15 minutes. Leave for at least 1-2 hours or overnight for best results. Wash with a mild natural shampoo. Use 2-3 times a week consistently for 4-6 weeks.",
      benefits:
        "Eliminates dandruff from the root cause. Powerful anti-fungal action from tea tree and neem. Soothes itchy, irritated scalp instantly. Prevents dandruff recurrence with regular use. Strengthens hair follicles and reduces hair fall. Promotes healthy new hair growth. Natural formulation with no side effects. Suitable for all hair types.",
      price: 399,
      mrp: 549,
      sku: "MP-SHIROAMRIT-100",
      stock: 70,
      images: ["/products/anti-dandruff-hair-oil.png"],
      categoryId: hairCare.id,
      featured: true,
      bestSeller: false,
      isNew: true,
      weight: "100ml",
      soldThisWeek: 33,
      rating: 4.7,
      reviewCount: 79,
    },

    // === EXISTING PRODUCTS (kept with original SVGs) ===
    {
      name: "Panchgavya Ghee (500ml)",
      slug: "panchgavya-ghee-500ml",
      description:
        "Pure A2 desi cow ghee made using traditional bilona method. Our ghee is prepared from the milk of indigenous Gir cows that are grass-fed and lovingly cared for. Rich in essential fatty acids, vitamins A, D, E, and K. This golden elixir is the cornerstone of Ayurvedic nutrition and enhances the taste of every dish it touches.",
      ingredients:
        "100% Pure A2 Desi Cow Milk Cream. No preservatives, no additives, no artificial colors.",
      usage:
        "Use for cooking, tempering dals, spreading on rotis, or add a spoonful to warm milk before bedtime. Can also be used for abhyanga (self-massage) and in traditional rituals.",
      benefits:
        "Boosts immunity and digestion. Rich in butyric acid for gut health. Enhances brain function and memory. Strengthens bones and joints. Natural moisturizer for skin. Balances all three doshas in Ayurveda.",
      price: 899,
      mrp: 1199,
      sku: "MP-GHEE-500",
      stock: 50,
      images: ["/products/ghee.svg"],
      categoryId: gheeDairy.id,
      featured: true,
      bestSeller: true,
      isNew: false,
      weight: "500ml",
      soldThisWeek: 45,
      rating: 4.8,
      reviewCount: 124,
    },
    {
      name: "Gomutra Ark (500ml)",
      slug: "gomutra-ark-500ml",
      description:
        "Distilled and purified Gomutra Ark from indigenous desi cows. Prepared through traditional distillation process to ensure maximum potency while maintaining purity. Used in Ayurveda for centuries as a natural health tonic and detoxifier.",
      ingredients:
        "100% Pure Distilled Desi Cow Urine (Gomutra). Triple-filtered and purified through traditional Ayurvedic process.",
      usage:
        "Take 10-20ml mixed with equal amount of water on an empty stomach in the morning. Can also be used for external application and home purification rituals.",
      benefits:
        "Natural detoxifier and blood purifier. Boosts immunity and metabolism. Supports liver and kidney health. Anti-bacterial and anti-fungal properties. Balances Kapha and Vata doshas.",
      price: 299,
      mrp: 399,
      sku: "MP-GOMUTRA-500",
      stock: 75,
      images: ["/products/gomutra.svg"],
      categoryId: healthWellness.id,
      featured: false,
      bestSeller: false,
      isNew: false,
      weight: "500ml",
      soldThisWeek: 28,
      rating: 4.5,
      reviewCount: 89,
    },
    {
      name: "Cow Dung Dhoop Sticks",
      slug: "cow-dung-dhoop-sticks",
      description:
        "Hand-rolled dhoop sticks made from sacred cow dung, mixed with natural herbs and aromatic ingredients. These chemical-free dhoop sticks purify the air and create a positive spiritual atmosphere in your home. Perfect for daily puja and meditation.",
      ingredients:
        "Desi Cow Dung, Guggul, Camphor, Sandalwood Powder, Havan Samagri, Natural Herbs. No charcoal, no chemicals.",
      usage:
        "Light the tip of the dhoop stick and place in a dhoop stand. Use during morning/evening puja, meditation, or whenever you want to purify your living space.",
      benefits:
        "Purifies air and removes negative energy. Natural mosquito and insect repellent. Creates calming atmosphere for meditation. Releases beneficial negative ions. Reduces airborne bacteria.",
      price: 149,
      mrp: 199,
      sku: "MP-DHOOP-30",
      stock: 200,
      images: ["/products/dhoop.svg"],
      categoryId: pujaEssentials.id,
      featured: false,
      bestSeller: true,
      isNew: false,
      weight: "30 sticks",
      soldThisWeek: 67,
      rating: 4.6,
      reviewCount: 156,
    },
    {
      name: "Panchgavya Hair Oil",
      slug: "panchgavya-hair-oil",
      description:
        "Traditional Panchgavya-infused hair oil enriched with Bhringraj, Amla, and Brahmi. This potent formulation combines the ancient wisdom of Panchgavya with time-tested Ayurvedic herbs to promote strong, thick, and lustrous hair.",
      ingredients:
        "Sesame Oil Base, Panchgavya Extract, Bhringraj, Amla, Brahmi, Neem, Hibiscus, Curry Leaves, Fenugreek, Coconut Oil, Vitamin E.",
      usage:
        "Warm the oil slightly. Apply to scalp and hair from root to tip. Massage gently for 10-15 minutes. Leave for at least 1 hour or overnight. Wash with natural shampoo.",
      benefits:
        "Reduces hair fall significantly. Promotes new hair growth. Prevents premature greying. Conditions and softens hair. Treats dandruff and scalp infections. Strengthens hair from root.",
      price: 399,
      mrp: 549,
      sku: "MP-HAIROIL-200",
      stock: 60,
      images: ["/products/hairoil.svg"],
      categoryId: hairCare.id,
      featured: false,
      bestSeller: false,
      isNew: false,
      weight: "200ml",
      soldThisWeek: 22,
      rating: 4.6,
      reviewCount: 95,
    },
    {
      name: "Panchgavya Toothpaste",
      slug: "panchgavya-toothpaste",
      description:
        "All-natural toothpaste made with Panchgavya and traditional Dant Manjan herbs. Free from fluoride, SLS, and artificial sweeteners. Provides complete oral care using ancient Ayurvedic formulation that strengthens teeth and gums naturally.",
      ingredients:
        "Panchgavya Base, Babool Extract, Neem, Clove Oil, Salt, Camphor, Mint, Mulethi, Vajradanti, Akarkara. No fluoride, no SLS.",
      usage:
        "Use a pea-sized amount on your toothbrush. Brush gently for 2-3 minutes, twice daily. For best results, avoid eating or drinking for 30 minutes after brushing.",
      benefits:
        "Strengthens teeth and gums. Prevents cavities naturally. Fights bad breath. Reduces gum bleeding and inflammation. Whitens teeth without harsh chemicals. Safe for children above 5 years.",
      price: 199,
      mrp: 249,
      sku: "MP-TOOTH-100",
      stock: 150,
      images: ["/products/toothpaste.svg"],
      categoryId: personalCare.id,
      featured: false,
      bestSeller: true,
      isNew: false,
      weight: "100g",
      soldThisWeek: 55,
      rating: 4.5,
      reviewCount: 178,
    },
    {
      name: "Gobar Fertilizer (1kg)",
      slug: "gobar-fertilizer-1kg",
      description:
        "Premium organic fertilizer made from composted desi cow dung (Gobar). Enriched with beneficial microorganisms and natural minerals. Perfect for home gardens, kitchen gardens, and potted plants. Chemical-free nutrition for your plants.",
      ingredients:
        "Composted Desi Cow Dung, Vermicompost, Neem Cake, Rock Phosphate, Natural Minerals. 100% organic, no chemical additives.",
      usage:
        "Mix 100-200g per potted plant or 1-2kg per square meter of garden bed. Apply every 2-3 weeks during growing season. Water after application. Can be used for all types of plants.",
      benefits:
        "Improves soil structure and water retention. Provides slow-release nutrients. Promotes beneficial soil microorganisms. Increases crop yield naturally. Safe for organic farming. Eco-friendly and sustainable.",
      price: 249,
      mrp: 349,
      sku: "MP-FERT-1KG",
      stock: 100,
      images: ["/products/fertilizer.svg"],
      categoryId: homeGarden.id,
      featured: false,
      bestSeller: false,
      isNew: false,
      weight: "1kg",
      soldThisWeek: 18,
      rating: 4.4,
      reviewCount: 62,
    },
    {
      name: "Panchgavya Shampoo",
      slug: "panchgavya-shampoo",
      description:
        "Gentle, sulfate-free shampoo infused with Panchgavya and Ayurvedic herbs. This unique formulation cleanses your hair thoroughly while preserving natural oils. Suitable for all hair types and daily use.",
      ingredients:
        "Panchgavya Base, Reetha (Soap Nut), Shikakai, Amla, Bhringraj, Hibiscus, Aloe Vera, Neem, Tea Tree Oil. No sulfates, no parabens.",
      usage:
        "Wet hair thoroughly. Apply adequate amount and massage into scalp. Lather gently and leave for 2-3 minutes. Rinse well. Follow with Panchgavya Hair Oil for best results.",
      benefits:
        "Gentle sulfate-free cleansing. Reduces hair fall. Prevents dandruff. Adds natural shine and volume. Soothes itchy scalp. Safe for color-treated hair.",
      price: 379,
      mrp: 499,
      sku: "MP-SHAMPOO-200",
      stock: 45,
      images: ["/products/shampoo.svg"],
      categoryId: hairCare.id,
      featured: false,
      bestSeller: false,
      isNew: false,
      weight: "200ml",
      soldThisWeek: 14,
      rating: 4.5,
      reviewCount: 58,
    },
    {
      name: "Gaumutra Tablets",
      slug: "gaumutra-tablets",
      description:
        "Convenient tablet form of purified Gaumutra extract. Each tablet contains concentrated Gomutra processed through advanced Ayurvedic distillation and drying techniques. Easy to consume daily health supplement for modern lifestyles.",
      ingredients:
        "Purified Gomutra Extract, Triphala, Giloy, Tulsi, Neem. Binding agent: Gum Acacia. No artificial preservatives.",
      usage:
        "Take 2 tablets twice daily with lukewarm water, preferably before meals. For best results, continue for at least 3 months. Consult an Ayurvedic practitioner for personalized dosage.",
      benefits:
        "Convenient daily detox supplement. Boosts natural immunity. Supports digestive health. Blood purification. Helps manage blood sugar levels. Anti-inflammatory properties.",
      price: 349,
      mrp: 449,
      sku: "MP-TABLETS-60",
      stock: 85,
      images: ["/products/tablets.svg"],
      categoryId: healthWellness.id,
      featured: false,
      bestSeller: false,
      isNew: false,
      weight: "60 tablets",
      soldThisWeek: 12,
      rating: 4.3,
      reviewCount: 44,
    },
    {
      name: "Panchgavya Face Cream",
      slug: "panchgavya-face-cream",
      description:
        "Luxurious face cream formulated with all five sacred cow products (Panchgavya) combined with precious Ayurvedic herbs. This all-natural cream nourishes, moisturizes, and rejuvenates your skin, giving it a natural glow without any harmful chemicals.",
      ingredients:
        "Cow Milk, Cow Ghee, Cow Curd, Gomutra Extract, Cow Dung Ash (Bhasma), Kumkumadi Oil, Aloe Vera, Turmeric, Saffron, Rose Water, Vitamin E.",
      usage:
        "Apply a small amount on clean face and neck. Gently massage in circular motions until absorbed. Use twice daily - morning and night for best results.",
      benefits:
        "Deep moisturization without greasiness. Reduces dark spots and pigmentation. Anti-aging properties reduce fine lines. Natural SPF protection. Evens out skin tone. Treats acne and blemishes naturally.",
      price: 449,
      mrp: 599,
      sku: "MP-FACECREAM-50",
      stock: 35,
      images: ["/products/facecream.svg"],
      categoryId: skinCare.id,
      featured: false,
      bestSeller: false,
      isNew: false,
      weight: "50g",
      soldThisWeek: 15,
      rating: 4.7,
      reviewCount: 67,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        images: product.images,
        price: product.price,
        mrp: product.mrp,
        stock: product.stock,
        featured: product.featured,
        bestSeller: product.bestSeller,
        isNew: product.isNew,
      },
      create: product,
    });
  }

  // Create sample blog posts
  const blogPosts = [
    {
      title: "What is Panchgavya? The Sacred Five Products of the Cow",
      slug: "what-is-panchgavya",
      excerpt:
        "Discover the ancient Ayurvedic tradition of Panchgavya — the five sacred products derived from the cow that have been used for thousands of years in Indian medicine and rituals.",
      content: `Panchgavya, literally meaning "five cow products," is a sacred mixture used in traditional Hindu rituals and Ayurvedic medicine. It consists of five products obtained from the cow: milk (dugdha), curd (dadhi), ghee (ghrita), urine (gomutra), and dung (gomaya).

## Historical Significance

The concept of Panchgavya dates back thousands of years to the Vedic period. Ancient texts like the Charaka Samhita and Sushruta Samhita extensively document the medicinal properties of these five products. In the Vedas, the cow is revered as "Kamadhenu" — the divine cow that fulfills all desires.

## The Five Components

### 1. Cow Milk (Dugdha)
Rich in A2 beta-casein protein, desi cow milk is considered superior to regular milk. It's easier to digest and packed with essential nutrients including calcium, vitamin D, and healthy fats.

### 2. Cow Curd (Dadhi)
Fermented from desi cow milk, the curd is a natural probiotic that promotes gut health. It's rich in beneficial bacteria that aid digestion and boost immunity.

### 3. Cow Ghee (Ghrita)
Clarified butter made from desi cow milk using the traditional bilona method. Ghee is considered the most sattvic (pure) fat in Ayurveda and is used both in cooking and medicine.

### 4. Cow Urine (Gomutra)
Perhaps the most researched component, Gomutra has been found to contain numerous bioactive compounds. It's used as a natural detoxifier and immunity booster.

### 5. Cow Dung (Gomaya)
Rich in beneficial microorganisms, cow dung has antiseptic properties. It's used in organic farming, as fuel, and in traditional purification rituals.

## Modern Applications

Today, Panchgavya finds applications in agriculture (as organic fertilizer), medicine (Ayurvedic formulations), and personal care (soaps, creams, and shampoos). Scientific research continues to validate many traditional claims about the health benefits of these products.

At Megha's Panchgavya, we honor this ancient tradition by creating premium products that bring the blessings of Gaumata to your home.`,
      coverImage: "/blog/panchgavya-intro.svg",
      category: "Ayurveda",
      author: "Megha's Panchgavya",
      published: true,
    },
    {
      title: "5 Amazing Benefits of A2 Desi Cow Ghee",
      slug: "benefits-of-a2-desi-cow-ghee",
      excerpt:
        "A2 Desi Cow Ghee is not just a cooking fat — it's a superfood with incredible health benefits backed by both Ayurveda and modern science.",
      content: `Ghee has been a staple in Indian kitchens for thousands of years, but not all ghee is created equal. A2 Desi Cow Ghee, made from the milk of indigenous Indian cow breeds, stands apart in its nutritional profile and health benefits.

## What Makes A2 Ghee Special?

A2 ghee is made from milk containing A2 beta-casein protein, found naturally in indigenous cow breeds like Gir, Sahiwal, and Red Sindhi. This is different from A1 protein found in most commercial milk from Holstein-Friesian cows.

## Top 5 Benefits

### 1. Superior Digestive Health
A2 ghee contains butyric acid, a short-chain fatty acid that nourishes the cells lining the intestines. It promotes healthy gut bacteria and aids in smooth digestion. Unlike regular oils, ghee is said to stimulate the digestive fire (Agni) in Ayurveda.

### 2. Brain Function Enhancement
Rich in omega-3 fatty acids and DHA, A2 ghee is considered a brain tonic in Ayurveda. Regular consumption is linked to improved memory, concentration, and cognitive function.

### 3. Immune System Boost
Packed with fat-soluble vitamins A, D, E, and K, A2 ghee strengthens the immune system.

### 4. Joint and Bone Health
Ghee lubricates the joints and provides the fat-soluble vitamins necessary for calcium absorption. In Ayurveda, consuming warm ghee is recommended for people with joint stiffness and arthritis.

### 5. Skin Nourishment
Applied topically or consumed internally, ghee is a natural moisturizer. It's rich in essential fatty acids that keep skin supple and glowing.

## How to Choose Quality Ghee

Look for ghee made from the milk of indigenous breeds using the traditional bilona (hand-churned) method. The ghee should be golden-yellow in color with a rich, nutty aroma. At Megha's Panchgavya, our ghee is made from grass-fed Gir cow milk using authentic bilona process.`,
      coverImage: "/blog/ghee-benefits.svg",
      category: "Health",
      author: "Megha's Panchgavya",
      published: true,
    },
    {
      title: "The Science Behind Gomutra: Ancient Wisdom Meets Modern Research",
      slug: "science-behind-gomutra",
      excerpt:
        "Modern scientific research is now validating what Ayurveda has known for centuries — Gomutra possesses remarkable therapeutic properties.",
      content: `For centuries, Gomutra (cow urine) has been used in Ayurvedic medicine as a therapeutic agent. While it may seem unconventional to Western medicine, growing scientific research is beginning to validate many of its traditional uses.

## Traditional Uses in Ayurveda

In classical Ayurvedic texts, Gomutra is classified as one of the most effective natural detoxifiers. It has been traditionally used for blood purification, liver disorders, skin conditions, digestive problems, and immune enhancement.

## What Does Science Say?

### Bioactive Compounds
Research has identified numerous bioactive compounds in cow urine, including urea, creatinine, minerals, carbolic acid, phenols, calcium, and phosphorus.

### Research Findings
Several studies have demonstrated the antimicrobial properties of Gomutra against various bacteria and fungi, including enhancing bioavailability of certain medicines, hepatoprotective effects, and immunomodulatory activity.

## How to Use Gomutra Safely

The most common and recommended form is Gomutra Ark — a distilled and purified form that's easier to consume. At Megha's Panchgavya, our Gomutra Ark undergoes triple filtration and purification to ensure safety and efficacy.

**Important:** Always use purified and processed forms. Consult an Ayurvedic practitioner before starting any Gomutra-based regimen.`,
      coverImage: "/blog/gomutra-science.svg",
      category: "Research",
      author: "Megha's Panchgavya",
      published: true,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  // Create sample coupons
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      description: "10% off on your first order",
      type: "percentage",
      value: 10,
      minOrder: 499,
      maxDiscount: 200,
      usageLimit: 100,
      expiresAt: new Date("2027-12-31"),
    },
  });

  await prisma.coupon.upsert({
    where: { code: "FLAT100" },
    update: {},
    create: {
      code: "FLAT100",
      description: "Flat ₹100 off on orders above ₹999",
      type: "flat",
      value: 100,
      minOrder: 999,
      usageLimit: 50,
      expiresAt: new Date("2027-06-30"),
    },
  });

  // Create loyalty points for test user
  await prisma.loyaltyPoints.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      points: 250,
    },
  });

  // Create sample address for test user
  const existingAddress = await prisma.address.findFirst({
    where: { userId: user.id },
  });

  if (!existingAddress) {
    await prisma.address.create({
      data: {
        userId: user.id,
        name: "Test User",
        phone: "9876543210",
        street: "123, MG Road, Shivaji Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001",
        isDefault: true,
      },
    });
  }

  console.log("Seed data created successfully!");
  console.log(`Admin: admin@meghaspanchgavya.com / admin123`);
  console.log(`User: test@example.com / user123`);
  console.log(`Products: ${products.length} products seeded`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
