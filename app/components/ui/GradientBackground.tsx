'use client';

import React from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
  imagePath?: string;
  className?: string;
  // Kept for backward compatibility but unused
  fromColor?: string;
  viaColor?: string;
  toColor?: string;
  fromStop?: number;
  viaStop?: number;
  toStop?: number;
  gradient?: boolean;
}

export default function GradientBackground({
  children,
  imagePath = '/long-card-gradient.png',
  className = '',
  gradient = true,
}: GradientBackgroundProps) {
  return (
    <div className={`relative ${className} overflow-hidden bg-[#F7F4ED]`}>
      {gradient && (
        <img
          src={imagePath}
          alt=""
          className="absolute top-[30%] left-[669px] max-w-none pointer-events-none select-none"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Helper function removed as it's no longer used
