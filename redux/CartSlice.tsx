import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { rem } from "nativewind";

export interface CartState {
  cart: any[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const itemInCart = state.cart.find(
        (item) => item.ID == action.payload.ID
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      const removeFromCart = state.cart.filter(
        (item) => item.ID !== action.payload.ID
      );
      state.cart = removeFromCart;
    },
    incrementQuantity: (state, action: PayloadAction<any>) => {
      const itemInCart = state.cart.find(
        (item) => item.ID == action.payload.ID
      );
      if (itemInCart) {
        itemInCart.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<any>) => {
      const itemInCart = state.cart.find(
        (item) => item.ID == action.payload.ID
      );
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cart.filter(
          (item) => item.ID !== action.payload.ID
        );
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
