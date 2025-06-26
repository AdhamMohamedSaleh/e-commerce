import React from "react";

const About = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-4xl font-bold mb-6">About SoleCrafted</h1>
    <p className="mb-4 text-lg text-muted-foreground">
      SoleCrafted is dedicated to bringing you the latest in footwear fashion,
      combining comfort, quality, and style. Our mission is to empower every
      step you take with shoes that fit your lifestyle and personality.
    </p>
    <h2 className="text-2xl font-semibold mt-8 mb-2">Our Values</h2>
    <ul className="list-disc pl-6 text-muted-foreground">
      <li>Quality craftsmanship</li>
      <li>Customer satisfaction</li>
      <li>Innovation in design</li>
      <li>Sustainable practices</li>
    </ul>
    <p className="mt-8 text-muted-foreground">
      Thank you for choosing SoleCrafted. We're here to help you put your best
      foot forward!
    </p>
  </div>
);

export default About;
