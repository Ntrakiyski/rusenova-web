'use client';

import { Project } from '@/types/project';
import Image from 'next/image';

interface ChallengeSectionProps {
  project: Project;
}

export default function ChallengeSection({ project }: ChallengeSectionProps) {
  // Find the challenge section
  const challengeSection = project.sections.find(section => section.type === 'intro' && section.layout === 'text-left-image-right') as {
    type: string;
    title: string;
    description: string;
    image?: string;
    content: string[];
  } | undefined;

  if (!challengeSection) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl md:text-4xl font-semibold text-[#101828]">
                {challengeSection.title}
              </h2>
              <p className="font-['Bricolage_Grotesque',sans-serif] text-lg md:text-xl text-[#494848] leading-relaxed">
                {challengeSection.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {challengeSection.content.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F38300] mt-1"></div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-base text-[#494848] leading-relaxed">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center">
            {challengeSection.image && (
              <div className="relative w-full max-w-[500px] h-[400px]">
                <Image
                  src="/rag-results.png"
                  alt={challengeSection.title}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}