import { mutation } from "./_generated/server";

export const seedProducts = mutation({
  handler: async (ctx) => {
    const products = [
      {
        id: "1", // Converted to string
        slug: "xx99-mark-two-headphones",
        name: "XX99 MARK II HEADPHONES",
        category: "headphones",
        isNew: true,
        price: 2999,
        description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
        features: "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you're taking a business call or just in your own personal space, the auto on/off and pause features ensure that you'll never miss a beat.\n\nThe advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5.0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.",
        includes: [
          { quantity: 1, item: "Headphone Unit" },
          { quantity: 2, item: "Replacement Earcups" },
          { quantity: 1, item: "User Manual" },
          { quantity: 1, item: "3.5mm 5m Audio Cable" },
          { quantity: 1, item: "Travel Bag" }
        ],
        gallery: [
          { image: "/images/shared/desktop/image-gallery-1.png" },
          { image: "/images/shared/desktop/image-gallery-2.png" },
          { image: "/images/shared/desktop/image-gallery-3.png" }
        ],
        image: "/images/shared/desktop/image-category-headphones-1.png",
        categoryImage: "/images/category-headphones/image-xx99-mark-two.jpg",
        others: [
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 MARK I",
            image: "/images/shared/desktop/image-category-headphones-3.png"
          },
          {
            slug: "xx59-headphones",
            name: "XX59",
            image: "/images/shared/desktop/image-category-headphones-2.png"
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 SPEAKER",
            image: "/images/shared/desktop/image-category-thumbnail-speakers.png"
          }
        ]
      },
      {
        id: "2", // Converted to string
        slug: "yxi-wireless-earphones",
        name: "YXI WIRELESS EARPHONES",
        category: "earphones",
        isNew: false,
        price: 139,
        description: "Your home's common and beautiful space drives your home with respect to everyone. Every member has a unique, well-known experience in the world to serve some specialised beauty.",
        features: "Experience created across our China is a fantastic event of technology. With traditional people and employees, we are very fortunate to have an opportunity to improve their lives throughout our life as part of us. We encourage ourselves to enjoy long-term energy, exceptional social solutions and truly emotional events.",
        includes: [
          { quantity: 1, item: "Experiences" },
          { quantity: 1, item: "Talk from Europe" },
          { quantity: 1, item: "Use Congregation" },
          { quantity: 1, item: "TeamTeam" }
        ],
        gallery: [
          { image: "/images/shared/desktop/image-gallery-21.png" },
          { image: "/images/shared/desktop/image-gallery-10.png" },
          { image: "/images/shared/desktop/image-gallery-17.png" }
        ],
        image: "/images/shared/desktop/image-category-earphones.png",
        categoryImage: "/images/category-earphones/image-yxi-wireless.jpg",
        others: [
          {
            slug: "x009-mark-i",
            name: "X009 MARK I",
            image: "/images/shared/desktop/image-category-headphones-2.png"
          },
          {
            slug: "x059",
            name: "X059",
            image: "/images/shared/desktop/image-category-headphones-3.png"
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 SPEAKER",
            image: "/images/shared/desktop/image-category-thumbnail-speakers.png"
          }
        ]
      },
      {
        id: "3", // Converted to string
        slug: "xx99-mark-one-headphones",
        name: "XX99 MARK I HEADPHONES",
        category: "headphones",
        isNew: false,
        price: 1750,
        description: "As a significant driver for headphones, it is essential to get home with physical and environmental protection channels. A variety of key components are provided with the platform and things.",
        features: "As an headphone, it allows us to make a full guide on the ability to be tailored to the user for access to all devices that can easily help you build better lighting options. This helps us create more comfortable and accessible capabilities, ensuring our goal enables us to improve suitability as a technology for support of this.",
        includes: [
          { quantity: 1, item: "Headphones" },
          { quantity: 1, item: "Equipment Lifecycle" },
          { quantity: 1, item: "Manual" },
          { quantity: 1, item: "Charging Cable" }
        ],
        gallery: [
          { image: "/images/shared/desktop/image-gallery-4.png" },
          { image: "/images/shared/desktop/image-gallery-5.png" },
          { image: "/images/shared/desktop/image-gallery-6.png" }
        ],
        image: "/images/shared/desktop/image-category-headphones-3.png",
        categoryImage: "/images/category-headphones/image-xx99-mark-one.jpg",
        others: [
          {
            slug: "xx99-mark-two-headphones",
            name: "XX99 MARK II",
            image: "/images/shared/desktop/image-category-thumbnail-speakers.png"
          },
          {
            slug: "xx59-headphones",
            name: "XX59",
            image: "/images/shared/desktop/image-category-headphones-2.png"
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 SPEAKER",
            image: "/images/shared/desktop/image-category-headphones-3.png"
          }
        ]
      },
      {
        id: "4", // Converted to string
        slug: "xx59-headphones",
        name: "XX59 HEADPHONES",
        category: "headphones",
        isNew: false,
        price: 899,
        description: "Every day customers are committed to the commitment to your business and our business, and we have a strong experience in your life and culture.",
        features: "These headphones have been used for the public only with 7 people living through the first service. The people living during a last week of retirement are planning to provide them all resources to help them meet their needs and enjoy supportable and professionalism solutions.",
        includes: [
          { quantity: 1, item: "Headphones unit" },
          { quantity: 1, item: "Earcups" },
          { quantity: 1, item: "User Manual" },
          { quantity: 1, item: "Audio Cable" }
        ],
        gallery: [
          { image: "/images/shared/desktop/image-gallery-11.png" },
          { image: "/images/shared/desktop/image-gallery-20.png" },
          { image: "/images/shared/desktop/image-gallery-12.png" }
        ],
        image: "/images/shared/desktop/image-category-headphones-2.png",
        categoryImage: "/images/category-headphones/image-xx59.jpg",
        others: [
          {
            slug: "xx99-mark-two-headphones",
            name: "XX99 MARK II",
            image: "/images/shared/desktop/image-category-headphones-1.png"
          },
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 MARK I",
            image: "/images/shared/desktop/image-category-headphones-3.png"
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 SPEAKER",
            image: "/images/shared/desktop/image-category-speakers.png"
          }
        ]
      },
      {
        id: "5", // Converted to string
        slug: "zx7-speaker",
        name: "ZX7 SPEAKER",
        category: "speakers",
        isNew: false,
        price: 3500,
        description: "Stream high-quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represent the top of the line powered speakers for home or studio use.",
        features: "Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminium that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.\n\nThe ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimizes acoustic resonance. Dual connectivity allows pairing through Bluetooth or traditional optical and RCA input. Switch input sources and control volume at your fingertips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.",
        includes: [
          { quantity: 2, item: "Speaker Unit" },
          { quantity: 2, item: "Speaker Cloth Panel" },
          { quantity: 1, item: "User Manual" },
          { quantity: 1, item: "3.5mm 7.5m Audio Cable" },
          { quantity: 1, item: "7.5m Optical Cable" }
        ],
        gallery: [
          { image: "/images/shared/desktop/image-gallery-7.png" },
          { image: "/images/shared/desktop/image-gallery-8.png" },
          { image: "/images/shared/desktop/image-gallery-16.png" }
        ],
        image: "/images/shared/desktop/Speaker-zx7.png",
        categoryImage: "/images/category-speakers/image-zx7.jpg",
        others: [
          {
            slug: "xx99-mark-two-headphones",
            name: "XX99 MARK II",
            image: "/images/shared/desktop/image-category-headphones-1.png"
          },
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 MARK I",
            image: "/images/shared/desktop/image-category-headphones-3.png"
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 SPEAKER",
            image: "/images/shared/desktop/image-category-thumbnail-speakers.png"
          }
        ]
      },
      {
        id: "6", // Converted to string
        slug: "zx9-speaker",
        name: "ZX9 SPEAKER",
        category: "speakers",
        isNew: true,
        price: 4500,
        description: "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity – creating new possibilities for more pleasing and practical audio setups.",
        features: "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to hook up to your wired source devices for easy switching. Improved Bluetooth technology offers near lossless audio quality up to 24bit/192kHz.\n\nDiscover clear, more natural sounding highs that rival the competition with ZX9's signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass unit. You'll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you'll experience new sensations from old songs since it can respond to even the subtle waveforms.",
        includes: [
          { quantity: 2, item: "Speaker Unit" },
          { quantity: 2, item: "Speaker Cloth Panel" },
          { quantity: 1, item: "User Manual" },
          { quantity: 1, item: "3.5mm 10m Audio Cable" },
          { quantity: 1, item: "10m Optical Cable" }
        ],
        gallery: [
          { image: "/images/shared/desktop/image-gallery-14.png" },
          { image: "/images/shared/desktop/image-gallery-13.png" },
          { image: "/images/shared/desktop/image-gallery-15.png" }
        ],
        image: "/images/shared/desktop/Speaker-zx9.png",
        categoryImage: "/images/shared/desktop/Speaker-zx9.jpg",
        others: [
          {
            slug: "xx99-mark-two-headphones",
            name: "XX99 MARK II",
            image: "/images/shared/desktop/image-category-headphones-1.png"
          },
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 MARK I",
            image: "/images/shared/desktop/image-category-headphones-3.png"
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 SPEAKER",
            image: "/images/shared/desktop/image-category-thumbnail-speakers.png"
          }
        ]
      }
    ];

    // Clear existing products first (optional)
    const existingProducts = await ctx.db.query("products").collect();
    for (const product of existingProducts) {
      await ctx.db.delete(product._id);
    }

    // Insert new products
    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return { success: true, count: products.length };
  },
});