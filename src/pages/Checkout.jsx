import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useCartStore from "@/features/cart/cartStore";
import { useApp } from "@/contexts/AppContext";

// TODO: Replace with POST /api/orders
// TODO: Replace with POST /api/payment

const paymentMethods = [
  { value: "card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "applepay", label: "Apple Pay" },
];

const checkoutSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(5, "ZIP code is required"),
    paymentMethod: z.enum(["card", "paypal", "applepay"]),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "card") {
        return (
          data.cardNumber &&
          data.cardNumber.length >= 16 &&
          data.expiryDate &&
          data.expiryDate.length >= 5 &&
          data.cvv &&
          data.cvv.length >= 3
        );
      }
      return true;
    },
    {
      message: "Card details are required for credit card payments.",
      path: ["cardNumber"],
    }
  );

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const { items, getTotal, clearCart } = useCartStore();
  const { addNotification } = useApp();

  const cartTotal = getTotal();
  const shipping = cartTotal > 50 ? 0 : 10;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "card" },
  });

  // Keep local state and form state in sync
  const watchedPaymentMethod = watch("paymentMethod", paymentMethod);

  const onSubmit = async (data) => {
    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...data, items, total: finalTotal })
      // });

      setOrderPlaced(true);
      clearCart();
      addNotification({
        type: "success",
        title: "Order Placed!",
        message:
          "Your order has been successfully placed. You will receive a confirmation email shortly.",
      });
    } catch (error) {
      addNotification({
        type: "error",
        title: "Order Failed",
        message: "There was an error processing your order. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Please add some items to your cart before checkout.
            </p>
            <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center py-12">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h1 className="text-2xl font-bold mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. You will receive a confirmation email
              shortly.
            </p>
            <div className="space-y-4">
              <Button onClick={() => navigate("/")} className="w-full">
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/orders")}
                className="w-full"
              >
                View Orders
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
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/cart")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <Input
                        {...register("firstName")}
                        placeholder="John"
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <Input
                        {...register("lastName")}
                        placeholder="Doe"
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <Input
                      {...register("phone")}
                      placeholder="(555) 123-4567"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <Input
                      {...register("address")}
                      placeholder="123 Main St"
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        City
                      </label>
                      <Input
                        {...register("city")}
                        placeholder="New York"
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        State
                      </label>
                      <Input
                        {...register("state")}
                        placeholder="NY"
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        ZIP Code
                      </label>
                      <Input
                        {...register("zipCode")}
                        placeholder="10001"
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={method.value}
                          {...register("paymentMethod")}
                          checked={watchedPaymentMethod === method.value}
                          onChange={() => {
                            setValue("paymentMethod", method.value);
                            setPaymentMethod(method.value);
                          }}
                        />
                        {method.label}
                      </label>
                    ))}
                  </div>
                  {watchedPaymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Card Number
                        </label>
                        <Input
                          {...register("cardNumber")}
                          placeholder="1234 5678 9012 3456"
                          className={errors.cardNumber ? "border-red-500" : ""}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Expiry Date
                          </label>
                          <Input
                            {...register("expiryDate")}
                            placeholder="MM/YY"
                            className={
                              errors.expiryDate ? "border-red-500" : ""
                            }
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.expiryDate.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            CVV
                          </label>
                          <Input
                            {...register("cvv")}
                            placeholder="123"
                            className={errors.cvv ? "border-red-500" : ""}
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cvv.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {watchedPaymentMethod === "paypal" && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      Pay with PayPal (Coming Soon)
                    </Button>
                  )}
                  {watchedPaymentMethod === "applepay" && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      Pay with Apple Pay (Coming Soon)
                    </Button>
                  )}
                  {/* TODO: Integrate with real payment provider on backend */}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex items-center space-x-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size {item.size} • Qty {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
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
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  Your payment information is encrypted and secure. We use
                  industry-standard SSL encryption to protect your data.
                </AlertDescription>
              </Alert>

              {/* Place Order Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Processing..."
                  : `Place Order - $${finalTotal.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
