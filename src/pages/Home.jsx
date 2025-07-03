import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, categories } from "@/data/products";
import useProductsStore from "@/features/products/productsStore";
import useCartStore from "@/features/cart/cartStore";
import { useApp } from "@/contexts/AppContext";
import useWishlistStore from "@/features/wishlist/wishlistStore";

const Home = () => {
  const { setProducts, setCategories } = useProductsStore();
  const { addItem } = useCartStore();
  const { addNotification } = useApp();
  const { toggleItem: toggleWishlistItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    // Initialize products and categories
    setProducts(products);
    setCategories(categories);
  }, [setProducts, setCategories]);

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 6);

  const handleAddToCart = (product) => {
    addItem(product, 1, product.sizes[0]);
    addNotification({
      type: "success",
      title: "Added to Cart",
      message: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Step into
                <span className="text-primary block">Style</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover the latest trends in footwear. From casual sneakers to
                elegant heels, we have the perfect pair for every occasion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/shop">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/shop">Browse Collection</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
                      alt="Sneakers"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="bg-background rounded-lg p-4 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop"
                      alt="Running Shoes"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-background rounded-lg p-4 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop"
                      alt="Casual Shoes"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="bg-background rounded-lg p-4 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=300&h=300&fit=crop"
                      alt="Classic Shoes"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">
              Find the perfect shoes for your style
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group cursor-pointer hover:shadow-lg transition-all"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">👟</span>
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {
                      products.filter((p) => p.category === category.name)
                        .length
                    }{" "}
                    products
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/shop?category=${category.slug}`}>
                      View All
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">
              Our most popular and trending shoes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-all"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice > product.price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {product.brand}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-[2]"
                      asChild
                    >
                      <Link to={`/product/${product.id}`}>View Details</Link>
                    </Button>
                    <Button
                      size="sm"
                      className={
                        `flex-[1] flex items-center justify-center gap-2 whitespace-nowrap relative overflow-hidden bg-black` +
                        (isInWishlist(product.id) ? "" : "")
                      }
                      onClick={() => {
                        const wasInWishlist = isInWishlist(product.id);
                        toggleWishlistItem(product);
                        setTimeout(() => {
                          if (wasInWishlist) {
                            addNotification({
                              type: "info",
                              title: "Removed from Wishlist",
                              message: `${product.name} has been removed from your wishlist.`,
                            });
                          } else {
                            addNotification({
                              type: "success",
                              title: "Added to Wishlist",
                              message: `${product.name} has been added to your wishlist.`,
                            });
                          }
                        }, 0);
                      }}
                    >
                      <span
                        className={`relative z-10 transition-colors duration-300 ${
                          isInWishlist(product.id)
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-bold"
                            : "text-white"
                        }`}
                      >
                        Add to Wishlist
                      </span>
                      <span className="absolute inset-0 bg-white/20 translate-x-full hover:translate-x-0 transition-transform duration-300 ease-out z-0 pointer-events-none"></span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $50
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">
                30-day return policy for all items
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">
                Safe and secure payment processing
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
