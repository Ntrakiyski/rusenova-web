'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, HomeContent } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

interface PDPreviewSectionProps {
  pdData?: (Project | NonNullable<HomeContent['pdPreview']>['projects'][0])[];
  colors?: HomeContent['colors'];
  onProjectClick?: (slug: string) => void;
  content?: HomeContent['pdPreview'];
}

export default function PDPreviewSection({ pdData, colors, content }: PDPreviewSectionProps) {
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
              className={`text-display-md font-bricolage font-semibold`}
              style={{ color: colors?.text.primary || '#101828' }}
            >
              {content?.title || "Product Design"}
            </h2>
            <p
              className={`text-text-xl-regular font-bricolage max-w-[768px]`}
              style={{ color: colors?.text.secondary || '#494848' }}
            >
              {content?.subtitle || "This is my working experience company wide with just a few selected projects"}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto pb-4 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex gap-6 md:gap-8 min-w-max px-[max(16px,calc((100%-1280px)/2+16px))] md:px-[max(32px,calc((100%-1280px)/2+32px))]">
            {projects.map((exp, index) => (
              <div key={index} id={`experience-${exp.slug || exp.id || index}`} >
                <Link
                  href={`/product-design/${exp.slug}`}
                >
                  <motion.div
                    className="flex flex-col gap-5 w-[80vw] md:w-[583px] shrink-0 cursor-pointer"
                  >
                    <div
                      className="relative h-[403px] overflow-hidden rounded-[24px] bg-[#1F1F1F]"
                    >
                      <div className="absolute left-[-193px] top-[83px] w-[2130px] h-[2130px] z-0 pointer-events-none">
                        <div className="relative w-full h-full">
                          <Image src={exp.previewImage ?? '/gradient-pink.png'} alt="" aria-hidden width={2130} height={2130} className="object-contain" draggable={false} />
                        </div>
                      </div>
                      {exp.metrics[0] && exp.metrics[0].value && (
                        <p
                          className="absolute left-[38px] top-[85px] z-10 text-display-xs font-bricolage"
                          style={{ color: '#ffffff' }}
                        >
                          <span
                            className="font-bold"
                          >
                            {exp.metrics[0].value}
                          </span>
                          {' '}{exp.metrics[0].label}
                        </p>
                      )}
                      {!exp.metrics[0]?.value && exp.metrics[0]?.label && (
                        <p
                          className="absolute left-[38px] top-[85px] z-10 text-display-xs font-bricolage max-w-[calc(100%-76px)]"
                          style={{ color: '#ffffff' }}
                        >
                          {exp.metrics[0].label}
                        </p>
                      )}
                      {exp.metrics[1] && exp.metrics[1].value && (
                        <p
                          className="absolute left-[146px] bottom-[86px] z-10 text-display-xs font-bricolage"
                          style={{ color: '#ffffff' }}
                        >
                          <span
                            className="font-bold"
                          >
                            {exp.metrics[1].value}
                          </span>
                          {' '}{exp.metrics[1].label}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3
                        className={`text-display-xs font-bricolage font-semibold`}
                        style={{ color: colors?.text.primary || '#101828' }}
                      >
                        {exp.title}
                      </h3>
                      <p
                        className={`text-text-lg-regular font-bricolage`}
                        style={{ color: colors?.text.secondary || '#494848' }}
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
    </section>
  );
}
