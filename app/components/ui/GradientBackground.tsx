'use client';

import React from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
  fromColor?: string;
  viaColor?: string;
  toColor?: string;
  fromStop?: number;
  viaStop?: number;
  toStop?: number;
  className?: string;
}

export default function GradientBackground({
  children,
  fromColor,
  viaColor,
  toColor,
  fromStop = 9.13,
  viaStop = 54.81,
  toStop = 90.51,
  className = '',
}: GradientBackgroundProps) {
  // Use the requested gradient format with fixed percentages
  const gradient = fromColor && viaColor
    ? `radial-gradient(58.25% 50.19% at 96.04% 96.28%, ${fromColor} ${fromStop}%, ${viaColor} ${viaStop}%, #F7F4ED ${toStop}%)`
    : fromColor
      ? `radial-gradient(58.25% 50.19% at 96.04% 96.28%, ${fromColor} 9.13%, #F7F4ED 90.51%)`
      : 'radial-gradient(58.25% 50.19% at 96.04% 96.28%, #F5D0AE 9.13%, #F7F4ED 90.51%)';

  return (
    <div
      className={`relative ${className}`}
      style={{
        background: gradient,
      }}
    >
      {children}
    </div>
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}