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

/**
 * MLTechStack component displays the technology stack section of an ML project.
 * Supports both flat technology list and categorized technology display.
 * 
 * @param title - Section title
 * @param description - Section description
 * @param technologies - Optional flat list of technologies
 * @param categories - Optional list of category names
 * @param categorizedTechnologies - Optional object mapping categories to technology arrays
 * @param background - Optional background color class (defaults to bg-bg-white)
 */
export default function MLTechStack({
  title,
  description,
  technologies = [],
  categories = [],
  categorizedTechnologies,
  background = 'bg-bg-white'
}: MLTechStackProps) {
  return (
    <section className={`${background} py-16 md:py-24 lg:py-32 relative z-10 flex items-center`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="flex flex-col gap-8 mb-16">
          <h2 className="font-bricolage text-text-primary text-display-md font-semibold text-left">
            {title}
          </h2>
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular leading-relaxed max-w-[800px] text-left">
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
                    <h3 className="font-bricolage text-text-lg-semibold text-text-primary mb-6">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {techList.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="px-4 py-2 border border-stroke rounded-lg bg-bg-white"
                        >
                          <span className="font-bricolage text-text-sm-semibold text-text-primary">
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
                    <h3 className="font-bricolage text-text-lg-semibold text-text-primary mb-6">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 border border-stroke rounded-lg bg-bg-white"
                        >
                          <span className="font-bricolage text-text-sm-semibold text-text-primary">
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
<h3 className="font-bricolage text-text-lg-semibold text-text-primary mb-6">
                    Categories
                  </h3>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 border border-stroke rounded-lg bg-bg-white"
                        >
                          <span className="font-bricolage text-text-sm-semibold text-text-primary">
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
