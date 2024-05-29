import React, { Routes, Route } from "react-router-dom";
import Contact from "./components/Pages/ContactPage";
import Layout from "./components/Layout";
import Home from "./components/Pages/HomePage";
import Product from "./components/Pages/SingleProductPage";
import Cart from "./components/Pages/CartPage";
import CheckoutSuccess from "./components/Pages/CheckoutSuccessPage";
import "./sass/styles.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<CheckoutSuccess />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
