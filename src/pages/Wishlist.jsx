import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useWishlistStore from "@/features/wishlist/wishlistStore";
import useCartStore from "@/features/cart/cartStore";
import { useApp } from "@/contexts/AppContext";
import WishlistButton from "@/components/ui/WishlistButton";

const Wishlist = () => {
  const navigate = useNavigate();
  const { items, removeItem, getCount, clearWishlist } = useWishlistStore();
  const { addItem: addItemToCart } = useCartStore();
  const { addNotification } = useApp();
  const wishlistCount = getCount();

  const handleRemoveItem = (item) => {
    removeItem(item.id);
    addNotification({
      type: "info",
      title: "Item Removed",
      message: `${item.name} has been removed from your wishlist.`,
    });
  };

  const handleClearWishlist = () => {
    clearWishlist();
    addNotification({
      type: "info",
      title: "Wishlist Cleared",
      message: "All items have been removed from your wishlist.",
    });
  };

  const handleAddToCart = (product) => {
    // Assuming a default size and quantity for simplicity
    const defaultSize = product.sizes?.[0] || "One Size";
    addItemToCart({ ...product, size: defaultSize }, 1);
    removeItem(product.id); // remove from wishlist after adding to cart
    addNotification({
      type: "success",
      title: "Added to Cart",
      message: `${product.name} has been moved to your cart.`,
    });
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <WishlistButton isWishlisted={false} size={64} />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your wishlist yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/shop">Explore Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlistCount} {wishlistCount === 1 ? "item" : "items"} in your
                wishlist
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleClearWishlist}>
            Clear Wishlist
          </Button>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  </Link>
                  <div className="absolute top-2 right-2">
                    <WishlistButton
                      isWishlisted={true}
                      onToggle={() => handleRemoveItem(item)}
                      size={32}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.brand}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${item.price}</span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
