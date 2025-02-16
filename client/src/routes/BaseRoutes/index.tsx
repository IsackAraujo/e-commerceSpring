
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import PaymentPage from "./pages/PaymentPage";

export function BaseRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}
