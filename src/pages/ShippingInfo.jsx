import React from "react";

const ShippingInfo = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-4xl font-bold mb-6">Shipping Information</h1>
    <p className="mb-4 text-lg text-muted-foreground">
      We offer fast and reliable shipping to your doorstep. Here's what you need
      to know about our shipping policies:
    </p>
    <ul className="list-disc pl-6 text-muted-foreground">
      <li>Free standard shipping on orders over $50</li>
      <li>Express shipping options available at checkout</li>
      <li>Orders are processed within 1-2 business days</li>
      <li>Delivery times vary by location (2-7 business days)</li>
      <li>Tracking information provided for all orders</li>
    </ul>
    <p className="mt-8 text-muted-foreground">
      For more details or special shipping requests,{" "}
      <a href="mailto:info@solecrafted.com" className="text-primary underline">
        contact our support team
      </a>
      .
    </p>
  </div>
);

export default ShippingInfo;
