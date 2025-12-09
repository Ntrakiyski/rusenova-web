'use client';

import React from 'react';
import Image from 'next/image';
import {
  // VideoPlayer,
  // VideoPlayerContent,
} from '@/components/ui/shadcn-io/video-player';

interface MLResultsAndImpactProps {
  title: string;
  description: string;
  outcomes: string[];
  businessValue: string[];
  image?: string;
  video?: string;
  background?: string;
}

/**
 * MLResultsAndImpact component displays the results and impact section of an ML project.
 * Shows quantifiable outcomes and business value with optional image or video.
 * 
 * @param title - Section title
 * @param description - Section description
 * @param outcomes - Array of quantifiable outcomes
 * @param businessValue - Array of business value points
 * @param image - Optional image URL
 * @param video - Optional video URL
 * @param background - Optional background color class (defaults to bg-bg-dark)
 */
export default function MLResultsAndImpact({
  title,
  description,
  outcomes,
  businessValue,
  image,
  video,
  background = 'bg-bg-light'
}: MLResultsAndImpactProps) {
   return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] 2xl:min-h-[760px] relative rounded-bl-[32px] rounded-br-[32px] overflow-hidden`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="mb-8 md:mb-12">
          {title && (
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5 text-left">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-primary text-text-xl-regular max-w-[768px] leading-[30px] text-left">
              {description}
            </p>
          )}
        </div>

        {/* Image or Video Row */}
        {(image || video) && (
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-[1216px]">
              {video ? (
                // Video player commented out - using GIF instead
                <div className="w-full rounded-[12px] border border-white overflow-hidden relative shadow-xl">
                  <Image
                    src={video}
                    alt={title || 'Results'}
                    className="w-full aspect-video"
                    width={1216}
                    height={600}
                  />
                </div>
              ) : (
                <Image
                  src={image!}
                  alt={title || 'Results'}
                  className="w-full rounded-[12px] border border-white"
                  width={1216}
                  height={600}
                />
              )}
            </div>
          </div>
        )}

        {/* Cards Row - Two Columns */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Quantifiable Outcomes Card */}
          <div className="bg-bg-white rounded-[12px] overflow-hidden flex-1">
            <div className="p-4 sm:p-6 pb-0 pt-6 sm:pt-8">
              <div className="flex flex-col gap-4 items-center mb-4 sm:mb-6">
                <div className="bg-blue-100 rounded-[8px] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <Image
                    src="/bar-chart-square.png"
                    alt="Chart icon"
                    width={24}
                    height={24}
                    className="w-5 sm:w-6 h-5 sm:h-6"
                  />
                </div>
                <h3 className="font-bricolage text-text-primary text-display-xs font-semibold text-center">
                  Quantifiable Outcomes
                </h3>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                {outcomes.map((item, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3 items-start">
                    {/* <div className="shrink-0 mt-0.5">
                      <Image
                        src="/Check icon.svg"
                        alt="Check icon"
                        width={16}
                        height={16}
                        className="w-4 sm:w-5 h-4 sm:h-5"
                      />
                    </div> */}
                    <p className="font-bricolage text-text-secondary text-text-lg-regular sm:text-text-xl-regular leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Value Card */}
          <div className="bg-bg-white rounded-[12px] overflow-hidden flex-1">
            <div className="p-4 sm:p-6 pb-0 pt-6 sm:pt-8">
              <div className="flex flex-col gap-4 items-center mb-4 sm:mb-6">
                <div className="bg-[#dcfae6] rounded-[8px] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <Image
                    src="/line-chart-up.svg"
                    alt="Chart icon"
                    width={24}
                    height={24}
                    className="w-5 sm:w-6 h-5 sm:h-6"
                  />
                </div>
                <h3 className="font-bricolage text-text-primary text-display-xs font-semibold text-center">
                  Business Value
                </h3>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                {businessValue.map((item, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3 items-start">
                    <div className="shrink-0 mt-0.5">
                      {/* <Image
                        src="/Check icon.svg"
                        alt="Check icon"
                        width={16}
                        height={16}
                        className="w-4 sm:w-5 h-4 sm:h-5"
                      /> */}
                    </div>
                    <p className="font-bricolage text-text-secondary text-text-lg-regular sm:text-text-xl-regular leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
