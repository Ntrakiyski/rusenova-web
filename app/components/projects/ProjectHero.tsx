'use client';

import { Project } from '@/types/project';
import Image from 'next/image';

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <>
      {/* Hero Section - removed duplicate header since we have global navbar */}
      <section className="bg-[#252222] relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden pt-12 md:pt-16 lg:pt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Hero Text */}
            <div className="flex-1 w-full">
              <h1 className="font-['Bricolage_Grotesque',sans-serif] text-white text-4xl sm:text-5xl md:text-6xl lg:text-[90px] leading-tight mb-6" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {project.title}
              </h1>
              <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-lg sm:text-xl max-w-[480px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {project.shortDescription}
              </p>
            </div>

            {/* Hero Image */}
            <div className="flex-1 w-full relative">
              <div className="relative w-full max-w-[592px] mx-auto">
                <Image alt={project.title} className="w-full rounded-[12px] border border-white" src={project.heroImage} width={592} height={400} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}