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
}

export default function GradientBackground({
  children,
  imagePath = '/long-card-gradient.png',
  className = '',
}: GradientBackgroundProps) {
  return (
    <div className={`relative ${className} overflow-hidden bg-[#F7F4ED]`}>
      <img
        src={imagePath}
        alt=""
        className="absolute top-[117px] left-[669px] max-w-none pointer-events-none select-none"
        aria-hidden="true"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Helper function removed as it's no longer used
