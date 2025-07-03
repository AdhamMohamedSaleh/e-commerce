import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { Toaster } from "sonner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import SizeGuide from "./pages/SizeGuide";
import FAQ from "./pages/FAQ";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Toaster richColors />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/shipping" element={<ShippingInfo />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
