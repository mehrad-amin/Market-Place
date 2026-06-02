import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // افزودن به سبد خرید
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        // اگر محصول قبلاً در سبد است، تعداد را افزایش بده
        existingItem.quantity += 1;
      } else {
        // محصول جدید به سبد اضافه شود
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // حذف از سبد خرید
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // افزایش تعداد
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // کاهش تعداد
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          // اگر تعداد 1 است، محصول را حذف کن
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },
    // خالی کردن سبد خرید
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalPrice = (state) => {
  return state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};
export const selectTotalItems = (state) => {
  return state.cart?.items.reduce((total, item) => total + item.quantity, 0);
};

export default cartSlice.reducer;
