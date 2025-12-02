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

const defaultMetrics: PerformanceMetric[] = [
 {
    name: 'Recall',
    value: '83.8%',
    description: 'Catches 413 out of 492 frauds',
    details: 'Out of 492 fraudulent transactions, we catch 413—that\'s like spotting the one suspicious person in a crowd of 578',
    isHighlighted: true
  },
  {
    name: 'Precision',
    value: '75.2%',
    description: '3 out of 4 alerts are real fraud',
    isHighlighted: false
  },
  {
    name: 'ROC-AUC',
    value: '0.968',
    description: 'Near-perfect discrimination',
    isHighlighted: false
  },
  {
    name: 'False Alarm Rate',
    value: '0.048%',
    description: 'Only 41 false positives per 85K transactions',
    details: 'Only 41 customers out of 85,000 get a \'false alarm\'—that\'s your entire local grocery store seeing one incorrect alert per year',
    isHighlighted: true
  },
  {
    name: 'Latency',
    value: '<50ms',
    description: 'Real-time capable',
    isHighlighted: false
  }
];

export default function MLTechnicalPerformance({
  title = 'Technical Performance',
  description = 'How catching fraud impacts the business revenue and how much we can save?',
  metrics = defaultMetrics,
  background = 'bg-bg-white'
}: MLTechnicalPerformanceProps) {
  // Find metrics with details for the right column
  const highlightedMetrics = metrics.filter(metric => metric.details);
  const leftMetrics = metrics.filter(metric => !metric.details);

  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title Section */}
        <div className="mb-12">
          {title && (
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular max-w-[768px]">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Non-highlighted metrics */}
          <div className="w-full">
            <div className="space-y-0">
              {leftMetrics.map((metric, index) => (
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
                  <div className="w-full h-[1px] bg-border" />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column - Highlighted metrics */}
          <div className="w-full flex flex-col gap-6">
            {highlightedMetrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="">
                <h3 className="font-bricolage text-text-primary text-text-xl-semibold mb-2">
                  {metric.name}
                </h3>
                <p className="font-bricolage text-text-secondary text-text-md-regular">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
