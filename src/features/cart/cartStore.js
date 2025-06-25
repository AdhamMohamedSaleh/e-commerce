import { create } from "zustand";
import { persist } from "zustand/middleware";

// TODO: Replace with GET /api/cart
// TODO: Replace with POST /api/cart/add
// TODO: Replace with PUT /api/cart/update
// TODO: Replace with DELETE /api/cart/remove

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Add item to cart
      addItem: (product, quantity = 1, size = null) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id && item.size === size
          );

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map((item) =>
                item.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  size: size,
                  quantity: quantity,
                  brand: product.brand,
                },
              ],
            };
          }
        });
      },

      // Remove item from cart
      removeItem: (itemId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === itemId && item.size === size)
          ),
        }));
      },

      // Update item quantity
      updateQuantity: (itemId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      // Clear cart
      clearCart: () => {
        set({ items: [] });
      },

      // Toggle cart sidebar
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      // Close cart
      closeCart: () => {
        set({ isOpen: false });
      },

      // Get cart total
      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Get cart count
      getCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      // Check if item is in cart
      isInCart: (productId, size) => {
        const { items } = get();
        return items.some(
          (item) => item.id === productId && item.size === size
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
