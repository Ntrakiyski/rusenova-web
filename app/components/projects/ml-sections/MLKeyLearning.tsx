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
  background = 'bg-bg-white'
}: MLKeyLearningProps) {
  // Get background color based on learning type
  const getLearningBg = (type: 'technical' | 'business' | 'process' | undefined) => {
    // Use consistent background color F7F4ED for all cards
    return 'bg-bg-light';
  };

   return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
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

        <div className="bg-bg-white overflow-hidden w-full">
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
                    <h3 className="font-bricolage text-text-primary text-text-xl-semibold">
                      {learning.title}
                    </h3>
                  </div>
                  <p className="font-bricolage text-text-secondary text-text-md-regular">
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
