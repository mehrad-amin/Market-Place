import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

const loadStateFromLocalStorage = () => {
  if (typeof window === "undefined") return undefined;

  try {
    const serializedState = localStorage.getItem("cart");

    if (!serializedState || serializedState === "null") {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);

    if (parsedState && Array.isArray(parsedState.items)) {
      return parsedState;
    }

    return undefined;
  } catch (error) {
    console.error("خطا در خواندن از localStorage:", error);
    // پاک کردن داده خراب
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    return undefined;
  }
};

const saveStateToLocalStorage = (state) => {
  if (typeof window === "undefined") return;

  try {
    if (state?.cart && Array.isArray(state.cart.items)) {
      const serializedState = JSON.stringify(state.cart);
      localStorage.setItem("cart", serializedState);
    }
  } catch (err) {
    console.error("خطا در ذخیره در localStorage:", err);
  }
};

const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: preloadedState ? { cart: preloadedState } : undefined,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
