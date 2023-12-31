import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  Contact,
  Home,
  MainLayout,
  Login,
  Category,
  Register,
  Product,
  Cart,
  Payment,
  PaymentInfo,
  Order,
  Wishlist,
  Profile,
} from "./pages";

/* ACTION */
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as productAction } from "./pages/Product";
import { action as profileAction } from "./pages/Profile";
import { action as paymentInfoAction } from "./pages/PaymentInfo";

/* LOADER */
import { loader as mainLayoutLoader } from "./pages/MainLayout";
import { loader as homeLoader } from "./pages/Home";
import { loader as productLoader } from "./pages/Product";
import { loader as categoryLoader } from "./pages/Category";
import { loader as cartLoader } from "./pages/Cart";
import { loader as paymentInfoLoader } from "./pages/PaymentInfo";
import { loader as paymentLoader } from "./pages/Payment";
import { loader as orderLoader } from "./pages/Order";
import { loader as wishlistLoader } from "./pages/Wishlist";
import { loader as profileLoader } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    loader: mainLayoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "product/:slug",
        element: <Product />,
        loader: productLoader,
        action: productAction,
      },
      {
        path: "cart",
        children: [
          {
            index: true,
            element: <Cart />,
            loader: cartLoader,
          },
          {
            path: "payment-info",
            element: <PaymentInfo />,
            action: paymentInfoAction,
            loader: paymentInfoLoader,
          },
          {
            path: "payment",
            element: <Payment />,
            loader: paymentLoader,
          },
        ],
      },
      {
        path: "category/:slug1",
        element: <Category />,
        loader: categoryLoader,
        children: [
          {
            path: ":slug2",
            element: <Category />,
            loader: categoryLoader,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "order",
        element: <Order />,
        loader: orderLoader,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
        loader: wishlistLoader,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
        action: profileAction,
      },
    ],
  },
]);

const initialOptions = {
  clientId:
    "ATYjWM33ri0qOZCx71A9zu4qY0Erb9nGro7h-Gb89bSbeJS4asSc9sh7mT89YnHAKxmRpmLdpW0VNIU6",
  currency: "USD",
  intent: "capture",
};

const App = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  );
};

export default App;
