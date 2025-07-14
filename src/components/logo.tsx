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
        {/* Outer Shape */}
        <path 
            d="M -40 -40 L 40 -40 L 40 40 L -40 40 Z" 
            fill="hsl(var(--card) / 0.5)"
            stroke="url(#logo-gradient)" 
            strokeWidth="2"
            transform="rotate(45)"
        />
        {/* Inner 'A' shape */}
        <path 
            d="M 0 -25 L 22 25 L 12 25 L 0 5 L -12 25 L -22 25 Z"
            fill="hsl(var(--primary))"
        />
        {/* Accent line */}
        <path
            d="M -15 -5 L 15 -5"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="5"
            strokeLinecap="round"
        />
    </g>
  </svg>
);
