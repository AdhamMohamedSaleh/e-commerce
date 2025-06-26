import React from "react";

const Returns = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-4xl font-bold mb-6">Returns & Exchanges</h1>
    <p className="mb-4 text-lg text-muted-foreground">
      Not satisfied with your purchase? We make returns and exchanges easy and
      hassle-free:
    </p>
    <ul className="list-disc pl-6 text-muted-foreground">
      <li>30-day return policy on all unworn items</li>
      <li>Free exchanges for size or color</li>
      <li>Refunds processed within 5 business days</li>
      <li>Contact support for a return label</li>
    </ul>
    <p className="mt-8 text-muted-foreground">
      For more information,{" "}
      <a href="mailto:info@solecrafted.com" className="text-primary underline">
        reach out to our team
      </a>
      .
    </p>
  </div>
);

export default Returns;
