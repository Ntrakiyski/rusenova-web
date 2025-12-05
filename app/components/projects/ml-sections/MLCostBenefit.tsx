'use client';

import React from 'react';

// Updated Interface to match the actual data structure
interface CostBenefitItem {
  title: string;
  content: string | string[];
}

interface MLCostBenefitProps {
  title: string;
  description: string;
  items: CostBenefitItem[];
  background?: string;
}

// Helper function to render content
const renderContent = (content: string | string[]) => {
  if (typeof content === 'string') {
    return <p className="font-bricolage text-text-primary text-text-lg-regular">{content}</p>;
  }

  return (
    <div className="space-y-2">
      {content.map((line, idx) => (
        <p key={idx} className="font-bricolage text-text-primary text-text-lg-regular">
          {line}
        </p>
      ))}
    </div>
  );
};

export default function MLCostBenefit({
  title,
  description,
  items,
  background = 'bg-bg-white'
}: MLCostBenefitProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative z-10 flex items-center`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full w-full">
        <div className="mb-12 w-full">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-start items-stretch">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-xl border border-stroke bg-bg-white p-10 flex flex-col"
            >
              <h3 className="font-bricolage text-text-primary text-display-xs font-semibold mb-6">
                {item.title}
              </h3>

              {renderContent(item.content)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}