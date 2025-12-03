'use client';

import React from 'react';

interface PerformanceMetric {
  name: string;
  value: string;
  description: string;
  details?: string;
  isHighlighted?: boolean;
}

interface MLTechnicalPerformanceProps {
  title?: string;
  description?: string;
  metrics?: PerformanceMetric[];
  background?: string;
}

export default function MLTechnicalPerformance({
  title = 'Technical Performance',
  description = 'How catching fraud impacts the business revenue and how much we can save?',
  metrics = [],
  background = 'bg-bg-white'
}: MLTechnicalPerformanceProps) {
  // Find metrics with details for the right column
  const highlightedMetrics = metrics.filter(metric => metric.details);
  const leftMetrics = metrics;

  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title Section */}
        <div className="mb-12 w-full">
          {title && (
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8 justify-start items-start">
          {/* Left Column - All metrics */}
          <div className="col-span-12 lg:col-span-7 w-full">
            <div className="space-y-0">
              {leftMetrics.length > 0 ? leftMetrics.map((metric, index) => (
                <React.Fragment key={index}>
                  <div className="flex justify-between items-center py-6">
                    <div className="flex-1">
                      <h3 className="font-bricolage text-text-primary text-text-xl-semibold mb-2">
                        {metric.name}
                      </h3>
                      <p className="font-bricolage text-text-secondary text-text-md-regular">
                        {metric.description}
                      </p>
                    </div>
                    <div className="ml-6">
                      <span className="font-bricolage text-[#155DFC] text-[19px] font-bold">
                        {metric.value}
                      </span>
                    </div>
                  </div>
                  {/* create a grey line divider here */}
                  <div className="w-full h-[1px] bg-stroke"></div>
                </React.Fragment>
              )) : <p>No metrics available</p>}
            </div>
          </div>

          {/* Right Column - Highlighted metrics with details */}
          <div className="pl-8 col-span-12 lg:col-span-5 w-full flex flex-col gap-6">
            {highlightedMetrics.length > 0 ? highlightedMetrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="">
                <h3 className="font-bricolage text-text-primary text-text-xl-semibold mb-2">
                  {metric.name}
                </h3>
                <p className="font-bricolage text-text-secondary text-text-md-regular">
                  {metric.details}
                </p>
              </div>
            )) : <p>No highlighted metrics</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
