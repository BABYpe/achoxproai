
"use client";

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';
import { ImageIcon } from 'lucide-react';

type SmartImageProps = ImageProps & {
  fallbackSrc?: string;
  containerClassName?: string;
};

export function SmartImage({
  src,
  alt,
  fallbackSrc = "https://placehold.co/600x400/171717/333333?text=?",
  className,
  containerClassName,
  ...props
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Only update if the src prop actually changes
    if (src) {
        setCurrentSrc(src);
        setIsLoading(true);
        setHasError(false);
    } else {
        // Handle case where src is initially null or undefined
        setIsLoading(false);
        setHasError(true);
        setCurrentSrc(fallbackSrc);
    }
  }, [src, fallbackSrc]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setCurrentSrc(fallbackSrc);
  };

  return (
    <div className={cn("relative w-full h-full bg-secondary/30 overflow-hidden", containerClassName)}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-secondary/50">
            <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
        </div>
      )}
      <Image
        key={currentSrc?.toString()} // Add key to force re-render on src change
        src={currentSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading || hasError ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
