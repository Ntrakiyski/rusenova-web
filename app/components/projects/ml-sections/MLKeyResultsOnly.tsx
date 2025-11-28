'use client';

import React from 'react';

interface MLKeyResultsOnlyProps {
  title: string;
  description: string;
  results: string[];
  background?: string;
  resultType?: 'quantitative' | 'qualitative' | 'mixed';
}

export default function MLKeyResultsOnly({
  title,
  description,
  results,
  background = 'bg-white',
  resultType = 'quantitative'
}: MLKeyResultsOnlyProps) {
  // Get appropriate icon based on result type
  const getResultIcon = (index: number) => {
    const icons = {
      quantitative: (
        <div className="bg-blue-100 rounded-[8px] w-12 h-12 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      ),
      qualitative: (
        <div className="bg-[#dcfae6] rounded-[8px] w-12 h-12 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M2 17L12 22L22 17" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M2 12L12 17L22 12" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      ),
      mixed: (
        <div className="bg-[#fef0c7] rounded-[8px] w-12 h-12 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#DC6803" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      )
    };

    return icons[resultType] || icons.quantitative;
  };

  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-[12px] p-6 border border-[#dddddd]">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  {getResultIcon(index)}
                </div>
                <div className="flex-1">
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}