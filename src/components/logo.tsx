import * as React from "react";

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary) / 0.7)', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <g transform="translate(50,50) scale(0.9)">
        <path d="M 0 -48 L 41.57 -24 L 41.57 24 L 0 48 L -41.57 24 L -41.57 -24 Z" fill="hsl(var(--sidebar-background) / 0.5)" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <path d="M 0 -28 L 24 -14 V 14 L 0 28 L -24 14 V -14 Z" fill="url(#grad1)" />
        <text x="0" y="5" fontFamily="sans-serif" fontSize="30" fill="hsl(var(--primary-foreground))" textAnchor="middle" fontWeight="bold">A</text>
    </g>
  </svg>
);