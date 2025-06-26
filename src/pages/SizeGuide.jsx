import React from "react";

const SizeGuide = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-4xl font-bold mb-6">Size Guide</h1>
    <p className="mb-4 text-lg text-muted-foreground">
      Find your perfect fit! Use our size guide to choose the right size for
      your new shoes.
    </p>
    <h2 className="text-2xl font-semibold mt-8 mb-2">Men's Shoe Size Chart</h2>
    <table className="w-full mb-6 text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2">US</th>
          <th className="border-b p-2">EU</th>
          <th className="border-b p-2">UK</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">7</td>
          <td className="p-2">40</td>
          <td className="p-2">6</td>
        </tr>
        <tr>
          <td className="p-2">8</td>
          <td className="p-2">41</td>
          <td className="p-2">7</td>
        </tr>
        <tr>
          <td className="p-2">9</td>
          <td className="p-2">42</td>
          <td className="p-2">8</td>
        </tr>
        <tr>
          <td className="p-2">10</td>
          <td className="p-2">43</td>
          <td className="p-2">9</td>
        </tr>
        <tr>
          <td className="p-2">11</td>
          <td className="p-2">44</td>
          <td className="p-2">10</td>
        </tr>
      </tbody>
    </table>
    <h2 className="text-2xl font-semibold mt-8 mb-2">Tips for the Best Fit</h2>
    <ul className="list-disc pl-6 text-muted-foreground">
      <li>Measure your feet in the afternoon for the most accurate size</li>
      <li>Wear the type of socks you plan to use with your shoes</li>
      <li>If you're between sizes, size up for comfort</li>
    </ul>
  </div>
);

export default SizeGuide;
