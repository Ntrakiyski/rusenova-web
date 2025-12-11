'use client';

import React from 'react';

// Updated Interface to support both content array and description string, plus icon properties
interface CostBenefitItem {
  title: string;
  description?: string;
  content?: string | string[];
  icon?: string;
  iconBg?: string;
}

interface MLCostBenefitProps {
  title: string;
  description: string;
  items: CostBenefitItem[];
  background?: string;
}

// Helper function to render content from either content or description
const renderContent = (item: CostBenefitItem) => {
  // If content array exists, render it as multiple lines
  if (item.content) {
    if (typeof item.content === 'string') {
      return <p className="font-bricolage text-text-secondary text-text-md-regular leading-relaxed flex-1 text-left">{item.content}</p>;
    }
    
    return (
      <div className="space-y-2 flex-1 text-left">
        {item.content.map((line, idx) => (
          <p key={idx} className="font-bricolage text-text-secondary text-text-md-regular">
            {line}
          </p>
        ))}
      </div>
    );
  }
  
  // Fallback to description if content doesn't exist
  return (
    <p className="font-bricolage text-text-secondary text-text-md-regular leading-relaxed flex-1 text-left">
      {item.description || ''}
    </p>
  );
};

export default function MLCostBenefit({
  title,
  description,
  items,
  background = 'bg-bg-white'
}: MLCostBenefitProps) {
  return (
    <section className={`py-16 md:py-24 lg:py-32 relative z-10`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
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

        {/* Cards Row - Dynamic Grid Based on Item Count */}
        <div className={`grid grid-cols-1 md:grid-cols-${items.length === 2 ? '2' : '3'} gap-4`}>
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center border border-stroke rounded-2xl p-6">
              <div className={`${item.iconBg} rounded-lg w-16 h-16 flex items-center justify-center mb-6`}>
                {typeof item.icon === 'string' ? (
                  <img src={item.icon} alt="" className="w-6 h-6" loading="lazy" />
                ) : (
                  item.icon
                )}
              </div>
              <h3 className="font-bricolage text-text-primary text-display-xs font-semibold mb-6 text-center w-full">
                {item.title}
              </h3>
              {renderContent(item)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}