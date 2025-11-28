'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ProjectSection as ProjectSectionType } from '@/types/project';

interface ProjectSectionProps {
  section: ProjectSectionType;
}

export default function ProjectSection({ section }: ProjectSectionProps) {
  // Text-only section
  if (section.type === 'intro' && section.layout === 'text-only') {
    return (
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            {section.title && (
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.title}
              </h2>
            )}
            {section.description && (
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.description}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-8">
            {Array.isArray(section.content) && section.content.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {item}
                  </p>
                );
              } else if (item.type === 'feature') {
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl sm:text-2xl" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {item.title}
                    </h3>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {item.description}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>
    );
  }

  // Text left, image right section
  if ((section.type === 'intro' || section.type === 'communication-framework' || section.type === 'admin' || section.type === 'service-design' || section.type === 'impact' || section.type === 'design-system' || section.type === 'collaboration' || section.type === 'methodology' || section.type === 'case-studies') && section.layout === 'text-left-image-right') {
    return (
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Text Content - Left */}
            <div className="flex-1 w-full">
              {/* Section Header */}
              <div className="mb-12">
                {section.title && (
                  <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {section.title}
                  </h2>
                )}
                {section.description && (
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {section.description}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="space-y-6">
                {Array.isArray(section.content) && section.content.map((item, index) => (
                  <p key={index} className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {item}
                  </p>
                ))}
              </div>

              {/* Achievements */}
              {section.achievements && (
                <div className="mt-12">
                  <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl sm:text-2xl mb-6" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    What was achieved
                  </h3>
                  <div className="space-y-4">
                    {section.achievements.map((achievement, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="shrink-0 mt-1">
                          <div className="w-3 h-3 rounded-full bg-[#f38300]" />
                        </div>
                        <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-lg" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Image Content - Right */}
            {section.image && (
              <div className="flex-1 w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[592px]">
                  <Image alt={section.title || ''} className="w-full rounded-[12px] border border-[#dddddd]" src={section.image} width={592} height={400} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Image left, text right section
  if (section.type === 'home-redesign' && section.layout === 'image-left-text-right') {
    return (
      <section className="bg-[#f7f4ed] py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Image Content - Left */}
            {section.image && (
              <div className="flex-1 w-full flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[592px]">
                  <Image alt={section.title || ''} className="w-full rounded-[12px] border border-[#dddddd]" src={section.image} width={592} height={400} />
                </div>
              </div>
            )}

            {/* Text Content - Right */}
            <div className="flex-1 w-full">
              {/* Section Header */}
              <div className="mb-12">
                {section.title && (
                  <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {section.title}
                  </h2>
                )}
                {section.description && (
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {section.description}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="space-y-6">
                {Array.isArray(section.content) && section.content.map((item, index) => (
                  <p key={index} className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {item}
                  </p>
                ))}
              </div>

              {/* Achievements */}
              {section.achievements && (
                <div className="mt-12 space-y-4">
                  {section.achievements.map((achievement, index) => (
                    <p key={index} className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {achievement}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Approach section with cards
  if (section.type === 'approach') {
    return (
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            {section.title && (
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.title}
              </h2>
            )}
            {section.description && (
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.description}
              </p>
            )}
          </div>

          <div className="bg-[#f7f4ed] rounded-[24px] overflow-hidden relative w-full">
            {/* Background decorative gradient */}
            <div className="absolute right-0 bottom-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none opacity-50">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1797 1812">
                <g>
                  <g filter="url(#filter0_approach)">
                    <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                  </g>
                  <g filter="url(#filter1_approach)">
                    <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                  </g>
                  <g filter="url(#filter2_approach)">
                    <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                  </g>
                  <g filter="url(#filter3_approach)">
                    <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                  </g>
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_approach" width="1796.12" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_approach" width="1678.01" x="69.26" y="59.658">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_approach" width="1528.06" x="143.84" y="135.801">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_approach" width="1349.76" x="233.387" y="225.414">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 p-8 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.cards?.map((card, index) => (
                  <div key={index} className="bg-white rounded-[12px] p-6 border border-[#dddddd]">
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-3" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {card.title}
                    </h3>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {card.description}
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

  // Architecture section with image
  if (section.type === 'architecture') {
    return (
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            {section.title && (
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.title}
              </h2>
            )}
            {section.description && (
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.description}
              </p>
            )}
          </div>

          {section.image && (
            <div className="flex justify-center">
              <Image alt={section.title || ''} className="w-full max-w-[800px] rounded-lg" src={section.image} width={800} height={500} />
            </div>
          )}
        </div>
      </section>
    );
  }

  // Section with bullet points
  if (section.type === 'smart-retrieval' || section.type === 'evaluation' || section.type === 'production' || section.type === 'tech-stack') {
    return (
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            {section.title && (
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.title}
              </h2>
            )}
            {section.description && (
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.description}
              </p>
            )}
          </div>

          <div className="bg-[#f7f4ed] rounded-[24px] overflow-hidden relative w-full max-w-[1216px]">
            {/* Background decorative gradient */}
            <div className="absolute right-0 bottom-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none opacity-50">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1797 1812">
                <g>
                  <g filter="url(#filter0_card1)">
                    <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                  </g>
                  <g filter="url(#filter1_card1)">
                    <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                  </g>
                  <g filter="url(#filter2_card1)">
                    <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                  </g>
                  <g filter="url(#filter3_card1)">
                    <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                  </g>
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_card1" width="1796.12" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_card1" width="1678.01" x="69.26" y="59.658">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_card1" width="1528.06" x="143.84" y="135.801">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_card1" width="1349.76" x="233.387" y="225.414">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 p-8 md:p-16">
              <div className="bg-white rounded-[12px] p-8 max-w-[560px] border border-[#dddddd]">
                <div className="space-y-4">
                  {section.items?.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-1">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <path d="M8 6H16M8 12H16M8 18H16" stroke="#191818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Tech Stack section
  if (section.type === 'tech-stack') {
    return (
      <section className="bg-white py-16 md:py-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            {section.title && (
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.title}
              </h2>
            )}
            {section.description && (
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.description}
              </p>
            )}
          </div>

          <div className="bg-[#f7f4ed] rounded-[24px] overflow-hidden relative w-full max-w-[1216px]">
            {/* Background decorative gradient */}
            <div className="absolute right-0 bottom-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none opacity-50">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1797 1812">
                <g>
                  <g filter="url(#filter0_card1)">
                    <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                  </g>
                  <g filter="url(#filter1_card1)">
                    <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                  </g>
                  <g filter="url(#filter2_card1)">
                    <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                  </g>
                  <g filter="url(#filter3_card1)">
                    <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                  </g>
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_card1" width="1796.12" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_card1" width="1678.01" x="69.26" y="59.658">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_card1" width="1528.06" x="143.84" y="135.801">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_card1" width="1349.76" x="233.387" y="225.414">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 p-8 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.items?.map((item, index) => {
                  // Check if this is a category header
                  if (item.startsWith('**') && item.endsWith('**')) {
                    return (
                      <div key={index} className="col-span-1 md:col-span-2 lg:col-span-4">
                        <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-4" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                          {item.replace(/\*\*/g, '')}
                        </h3>
                      </div>
                    );
                  }

                  return (
                    <div key={index} className="bg-white rounded-[12px] p-4 border border-[#dddddd]">
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Results section
  if (section.type === 'results') {
    return (
      <section className="bg-[#252222] py-16 md:py-24 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 text-center">
            {section.title && (
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-white text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {section.title}
              </h2>
            )}
            {section.description && (
              <p className="font-['Inter',sans-serif] text-white text-lg sm:text-xl max-w-[768px] mx-auto leading-[30px]">
                {section.description}
              </p>
            )}
          </div>

          {section.image && (
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-[1216px]">
                <Image alt={section.title || ''} className="w-full rounded-[12px] border border-white" src={section.image} width={1216} height={600} />
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Quantifiable Outcomes Card */}
            <div className="flex-1 bg-white rounded-[12px] overflow-hidden">
              <div className="p-6 md:p-8 pb-0 pt-8">
                <div className="flex flex-col gap-6 items-center mb-6">
                  <div className="bg-blue-100 rounded-[8px] w-12 h-12 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    Quantifiable Outcomes
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  {section.outcomes?.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f7f4ed" />
                          <path clipRule="evenodd" d="M2 12L12 17L22 12L12 7L2 12Z" fill="#191818" fillRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-xl leading-[30px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Value Card */}
            <div className="flex-1 bg-white rounded-[12px] overflow-hidden">
              <div className="p-6 md:p-8 pb-0 pt-8">
                <div className="flex flex-col gap-6 items-center mb-6">
                  <div className="bg-[#dcfae6] rounded-[8px] w-12 h-12 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d="M2 17L12 22L22 17" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d="M2 12L12 17L22 12" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    Business Value
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  {section.businessValue?.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f7f4ed" />
                          <path clipRule="evenodd" d="M2 12L12 17L22 12L12 7L2 12Z" fill="#191818" fillRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-xl leading-[30px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default section
  return (
    <section className="bg-white py-16 md:py-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {section.title && (
          <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-3xl sm:text-4xl mb-12" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {section.title}
          </h2>
        )}
        <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
          Content for {section.type} section
        </p>
      </div>
    </section>
  );
}