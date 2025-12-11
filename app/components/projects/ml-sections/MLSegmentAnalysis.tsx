'use client';

import React from 'react';

// Updated Interface to support both content array and description string, plus icon properties
interface SegmentAnalysisItem {
  title: string;
  content?: string | string[];
  icon?: string;
  iconBg?: string;
}

interface MLSegmentAnalysisProps {
  title: string;
  description: string;
  items: SegmentAnalysisItem[];
  background?: string;
}

// Helper function to render content from either content or description
const renderContent = (item: SegmentAnalysisItem) => {
  // If content array exists, render it as multiple lines
  if (item.content) {
    if (typeof item.content === 'string') {
      return <p className="font-bricolage text-text-primary text-text-md-regular leading-relaxed flex-1 text-left">{item.content}</p>;
    }
    
    return (
      <div className="space-y-2 flex-1 text-left">
        {item.content.map((line, idx) => (
          <p key={idx} className="font-bricolage text-text-primary text-text-md-regular">
            {line}
          </p>
        ))}
      </div>
    );
  }
  
  // Fallback to empty if no content
  return null;
};

export default function MLSegmentAnalysis({
  title,
  description,
  items,
  background = ''
}: MLSegmentAnalysisProps) {
  const strengths = items[0]; // First item is Strengths
  const weaknesses = items[1]; // Second item is Weaknesses

  return (
    <section className={`${background} py-16 md:py-24 lg:py-32 relative z-10 flex items-center`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="mb-12 w-full">
          {title && (
            <h2 className="font-bricolage text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular max-w-[768px]">
              {description}
            </p>
          )}
        </div>

        {/* Cards Row - Always 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Strengths */}
          {strengths && (
            <div className="flex flex-col items-center text-center border border-stroke rounded-2xl p-6 bg-bg-white">
              <div className={`${strengths.iconBg || 'bg-[#EFF4FF]'} rounded-lg w-16 h-16 flex items-center justify-center mb-6`}>
                {typeof strengths.icon === 'string' ? (
                  <img src={strengths.icon} alt="" className="w-6 h-6" loading="lazy" />
                ) : (
                  strengths.icon
                )}
              </div>
              <h3 className="font-bricolage text-text-primary text-display-xs font-semibold mb-6 text-center w-full">
                {strengths.title}
              </h3>
              {renderContent(strengths)}
            </div>
          )}

          {/* Right Column - Weaknesses */}
          {weaknesses && (
            <div className="flex flex-col items-center text-center border border-stroke rounded-2xl p-6 bg-bg-white">
              <div className={`${weaknesses.iconBg || 'bg-[#FEEFEE]'} rounded-lg w-16 h-16 flex items-center justify-center mb-6`}>
                {typeof weaknesses.icon === 'string' ? (
                  <img src={weaknesses.icon} alt="" className="w-6 h-6" loading="lazy" />
                ) : (
                  weaknesses.icon
                )}
              </div>
              <h3 className="font-bricolage text-text-primary text-display-xs font-semibold mb-6 text-center w-full">
                {weaknesses.title}
              </h3>
              {renderContent(weaknesses)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}