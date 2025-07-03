import React, { useState } from "react";
import { Heart } from "lucide-react";

export default function WishlistButton({
  isWishlisted = false,
  onToggle = () => {},
  className = "",
  size = 36, // px
  ...props
}) {
  const [animate, setAnimate] = useState(false);

  const handleClick = (e) => {
    setAnimate(true);
    onToggle(e);
    setTimeout(() => setAnimate(false), 350);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-center bg-black border border-black rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer p-0 relative ${className} group`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      {...props}
    >
      <Heart
        className={`transition-all duration-300 heart-anim ${
          isWishlisted ? "scale-110" : "scale-100"
        } ${animate ? "animate-ping-heart" : ""}`}
        size={size * 0.65}
        stroke={isWishlisted ? "white" : "white"}
        fill={isWishlisted ? "white" : "none"}
      />
      <style>{`
        @keyframes ping-heart {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-ping-heart {
          animation: ping-heart 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .heart-anim {
          transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), opacity 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        button:hover {
          background: white !important;
        }
        button:hover .heart-anim {
          stroke: black !important;
          fill: none !important;
        }
      `}</style>
    </button>
  );
}
