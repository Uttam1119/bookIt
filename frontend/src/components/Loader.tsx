import React from "react";

export default function Loader({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        className="animate-spin"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="rgba(91,124,253,0.15)"
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M45 25a20 20 0 00-20-20"
          stroke="#5B7CFD"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
