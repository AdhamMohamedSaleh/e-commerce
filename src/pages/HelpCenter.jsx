import React from "react";

const HelpCenter = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-4xl font-bold mb-6">Help Center</h1>
    <p className="mb-4 text-lg text-muted-foreground">
      Need assistance? Our Help Center provides answers to common questions and
      support for your shopping experience at SoleCrafted.
    </p>
    <ul className="list-disc pl-6 text-muted-foreground">
      <li>Order tracking and status</li>
      <li>Account management</li>
      <li>Payment and billing</li>
      <li>Product information</li>
      <li>Contacting customer support</li>
    </ul>
    <p className="mt-8 text-muted-foreground">
      Can't find what you're looking for?{" "}
      <a href="mailto:info@solecrafted.com" className="text-primary underline">
        Contact us
      </a>{" "}
      and we'll be happy to help!
    </p>
  </div>
);

export default HelpCenter;
