import React from "react";

const FAQ = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">How do I place an order?</h2>
      <p className="text-muted-foreground">
        Simply browse our shop, add items to your cart, and proceed to checkout.
        Follow the prompts to complete your purchase.
      </p>
    </div>
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        What payment methods do you accept?
      </h2>
      <p className="text-muted-foreground">
        We accept all major credit cards, PayPal, and Apple Pay.
      </p>
    </div>
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">How can I track my order?</h2>
      <p className="text-muted-foreground">
        Once your order ships, you'll receive a tracking link via email.
      </p>
    </div>
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        Can I return or exchange my purchase?
      </h2>
      <p className="text-muted-foreground">
        Yes! See our Returns & Exchanges page for details on how to start a
        return or exchange.
      </p>
    </div>
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        How do I contact customer support?
      </h2>
      <p className="text-muted-foreground">
        Email us at{" "}
        <a
          href="mailto:info@solecrafted.com"
          className="text-primary underline"
        >
          info@solecrafted.com
        </a>{" "}
        or call (555) 123-4567.
      </p>
    </div>
  </div>
);

export default FAQ;
