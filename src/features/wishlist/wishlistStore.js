import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add item to wishlist
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );
          if (existingItem) {
            return state; // Item already in wishlist
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                brand: product.brand,
              },
            ],
          };
        });
      },

      // Remove item from wishlist
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      // Toggle item in wishlist
      toggleItem: (product) => {
        const { items, addItem, removeItem } = get();
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },

      // Clear wishlist
      clearWishlist: () => {
        set({ items: [] });
      },

      // Get wishlist count
      getCount: () => {
        return get().items.length;
      },

      // Check if item is in wishlist
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useWishlistStore;
