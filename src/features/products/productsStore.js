import { create } from "zustand";
import { products, categories, brands } from "@/data/products";

// TODO: Replace with GET /api/products
// TODO: Replace with GET /api/products/:id
// TODO: Replace with GET /api/categories
// TODO: Replace with GET /api/brands

const useProductsStore = create((set, get) => ({
  products: [],
  categories: [],
  brands: [],
  filters: {
    category: "",
    brand: "",
    size: "",
    color: "",
    minPrice: 0,
    maxPrice: 1000,
    search: "",
  },
  sortBy: "newest",
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ products, categories, brands, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", isLoading: false });
    }
  },

  // Set products
  setProducts: (products) => set({ products }),

  // Set categories
  setCategories: (categories) => set({ categories }),

  // Set brands
  setBrands: (brands) => set({ brands }),

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error
  setError: (error) => set({ error }),

  // Update filters
  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  // Clear filters
  clearFilters: () =>
    set({
      filters: {
        category: "",
        brand: "",
        size: "",
        color: "",
        minPrice: 0,
        maxPrice: 1000,
        search: "",
      },
    }),

  // Set sort
  setSortBy: (sortBy) => set({ sortBy }),

  // Get filtered and sorted products
  getFilteredProducts: () => {
    const { products, filters, sortBy } = get();

    let filtered = [...products];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand === filters.brand);
    }

    // Apply size filter
    if (filters.size) {
      filtered = filtered.filter((product) =>
        product.sizes?.includes(filters.size)
      );
    }

    // Apply color filter
    if (filters.color) {
      filtered = filtered.filter((product) =>
        product.colors?.includes(filters.color)
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "popular":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  },

  // Get product by ID
  getProductById: (id) => {
    const { products } = get();
    return products.find((product) => product.id === id);
  },

  // Get unique sizes
  getUniqueSizes: () => {
    const { products } = get();
    const sizes = new Set();
    products.forEach((product) => {
      product.sizes?.forEach((size) => sizes.add(size));
    });
    return Array.from(sizes).sort();
  },

  // Get unique colors
  getUniqueColors: () => {
    const { products } = get();
    const colors = new Set();
    products.forEach((product) => {
      product.colors?.forEach((color) => colors.add(color));
    });
    return Array.from(colors).sort();
  },

  // Get price range
  getPriceRange: () => {
    const { products } = get();
    if (products.length === 0) return { min: 0, max: 1000 };

    const prices = products.map((product) => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  },
}));

export default useProductsStore;
