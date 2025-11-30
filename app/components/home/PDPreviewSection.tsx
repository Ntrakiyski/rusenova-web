'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, HomeContent } from '@/types/project';
import Image from 'next/image';
import { typoClass } from '@/app/lib/typography';
import Link from 'next/link';

interface PDPreviewSectionProps {
  pdData?: (Project | NonNullable<HomeContent['pdPreview']>['projects'][0])[];
  colors?: HomeContent['colors'];
  onProjectClick?: (slug: string) => void;
  typography?: HomeContent['typography'];
  content?: HomeContent['pdPreview'];
}

export default function PDPreviewSection({ pdData, colors, typography, content }: PDPreviewSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPD = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      const newScrollPosition = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Use only content.projects from home page data
  const projects = content?.projects || [];

  return (
    <section id="productdesign" className="bg-white py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-12 md:mb-16"
        >
          <div className="flex flex-col gap-5">
            <h2
              className={`${typoClass(typography?.pdPreview.title)}`}
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#101828' }}
            >
              {content?.title || "Product Design"}
            </h2>
            <p
              className={`${typoClass(typography?.pdPreview.subtitle)} max-w-[768px]`}
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.secondary || '#494848' }}
            >
              {content?.subtitle || "This is my working experience company wide with just a few selected projects"}
            </p>
          </div>

          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scrollPD('left')}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-[#191818]" />
            </button>
            <button
              onClick={() => scrollPD('right')}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-[#191818]" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-6 md:gap-8 min-w-max">
            {projects.map((exp, index) => (
              <div key={index} id={`experience-${exp.slug || exp.id || index}`} >
                <Link
                  href={`/product-design/${exp.slug}`}
                >
                  <motion.div
                    className="flex flex-col gap-5 w-[480px] shrink-0 cursor-pointer"
                  >
                    <div
                      className="relative h-[280px] md:h-[320px] lg:h-[403px] overflow-hidden rounded-[24px] bg-[#F7F4ED]"
                    >
                      <div className="absolute bottom-0 right-0 w-full max-w-[264px] lg:max-w-[364px] aspect-square right-[-34%] bottom-[-47%] z-0 pointer-events-none">
                        <div className="relative w-full h-full">
                          <Image src={exp.previewImage ?? '/gradient-pink.png'} alt="" aria-hidden fill className="object-contain" draggable={false} />
                        </div>
                      </div>
                      {exp.metrics[0] && exp.metrics[0].value && (
                        <p
                          className="absolute left-[38px] top-[85px] z-10 font-['Bricolage_Grotesque:Light',sans-serif] text-[16px]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
                        >
                          <span
                            className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                            style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                          >
                            {exp.metrics[0].value}
                          </span>
                          {' '}{exp.metrics[0].label}
                        </p>
                      )}
                      {!exp.metrics[0]?.value && exp.metrics[0]?.label && (
                        <p
                          className="absolute left-[38px] top-[85px] z-10 font-['Bricolage_Grotesque:Light',sans-serif] text-[14px] max-w-[calc(100%-76px)]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
                        >
                          {exp.metrics[0].label}
                        </p>
                      )}
                      {exp.metrics[1] && exp.metrics[1].value && (
                        <p
                          className="absolute left-[146px] bottom-[86px] z-10 font-['Bricolage_Grotesque:Light',sans-serif] text-[16px]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
                        >
                          <span
                            className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                            style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                          >
                            {exp.metrics[1].value}
                          </span>
                          {' '}{exp.metrics[1].label}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3
                        className={`${typoClass(typography?.pdPreview.cardTitle)}`}
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#101828' }}
                      >
                        {exp.title}
                      </h3>
                      {exp.role && (
                        <p
                          className={`${typoClass(typography?.pdPreview.role)}`}
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.secondary || '#494848' }}
                        >
                          {exp.role}
                        </p>
                      )}
                      <p
                        className={`${typoClass(typography?.pdPreview.cardDescription)}`}
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.secondary || '#494848' }}
                      >
                        {exp.shortDescription}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
