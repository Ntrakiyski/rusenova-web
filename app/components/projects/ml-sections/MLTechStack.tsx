'use client';

import React from 'react';

interface MLTechStackProps {
  title: string;
  description: string;
  technologies?: string[];
  categories?: string[];
  categorizedTechnologies?: {
    [key: string]: string[];
  };
  background?: string;
}

export default function MLTechStack({
  title,
  description,
  technologies = [],
  categories = [],
  categorizedTechnologies,
  background = 'bg-white'
}: MLTechStackProps) {
  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="flex flex-col gap-8 mb-16">
          <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl md:text-4xl font-semibold text-left" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {title}
          </h2>
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg md:text-xl leading-relaxed max-w-[800px] text-left" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        {/* Tech Stack Categories Rows */}
        <div className="overflow-hidden relative w-full max-w-[1216px] mx-auto">
          <div className="relative z-10">
            {categorizedTechnologies ? (
              <div className="flex flex-col gap-8">
                {Object.entries(categorizedTechnologies).map(([category, techList]) => (
                  <div key={category} className="flex flex-col">
                    <h3 className="font-['Inter',sans-serif] text-lg font-semibold text-[#191818] mb-6">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {techList.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="px-4 py-2 border border-[#DDDDDD] rounded-lg shadow-sm bg-white"
                        >
                          <span className="font-['Inter',sans-serif] text-sm font-semibold text-[#191818]">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Technologies Category Row */}
                {technologies.length > 0 && (
                  <div className="flex flex-col">
                    <h3 className="font-['Inter',sans-serif] text-lg font-semibold text-[#191818] mb-6">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 border border-[#DDDDDD] rounded-lg shadow-sm bg-white"
                        >
                          <span className="font-['Inter',sans-serif] text-sm font-semibold text-[#191818]">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Row */}
                {categories.length > 0 && (
                  <div className="flex flex-col">
                    <h3 className="font-['Inter',sans-serif] text-lg font-semibold text-[#191818] mb-6">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 border border-[#DDDDDD] rounded-lg shadow-sm bg-white"
                        >
                          <span className="font-['Inter',sans-serif] text-sm font-semibold text-[#191818]">
                            {category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
