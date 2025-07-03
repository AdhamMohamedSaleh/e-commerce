import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import useProductsStore from "@/features/products/productsStore";
import useCartStore from "@/features/cart/cartStore";
import useWishlistStore from "@/features/wishlist/wishlistStore";
import { useApp } from "@/contexts/AppContext";
import WishlistButton from "@/components/ui/WishlistButton";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { getProductById } = useProductsStore();
  const { addItem, isInCart } = useCartStore();
  const { toggleItem: toggleWishlistItem, isInWishlist } = useWishlistStore();
  const { addNotification } = useApp();

  const product = getProductById(parseInt(id));

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0] || "");
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      addNotification({
        type: "error",
        title: "Size Required",
        message: "Please select a size before adding to cart.",
      });
      return;
    }

    addItem(product, quantity, selectedSize);
    addNotification({
      type: "success",
      title: "Added to Cart",
      message: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    const inWishlist = isInWishlist(product.id);
    toggleWishlistItem(product);
    addNotification({
      type: "info",
      title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      message: `${product.name} has been ${
        inWishlist ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const isProductInCart = isInCart(product.id, selectedSize);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <button onClick={() => navigate("/")} className="hover:text-primary">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/shop")}
            className="hover:text-primary"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Discount Badge */}
              {product.originalPrice > product.price && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Rating */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-muted-foreground">
                {product.brand}
              </span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-muted-foreground"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary/10"
                        : "border-muted hover:border-muted-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <span className="text-3xl leading-none">-</span>
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="text-3xl leading-none">+</span>
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isProductInCart ? "Add More" : "Add to Cart"}
              </Button>
              <WishlistButton
                isWishlisted={isInWishlist(product.id)}
                onToggle={handleToggleWishlist}
                size={40}
                className="ml-2"
              />
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">
                    30-day return policy
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Safe & secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(
                (p) => p.category === product.category && p.id !== product.id
              )
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group hover:shadow-lg transition-all"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">
                          ${relatedProduct.price}
                        </span>
                        <Button
                          size="sm"
                          onClick={() =>
                            addItem(relatedProduct, 1, relatedProduct.sizes[0])
                          }
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
