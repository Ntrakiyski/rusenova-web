'use client';

import { Project } from '@/types/project';
import GradientBackground from '@/app/components/ui/GradientBackground';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface SectionWithBulletsProps {
  project: Project;
  sectionType: string;
  title?: string;
  gradientFromColor?: string;
  gradientViaColor?: string;
  gradientToColor?: string;
  imagePosition?: 'left' | 'right' | 'none';
}

export default function SectionWithBullets({
  project,
  sectionType,
  title,
  gradientFromColor,
  gradientViaColor,
  gradientToColor,
  imagePosition = 'none',
}: SectionWithBulletsProps) {
  // Find the section based on type
  const section = project.sections.find(section =>
    section.type === sectionType ||
    (sectionType === 'architecture' && section.type === 'architecture') ||
    (sectionType === 'smart-retrieval' && section.type === 'smart-retrieval') ||
    (sectionType === 'evaluation' && section.type === 'evaluation') ||
    (sectionType === 'production' && section.type === 'production')
  ) as {
    type: string;
    title?: string;
    description?: string;
    image?: string;
    items?: string[];
    components?: string[];
  } | undefined;

  // Special hardcoded bullets for architecture section
  const architectureBullets = [
    "Understands what you're really asking (not just keywords)",
    "Checks every relevant document instantly",
    "Brings you the best answers"
  ];

  if (!section) return null;

  // Use provided title or fall back to section title
  const sectionTitle = title || section.title || '';

  // Determine if we should use gradient background
  const useGradient = sectionType !== 'architecture' && sectionType !== 'generic';

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 mb-16">
          <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl md:text-4xl font-semibold text-[#101828]">
            {sectionTitle}
          </h2>
          {section.description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-lg md:text-xl text-[#494848] leading-relaxed max-w-[600px]">
              {section.description}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 ${imagePosition === 'left' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-16 items-center`}>
          {/* Image section - left side for architecture */}
          {imagePosition === 'left' && section.image && (
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] h-[400px]">
                <Image
                  src="/rag-results.png"
                  alt={sectionTitle}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>
            </div>
          )}

          {/* Content section */}
          <div className={useGradient ? 'rounded-[24px] overflow-hidden' : ''}>
            {useGradient ? (
              <GradientBackground
                fromColor={gradientFromColor}
                viaColor={gradientViaColor}
                toColor={gradientToColor}
                className="py-16"
              >
                <div className="flex flex-col gap-6">
                  {(sectionType === 'architecture' ? architectureBullets :
                    section.items || section.components || []).map((item, index) => (
                    <div key={index} className="flex items-start gap-3 pt-2">
                      <div className="flex-shrink-0 w-6 h-6 text-[#F38300] mt-1 ml-4">
                        <Check size={24} />
                      </div>
                      <p className={`font-['Bricolage_Grotesque',sans-serif] text-base md:text-lg ${sectionType === 'architecture' ? 'text-[#494848]' : 'text-[#191818]'} leading-relaxed`}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </GradientBackground>
            ) : (
              <div className="flex flex-col gap-6">
                {(sectionType === 'architecture' ? architectureBullets :
                  section.items || section.components || []).map((item, index) => (
                  <div key={index} className="flex items-start gap-3 pt-2">
                    <div className="flex-shrink-0 w-6 h-6 text-[#F38300] mt-1 ml-4">
                      <Check size={24} />
                    </div>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-base md:text-lg text-[#494848] leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image section - right side for other sections */}
          {imagePosition === 'right' && section.image && (
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] h-[400px]">
                <Image
                  src="/rag-results.png"
                  alt={sectionTitle}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}