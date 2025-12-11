'use client';

import React from 'react';

interface VideoPlayerProps {
  src: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export default function VideoPlayer({
  src,
  title = 'Video',
  className = '',
  width = 800,
  height = 500,
  controls = false,  // Changed to false - no controls
  autoPlay = true,   // Changed to true - autoplay
  loop = true,       // Changed to true - loop
  muted = true       // Changed to true - muted
}: VideoPlayerProps) {
  // Ensure the src path is correct for public folder
  const videoSrc = src.startsWith('/') ? src : `/${src}`;
  
  return (
    <div className={`relative w-full rounded-[12px] overflow-hidden ${className}`}>
      <video
        src={videoSrc}
        className="w-full h-full object-cover"
        width={width}
        height={height}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        aria-label={title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
