'use client';

import React from 'react';
import Image from 'next/image';

/**
 * ImageGallery components for displaying various image layouts
 */

interface ImageGalleryProps {
  images: string[];
  layout?: 'grid' | 'stack' | 'carousel';
  className?: string;
}

interface ImageCardProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * ImageCard component for individual image cards with consistent styling
 */
export function ImageCard({
  src,
  alt = '',
  className = '',
  width = 592,
  height = 378,
  rounded = 'lg',
}: ImageCardProps) {
  const roundedClasses = {
    sm: 'rounded-[12px]',
    md: 'rounded-[16px]',
    lg: 'rounded-[24px]',
    xl: 'rounded-[32px]',
    full: 'rounded-full',
  };

  return (
    <div className={`overflow-hidden ${roundedClasses[rounded]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/**
 * StackedImageGallery component for stacked image layouts
 */
export function StackedImageGallery({
  images,
  className = '',
}: {
  images: string[];
  className?: string;
}) {
  if (images.length === 3) {
    return (
      <div className={`relative w-full max-w-[592px] h-[378px] ${className}`}>
        {/* Left image */}
        <div className="absolute left-0 top-0 w-[183px] h-[377px] rounded-[32px] overflow-hidden">
          <Image
            src={images[2]}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Center image */}
        <div className="absolute left-[204px] top-px w-[183px] h-[378px] rounded-[32px] overflow-hidden">
          <Image
            src={images[0]}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Right image */}
        <div className="absolute left-[409px] top-0 w-[183px] h-[378px] rounded-[32px] overflow-hidden">
          <Image
            src={images[1]}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-[592px] h-[378px] ${className}`}>
      {images.map((src, index) => (
        <div
          key={index}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[183px] h-[378px] rounded-[32px] overflow-hidden"
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * SingleImageGallery component for single image layouts with decorative elements
 */
export function SingleImageGallery({
  src,
  alt = '',
  className = '',
  width = 394,
  height = 560,
}: {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className={`relative w-[${width}px] h-[${height}px] ${className}`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover rounded-[16px]"
        />
      </div>
    </div>
  );
}