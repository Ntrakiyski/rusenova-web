'use client';

import { Project } from '@/types/project';
import { DownloadCloud } from 'lucide-react';

interface TechStackSectionProps {
  project: Project;
}

export default function TechStackSection({ project }: TechStackSectionProps) {
  // Find the tech stack section
  const techStackSection = project.sections.find(section => section.type === 'tech-stack') as {
    type: string;
    title: string;
    description: string;
    technologies?: string[];
    categories?: string[];
  } | undefined;

  if (!techStackSection) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading section */}
        <div className="flex flex-col gap-8 mb-16">
          <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl md:text-4xl font-semibold text-[#101828] text-center">
            {techStackSection.title}
          </h2>
          {techStackSection.description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-lg md:text-xl text-[#494848] leading-relaxed max-w-[800px] mx-auto text-center">
              {techStackSection.description}
            </p>
          )}
        </div>

        {/* Tech stack content - no border container */}
        <div>
          {/* Technologies section */}
          <div className="mb-12">
            <h3 className="font-['Inter',sans-serif] text-lg font-semibold text-[#191818] mb-6">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStackSection.technologies?.map((tech, index) => (
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

          {/* Categories section */}
          <div>
            <h3 className="font-['Inter',sans-serif] text-lg font-semibold text-[#191818] mb-6">
              Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStackSection.categories?.map((category, index) => (
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
        </div>
      </div>
    </section>
  );
}