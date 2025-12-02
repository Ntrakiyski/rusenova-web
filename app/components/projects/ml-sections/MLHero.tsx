'use client';

import React from 'react';
import Image from 'next/image';
import {
  VideoPlayer,
  VideoPlayerContent,
} from '@/components/ui/shadcn-io/video-player';

interface MLHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroVideo?: string;
  decorationImage?: string;
  background?: string;
}

export default function MLHero({
  title,
  subtitle,
  heroImage,
  heroVideo,
  decorationImage,
  background
}: MLHeroProps) {
  // Always use the same dark background as navigation: #252222
  const heroBackground = background || 'bg-bg-dark';

  return (
    <section 
      className={`${heroBackground} relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[760px] pt-24 md:pt-32`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 h-full flex items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Hero Text */}
          <div className="flex-1 w-full">
            <h1 className="font-bricolage text-text-white text-display-2xl font-medium mb-6">
              {title}
            </h1>
            <p className="font-bricolage text-text-white text-text-xl-regular max-w-[480px]">
              {subtitle}
            </p>
          </div>

          {/* Hero Image or Video */}
          <div className="flex-1 w-full relative">
            <div className="relative w-full">
              {heroVideo ? (
                <div className="w-full rounded-[12px] overflow-hidden shadow-xl relative">
                  <VideoPlayer suppressHydrationWarning>
                    <VideoPlayerContent 
                      slot="media" 
                      src={heroVideo} 
                      className="w-full aspect-video" 
                      autoPlay
                      muted
                      loop
                      playsInline
                      suppressHydrationWarning 
                    />
                  </VideoPlayer>
                </div>
              ) : (
                <Image
                  src={heroImage}
                  alt={`${title} Hero`}
                  className="w-full rounded-[12px]"
                  width={592}
                  height={400}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements removed */}
    </section>
  );
}
