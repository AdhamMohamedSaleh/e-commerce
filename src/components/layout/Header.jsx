import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Sun,
  Moon,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/contexts/AppContext";
import useCartStore from "@/features/cart/cartStore";
import useWishlistStore from "@/features/wishlist/wishlistStore";
import logo from "@/assets/logo.svg";

const Header = () => {
  const { theme, setTheme, user, logout, isSessionLoading } =
    useContext(AppContext);
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const wishlistItemCount = wishlistItems.length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-primary"
            aria-label="SoleCrafted Home"
          >
            <img src={logo} alt="SoleCrafted Logo" className="h-8 w-8" />
            <span>SoleCrafted</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="text-sm font-medium transition-colors text-black hover:text-blue-500"
              aria-label="Go to home page"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-sm font-medium transition-colors text-black hover:text-blue-500"
              aria-label="Go to shop page"
            >
              Shop
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm font-medium transition-colors hover:text-primary"
                aria-label="Go to admin panel"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search shoes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search for shoes"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              aria-label="Search"
              className="relative overflow-hidden bg-black text-white w-20 h-9 p-0 flex-shrink-0 !bg-black !text-white"
            >
              <span className="relative z-10">Search</span>
              <span className="absolute inset-0 bg-white/20 translate-x-full hover:translate-x-0 active:translate-x-0 transition-transform duration-300 ease-out z-0 pointer-events-none" />
            </Button>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } theme`}
              className="group"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-white group-hover:text-black" />
              ) : (
                <Moon className="h-4 w-4 text-white group-hover:text-black" />
              )}
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative flex items-center group">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 text-white group-hover:text-black" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {wishlistItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <div className="hidden md:block">
              {isSessionLoading ? (
                <div className="flex items-center space-x-2 animate-pulse">
                  <div className="h-4 w-16 rounded bg-muted" />
                  <div className="h-9 w-9 rounded-md bg-muted" />
                  <div className="h-9 w-20 rounded-md bg-muted" />
                </div>
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Hi, {user.name}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/profile">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="link-primary"
                    size="sm"
                    onClick={logout}
                    aria-label="Sign out"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" aria-label="Sign in">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative"
              aria-label="View shopping cart"
            >
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden border-t py-4"
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <nav
              className="flex flex-col space-y-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}

              {/* Mobile Search */}
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search shoes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" size="sm">
                  Search
                </Button>
              </form>

              {/* Mobile User Actions */}
              <div className="flex flex-col space-y-2">
                {isSessionLoading ? (
                  <div className="h-9 w-full rounded-md bg-muted animate-pulse" />
                ) : user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Hi, {user.name}
                    </span>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/profile">
                          <User className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="link-primary"
                        size="sm"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login" className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
