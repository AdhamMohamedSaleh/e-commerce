// Mock product data
// TODO: Replace with GET /api/products

export const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand: "Nike",
    category: "Men",
    price: 150,
    originalPrice: 180,
    description:
      "The Nike Air Max 270 delivers unrivaled, all-day comfort. The shoe's design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colors.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Red", "Blue"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "Men",
    price: 180,
    originalPrice: 220,
    description:
      "The Ultraboost 22 features a responsive Boost midsole and a Primeknit+ upper that adapts to your foot for a personalized fit.",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Black", "White", "Grey"],
    rating: 4.7,
    reviews: 95,
    inStock: true,
    featured: true,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Puma RS-X",
    brand: "Puma",
    category: "Women",
    price: 110,
    originalPrice: 140,
    description:
      "The RS-X is a bold, chunky sneaker that combines retro styling with modern comfort. Perfect for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["Pink", "White", "Black"],
    rating: 4.3,
    reviews: 67,
    inStock: true,
    featured: false,
    createdAt: "2024-01-20",
  },
  {
    id: 4,
    name: "Converse Chuck Taylor",
    brand: "Converse",
    category: "Unisex",
    price: 65,
    originalPrice: 70,
    description:
      "The classic Chuck Taylor All Star is a timeless sneaker that goes with everything. Made with canvas upper and rubber sole.",
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Red", "Blue", "Green"],
    rating: 4.6,
    reviews: 234,
    inStock: true,
    featured: true,
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    name: "Vans Old Skool",
    brand: "Vans",
    category: "Unisex",
    price: 60,
    originalPrice: 65,
    description:
      "The Vans Old Skool features the iconic side stripe and durable canvas upper. Perfect for skateboarding and casual wear.",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "White", "Navy", "Red"],
    rating: 4.4,
    reviews: 156,
    inStock: true,
    featured: false,
    createdAt: "2024-01-12",
  },
  {
    id: 6,
    name: "New Balance 574",
    brand: "New Balance",
    category: "Men",
    price: 85,
    originalPrice: 100,
    description:
      "The New Balance 574 is a classic running shoe with superior comfort and style. Features ENCAP midsole technology.",
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Grey", "Navy", "Black"],
    rating: 4.5,
    reviews: 89,
    inStock: true,
    featured: false,
    createdAt: "2024-01-18",
  },
  {
    id: 7,
    name: "Reebok Classic",
    brand: "Reebok",
    category: "Women",
    price: 75,
    originalPrice: 90,
    description:
      "The Reebok Classic is a timeless sneaker with a soft leather upper and comfortable fit. Perfect for everyday style.",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["White", "Black", "Pink"],
    rating: 4.2,
    reviews: 73,
    inStock: true,
    featured: false,
    createdAt: "2024-01-25",
  },
  {
    id: 8,
    name: "Jordan Air 1",
    brand: "Nike",
    category: "Men",
    price: 170,
    originalPrice: 190,
    description:
      "The Air Jordan 1 is a basketball shoe that revolutionized the industry. Features premium leather and Air-Sole unit.",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Red", "Black", "White"],
    rating: 4.8,
    reviews: 201,
    inStock: true,
    featured: true,
    createdAt: "2024-01-08",
  },
  {
    id: 9,
    name: "Adidas Stan Smith",
    brand: "Adidas",
    category: "Unisex",
    price: 80,
    originalPrice: 95,
    description:
      "The Stan Smith is a classic tennis shoe with a clean, minimalist design. Features premium leather upper.",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Green", "Black"],
    rating: 4.4,
    reviews: 167,
    inStock: true,
    featured: false,
    createdAt: "2024-01-22",
  },
  {
    id: 10,
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "Unisex",
    price: 100,
    originalPrice: 120,
    description:
      "The Air Force 1 is a classic basketball shoe that has become a streetwear icon. Features a durable leather upper.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Red"],
    rating: 4.6,
    reviews: 189,
    inStock: true,
    featured: true,
    createdAt: "2024-01-14",
  },
];

export const categories = [
  { id: 1, name: "Men", slug: "men" },
  { id: 2, name: "Women", slug: "women" },
  { id: 3, name: "Kids", slug: "kids" },
  { id: 4, name: "Unisex", slug: "unisex" },
];

export const brands = [
  { id: 1, name: "Nike", slug: "nike" },
  { id: 2, name: "Adidas", slug: "adidas" },
  { id: 3, name: "Puma", slug: "puma" },
  { id: 4, name: "Converse", slug: "converse" },
  { id: 5, name: "Vans", slug: "vans" },
  { id: 6, name: "New Balance", slug: "new-balance" },
  { id: 7, name: "Reebok", slug: "reebok" },
];
