'use client';

import React from 'react';
import Image from 'next/image';

interface Metric {
  value: string;
  label: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconSvg?: string;
}

interface MLWhatIBuildProps {
  title?: string;
  description: string;
  metrics: Metric[];
  background?: string;
  bulletPoints?: string[];
}

export default function MLWhatIBuild({
  title,
  description,
  metrics,
  background = 'bg-bg-white',
  bulletPoints
}: MLWhatIBuildProps) {
  // Default icons for common metric types
  const getDefaultIcon = (label: string, iconBg: string = 'bg-[#dcfae6]') => {
    switch(label.toLowerCase()) {
      case 'precision':
        return (
          <div className={`bg-[#DCFAE6] rounded-full w-12 h-12 flex items-center justify-center shrink-0`}>
           <img 
                        src="/aim.svg" 
                        alt="precision" 
                        className="w-6 h-6"
                      />
          </div>
        );
      case 'recall':
        return (
          <div className="bg-[#f4ebff] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
            <img 
                        src="/marker-pin.svg" 
                        alt="pin" 
                        className="w-6 h-6"
                      />
          </div>
        );
      case 'time saved':
      case 'time':
        return (
          <div className="bg-[#FEF0C7] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
             <img 
                        src="/clock-check.svg" 
                        alt="clock" 
                        className="w-6 h-6"
                      />
          </div>
        );
      default:
        return (
          <div className={`${iconBg} rounded-full w-12 h-12 flex items-center justify-center shrink-0`}>
             <img 
                        src="/clock-check.svg" 
                        alt="clock" 
                        className="w-6 h-6"
                      />
          </div>
        );
    }
  };

   return (
    <section className={`${background} py-16 md:py-24 lg:py-32 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full">
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2">
            {title && (
              <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-6">
                {title}
              </h2>
            )}
            <div className="space-y-3">
              {bulletPoints && bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="shrink-0 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-text-orange" />
                  </div>
                  <p className="font-bricolage text-text-primary text-text-md-regular">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Cards - Right Side */}
          <div className="w-full lg:w-1/2">
            {/* Metrics Cards Section */}
            <div className="flex flex-col gap-4 w-full">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-bg-light rounded-[16px] p-4 w-full">
                  <div className="flex items-center gap-3 w-full">
                    {getDefaultIcon(metric.label, metric.iconBg)}
                    <div className="flex-1 min-w-0">
                      <p className="font-bricolage text-text-primary text-text-xl-semibold mb-1">
                        {metric.value}
                      </p>
                      <p className="font-bricolage text-text-secondary text-text-md-regular truncate">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
