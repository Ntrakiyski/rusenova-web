'use client';

import React from 'react';
import Image from 'next/image';
import {
  // VideoPlayer,
  // VideoPlayerContent,
} from '@/components/ui/shadcn-io/video-player';
import type { Metric } from '@/types/project';

interface MLHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroVideo?: string;
  decorationImage?: string;
  background?: string;
  metrics?: Metric[];
}

export default function MLHero({
  title,
  subtitle,
  heroImage,
  heroVideo,
  decorationImage,
  background,
  metrics = []
}: MLHeroProps) {
  // Always use the same dark background as navigation: #252222
  const heroBackground = background || 'bg-bg-dark';


  return (
    <section 
      className={`bg-bg-light text-text-primary relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[760px] 2xl:min-h-[760px] pt-24 md:pt-32`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 h-full">
        {/* First Row: Text on Left, Video/Image on Right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
          {/* Hero Text */}
          <div className="flex-1 w-full">
            <h1 className="font-bricolage text-display-2xl font-medium mb-6">
              {title}
            </h1>
            <p className="font-bricolage text-text-xl-regular max-w-[480px]">
              {subtitle}
            </p>
          </div>

          {/* Hero Image or GIF */}
          <div className="flex-1 w-full relative">
            <div className="relative w-full">
              {heroVideo ? (
                // Video player commented out - using GIF instead
                <Image
                  src={heroVideo}
                  alt={`${title} Animation`}
                  className="w-full rounded-[12px] aspect-video"
                  width={592}
                  height={400}
                />
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

        {/* Second Row: Three Cards Centered */}
        {metrics.length > 0 && (
          <div className="flex justify-center py-xl-2">
            <div className="max-w-[1088px] px-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {metrics.map((metric, index) => (
                  <div
                    key={index} 
                    className="border border-stroke rounded-[16px] p-6 w-full"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      {metric.icon ? (
                        <div className={`${metric.iconBg} rounded-[12px] w-12 h-12 flex items-center justify-center shrink-0`}>
                          <img 
                            src={metric.icon} 
                            alt={metric.label} 
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                      ) : (
                        <div className={`${metric.iconBg || 'bg-[#E0EAFF]'} rounded-[12px] w-12 h-12 flex items-center justify-center shrink-0`}>
                          <img 
                            src="/info-square.svg" 
                            alt={metric.label} 
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <p className="font-bricolage text-text-xl-semibold">
                          {metric.value}
                        </p>
                        <p className="font-bricolage text-text-md-regular">
                          {metric.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background decorative elements removed */}
    </section>
  );
}
