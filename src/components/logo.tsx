
import * as React from "react";

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    <g transform="translate(50,50) scale(1)">
        {/* Abstract 'A' Shape */}
        <path 
            d="M 0 -35 L 30 35 L 15 35 L 0 -10 L -15 35 L -30 35 Z"
            fill="url(#logo-gradient)"
        />
        {/* 'X' Shape / Crossbar */}
        <path
            d="M -18 5 L 18 5 M 0 -10 L 0 20"
            fill="none"
            stroke="hsl(var(--background))"
            strokeWidth="6"
            strokeLinecap="round"
        />
    </g>
  </svg>
);
