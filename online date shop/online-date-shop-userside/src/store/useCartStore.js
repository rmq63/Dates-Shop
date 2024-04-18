import { create } from "zustand";

// Define the initial state
const initialState = {
  cart: [],
  shippingInformation: {}
};

// Create a Zustand store
const useCartStore = create((set) => ({
  // State
  ...initialState,

  // Actions
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  clearCart: () => set({ cart: [] }),

  addShippingInfo: (info) => set(() => ({ shippingInformation: info }))
}));

export default useCartStore;
