"use client"

import React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type EnhancedCardProps = CardProps & MotionProps & {
  hoverEffect?: 'lift' | 'glow' | 'none';
  gradientBorder?: boolean;
};

export const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, children, hoverEffect = 'lift', gradientBorder = false, ...props }, ref) => {
    
    const motionVariants = {
        rest: { scale: 1, y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
        lift: { scale: 1.03, y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
        glow: { scale: 1.01, y: -2, boxShadow: `0 0 20px hsl(var(--primary) / 0.5)` },
    };

    const cardContent = (
      <Card
        ref={ref}
        className={cn("h-full transition-shadow duration-300", className)}
        {...props}
      >
        {children}
      </Card>
    );

    const motionProps = hoverEffect !== 'none' ? {
        whileHover: hoverEffect,
        initial: "rest",
        animate: "rest",
        variants: motionVariants,
        transition: { duration: 0.3, ease: 'easeOut' },
    } : {};


    if (gradientBorder) {
        return (
            <div className="relative p-[2px] rounded-lg overflow-hidden">
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-accent to-primary animate-pulse" style={{ animationDuration: '3s' }}/>
                 <motion.div {...motionProps} className="relative z-10">
                    {cardContent}
                </motion.div>
            </div>
        )
    }

    return <motion.div {...motionProps}>{cardContent}</motion.div>;
  }
);

EnhancedCard.displayName = 'EnhancedCard';
