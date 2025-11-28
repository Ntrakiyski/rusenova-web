'use client';

import { Project } from '@/types/project';
import { Target, Flag, Clock } from 'lucide-react';

interface ProjectIntroSectionProps {
  project: Project;
}

export default function ProjectIntroSection({ project }: ProjectIntroSectionProps) {
  // Find the intro section
  const introSection = project.sections.find(section => section.type === 'intro') as {
    type: 'intro';
    content: string[];
    metrics?: Array<{
      value: string;
      label: string;
      icon: string;
      color: string;
    }>;
  } | undefined;

  if (!introSection) return null;

  // Map icons to Lucide components
  const iconMap: Record<string, React.ReactNode> = {
    'aim': <Target size={16} />,
    'flag': <Flag size={16} />,
    'time': <Clock size={16} />,
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* What I build section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl md:text-4xl font-semibold text-[#191818]">
                What i build
              </h2>

              <div className="flex flex-col gap-4">
                {introSection.content.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#F38300] mt-2.5"></div>
                    <p
                      className="font-['Bricolage_Grotesque',sans-serif] text-base text-[#494848] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics section */}
          <div className="flex-1 lg:flex-none lg:w-[320px]">
            <div className="flex flex-col gap-4">
              {/* Precision metric */}
              <div className="bg-[#F7F4ED] rounded-[16px] p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#079455] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-['Bricolage_Grotesque',sans-serif] text-3xl font-semibold text-[#000000]">
                      92%
                    </div>
                    <div className="font-['Bricolage_Grotesque',sans-serif] text-base text-[#000000]">
                      Precision
                    </div>
                  </div>
                </div>
              </div>

              {/* Recall metric */}
              <div className="bg-[#F7F4ED] rounded-[16px] p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#7F56D9] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9M15 11H21V13H15V15H13V11H15ZM7 9H3V11H7V13H9V15H7V17H5V15H3V13H5V11H3V9H7ZM12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-['Bricolage_Grotesque',sans-serif] text-3xl font-semibold text-[#000000]">
                      89%
                    </div>
                    <div className="font-['Bricolage_Grotesque',sans-serif] text-base text-[#000000]">
                      Recall
                    </div>
                  </div>
                </div>
              </div>

              {/* Time saved metric */}
              <div className="bg-[#F7F4ED] rounded-[16px] p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F79009] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4ZM12.5 7H11V13L16 15.2L15.2 16.8L12.5 13.5V7Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-['Bricolage_Grotesque',sans-serif] text-3xl font-semibold text-[#000000]">
                      89%
                    </div>
                    <div className="font-['Bricolage_Grotesque',sans-serif] text-base text-[#000000]">
                      Time saved
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}