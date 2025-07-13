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
        {/* Main Hexagon Shape */}
        <path 
            d="M0 -48 L 41.57 -24 L 41.57 24 L 0 48 L -41.57 24 L -41.57 -24 Z" 
            fill="hsl(var(--card))" 
            stroke="url(#logo-gradient)" 
            strokeWidth="3" 
        />
        {/* Inner Geometric "A" */}
        <path 
            d="M 0 -24 L 20 0 L 0 24 M -20 0 L 20 0" 
            fill="none" 
            stroke="hsl(var(--primary))"
            strokeWidth="6" 
            strokeLinecap="round"
            strokeLinejoin="round"
        />
         <path 
            d="M -10 -12 L 10 -12" 
            fill="none" 
            stroke="hsl(var(--accent))"
            strokeWidth="6"
            strokeLinecap="round"
        />
    </g>
  </svg>
);
