'use client';

import React from 'react';
import Image from 'next/image';
import type { Metric } from '@/types/project';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface MLHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroVideo?: string;
  metrics?: Metric[];
}

export default function MLHero({
  title,
  subtitle,
  heroImage,
  heroVideo,
  metrics = []
}: MLHeroProps) {
  // Always use the same dark background as navigation: #252222
  // const heroBackground = background || 'bg-bg-dark';


  return (
    <section
      className={`bg-bg-dark text-text-white relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden pt-16 md:pt-24 lg:pt-32 mb-16 md:mb-24 lg:mb-32`}
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 h-full">
        {/* First Row: Centered Title and Subtitle */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="font-bricolage text-display-2xl text-text-white font-medium mb-6 max-w-[700px]">
            {title}
          </h1>
          <p className="text-text-light-gray text-text-xl-regular max-w-[600px]">
            {subtitle}
          </p>
        </div>

        {/* Second Row: Video/Image taking full width */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-[1088px] px-8">
            {heroVideo ? (
              <VideoPlayer
                src={heroVideo}
                title={`${title} Animation`}
                width={800}
                height={500}
              />
            ) : (
              <Image
                src={heroImage}
                alt={`${title} Hero`}
                className="w-full rounded-[12px]"
                width={800}
                height={500}
              />
            )}
          </div>
        </div>

        {/* Third Row: Three Cards Centered */}
        {metrics.length > 0 && (
          <div className="flex justify-center py-xl-2 ">
            <div className="max-w-[1088px] px-8 w-full ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {metrics.map((metric, index) => (
                  <div
                    key={index}
                    className=" bg-[#302D2D]  rounded-[16px] p-6 w-full"
                  >
                    <div className="flex flex-col items-center text-center  gap-4">
                      {metric.icon ? (
                        <div className={`${metric.iconBg} rounded-[12px] w-12 h-12 flex items-center justify-center shrink-0`}>
                          <Image
                            src={metric.icon}
                            alt={metric.label}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                      ) : (
                        <div className={`${metric.iconBg || 'bg-[#E0EAFF]'} rounded-[12px] w-12 h-12 flex items-center justify-center shrink-0`}>
                          <Image
                            src="/info-square.svg"
                            alt={metric.label}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                      )}
                      <div className="space-y-2 ">
                        <p className="font-bricolage text-text-xl-semibold">
                          {metric.value}
                        </p>
                        <p className="text-text-light-gray text-text-md-regular">
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
