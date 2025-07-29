"use client";

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';
import { Image as ImageIcon } from 'lucide-react';

type SmartImageProps = ImageProps & {
  fallbackSrc?: string;
  containerClassName?: string;
};

export function SmartImage({
  src,
  alt,
  fallbackSrc = "https://placehold.co/600x400/222/FFF?text=Error",
  className,
  containerClassName,
  ...props
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div className={cn("relative w-full h-full bg-secondary/30", containerClassName)}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-destructive/10">
            <ImageIcon className="w-8 h-8 text-destructive" />
            <span className="text-xs mt-1">فشل تحميل الصورة</span>
        </div>
      )}
      <Image
        src={currentSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
    </div>
  );
}