'use client';

import { Project } from '@/types/project';
import GradientBackground from '@/app/components/ui/GradientBackground';

interface ApproachSectionProps {
  project: Project;
}

export default function ApproachSection({ project }: ApproachSectionProps) {
  // Find the approach section
  const approachSection = project.sections.find(section => section.type === 'approach') as {
    type: 'approach';
    title: string;
    description: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  } | undefined;

  if (!approachSection) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 max-w-[600px] mb-16">
          <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl md:text-4xl font-semibold text-[#101828]">
            {approachSection.title}
          </h2>
          <p className="font-['Bricolage_Grotesque',sans-serif] text-lg md:text-xl text-[#494848] leading-relaxed">
            {approachSection.description}
          </p>
        </div>

        <GradientBackground className="rounded-[24px] py-16">
          <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {approachSection.cards.map((card, index) => (
                <div key={index} className="bg-white rounded-[16px] p-6">
                  <div className="flex flex-col gap-5">
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-xl font-semibold text-[#191818]">
                      {card.title}
                    </h3>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-base text-[#494848] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GradientBackground>
      </div>
    </section>
  );
}