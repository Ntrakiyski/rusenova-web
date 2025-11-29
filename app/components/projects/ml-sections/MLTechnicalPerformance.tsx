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
  background = 'bg-white'
}: MLTechnicalPerformanceProps) {
  // Find metrics with details for the right column
 const highlightedMetrics = metrics.filter(metric => metric.details);
  const leftMetrics = metrics.filter(metric => !metric.details);

  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Non-highlighted metrics */}
          <div className="lg:w-[60%]">
            <div className="space-y-0">
              {leftMetrics.map((metric, index) => (
                <React.Fragment key={index}>
                  <div className="flex justify-between items-center py-6">
                    <div className="flex-1">
                      <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-2" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.name}
                      </h3>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.description}
                      </p>
                    </div>
                    <div className="ml-6">
                      <span className="font-['Bricolage_Grotesque',sans-serif] text-[#155DFC] text-3xl font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.value}
                      </span>
                    </div>
                  </div>
                  {index < leftMetrics.length - 1 && (
                    <div className="border-t border-[#E5E7EB] my-0"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column - Highlighted metrics with title and description only */}
          <div className="lg:w-[40%] flex flex-col justify-center space-y-6">
            {highlightedMetrics.map((metric, index) => (
              <div key={index} className="p-0">
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-3" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {metric.name}
                </h3>
                <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {metric.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
