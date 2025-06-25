import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useCartStore from "@/features/cart/cartStore";
import { useApp } from "@/contexts/AppContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotal, getCount, clearCart } =
    useCartStore();
  const { addNotification } = useApp();

  const cartTotal = getTotal();
  const cartCount = getCount();
  const shipping = cartTotal > 50 ? 0 : 10;
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + shipping + tax;

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(item.id, item.size);
      addNotification({
        type: "info",
        title: "Item Removed",
        message: `${item.name} has been removed from your cart.`,
      });
    } else {
      updateQuantity(item.id, item.size, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeItem(item.id, item.size);
    addNotification({
      type: "info",
      title: "Item Removed",
      message: `${item.name} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    addNotification({
      type: "info",
      title: "Cart Cleared",
      message: "All items have been removed from your cart.",
    });
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/shop">Start Shopping</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/">Continue Shopping</Link>
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
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.size}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.brand} • Size {item.size}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span className="font-bold">${item.price}</span>
                            <span className="text-sm text-muted-foreground">
                              ${(item.price * item.quantity).toFixed(2)} total
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantityChange(item, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantityChange(item, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Summary Items */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                {shipping > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Free shipping on orders over $50
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add ${(50 - cartTotal).toFixed(2)} more to get free
                      shipping
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Button size="lg" className="w-full mb-4" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                {/* Continue Shopping */}
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
