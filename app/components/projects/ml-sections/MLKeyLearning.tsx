'use client';

import React from 'react';

interface LearningItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  type?: 'technical' | 'business' | 'process';
}

interface MLKeyLearningProps {
  title: string;
  description: string;
  learnings: LearningItem[];
  background?: string;
}

export default function MLKeyLearning({
  title,
  description,
  learnings,
  background = 'bg-white'
}: MLKeyLearningProps) {
  // Get background color based on learning type
  const getLearningBg = (type: 'technical' | 'business' | 'process' | undefined) => {
    // Use consistent background color F7F4ED for all cards
    return 'bg-[#F7F4ED]';
  };

   return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="mb-12 w-full">
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

        <div className="bg-white overflow-hidden w-full">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learnings.map((learning, index) => (
                <div key={index} className={`${getLearningBg(learning.type)} p-6 rounded-[16px]`}>
                  <div className="flex items-start gap-4 mb-4">
                    {learning.icon && (
                      <div className="shrink-0">
                        {learning.icon}
                      </div>
                    )}
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {learning.title}
                    </h3>
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {learning.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
