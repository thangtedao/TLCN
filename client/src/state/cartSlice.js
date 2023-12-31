import { createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";

const initialState = {
  cart: [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const product = state.cart.find(
        (item) => item._id === action.payload.product._id
      );

      if (!product) {
        state.cart.push(action.payload.product);
      } else {
        product.count++;
      }

      if (action.payload.user) {
        const setCart = async () => {
          await customFetch.post("/user/cart", { cart: state.cart });
        };
        setCart();
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload.id);

      if (action.payload.user) {
        const setCart = async () => {
          await customFetch.post("/user/cart", { cart: state.cart });
        };
        setCart();
      }
    },
    deleteCart: (state, action) => {
      state.cart = [];
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload.id) {
          item.count++;
        }
        return item;
      });

      if (action.payload.user) {
        const setCart = async () => {
          await customFetch.post("/user/cart", { cart: state.cart });
        };
        setCart();
      }
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });

      if (action.payload.user) {
        const setCart = async () => {
          await customFetch.post("/user/cart", { cart: state.cart });
        };
        setCart();
      }
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  deleteCart,
  increaseCount,
  decreaseCount,
  setCartTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
