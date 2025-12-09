'use client';

import React from 'react';
import {
  // VideoPlayer,
  // VideoPlayerContent,
} from '@/components/ui/shadcn-io/video-player';

interface MLKeyResultsOnlyProps {
  title: string;
  description: string;
  image: string;
  video?: string;
  background?: string;
}

export default function MLKeyResultsOnly({
  title,
  description,
  image,
  video,
  background = 'bg-bg-light'
}: MLKeyResultsOnlyProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="mb-12 w-full">
          {title && (
            <h2 className="font-bricolage text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-xl-regular max-w-[768px] mb-8">
              {description}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          {video ? (
            // Video player commented out - using GIF instead
            <div className="w-full max-w-full h-auto rounded-[12px] overflow-hidden relative">
              <img
                src={video}
                alt={title || "Key Results"}
                className="w-full aspect-video"
              />
            </div>
          ) : (
            <img
              src={image}
              alt={title || "Key Results"}
              className="w-full max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      </div>
    </section>
  );
}
