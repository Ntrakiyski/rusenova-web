'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, HomeContent } from '@/types/project';
import Image from 'next/image';
import { typoClass } from '@/app/lib/typography';
import Link from 'next/link';

interface MLPreviewSectionProps {
  mlData?: (Project | NonNullable<HomeContent['mlPreview']>['projects'][0])[];
  colors?: HomeContent['colors'];
  typography?: HomeContent['typography'];
  content?: HomeContent['mlPreview'];
}

export default function MLPreviewSection({ mlData, colors, typography, content }: MLPreviewSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollML = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      const newScrollPosition = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Use content.projects if available, otherwise fall back to mlData
  const projects = content?.projects || mlData || [];

  return (
    <section id="ml" className="bg-white py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-12 md:mb-16"
        >
          <div className="flex flex-col gap-5">
            <h2
              className={`${typoClass(typography?.mlPreview.title)}`}
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#101828' }}
            >
              {content?.title || "Machine Learning & AI"}
            </h2>
            <p
              className={`${typoClass(typography?.mlPreview.subtitle)} max-w-[768px]`}
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.secondary || '#494848' }}
            >
              {content?.subtitle || "Hands-on experimentation with fraud detection, retrieval systems, and autonomous agents."}
            </p>
          </div>

          <div className="hidden lg:flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollML('left')}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-[#191818]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollML('right')}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f7f4ed] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-[#191818]" />
            </motion.button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-6 md:gap-8 min-w-max">
            {projects.map((project, index) => (
              <div key={index} id={`projects-${project.slug || project.id || index}`} className="max-w-[480px]">
                <Link
                  href={`/ml/${project.slug}`}
                >
                  <div
                    className="relative h-[280px] md:h-[320px] lg:h-[403px] overflow-hidden rounded-[24px] bg-[#F7F4ED]"
                  >
                    <div className="absolute bottom-0 right-0 w-full max-w-[264px] lg:max-w-[364px] aspect-square right-[-34%] bottom-[-47%] z-0 pointer-events-none">
                      <div className="relative w-full h-full">
                        <Image src={project.previewImage ?? '/gradient-pink.png'} alt="" aria-hidden fill className="object-contain" draggable={false} />
                      </div>
                    </div>
                    {project.metrics?.[0]?.value && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`absolute left-[38px] top-[85px] z-10 ${typoClass(typography?.mlPreview.metricText)}`}
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
                      >
                        <span
                          className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                        >
                          {project.metrics?.[0]?.value}
                        </span>
                        {' '}{project.metrics?.[0]?.label}
                      </motion.p>
                    )}
                    {project.metrics?.[1]?.value && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`absolute left-[146px] bottom-[86px] z-10 ${typoClass(typography?.mlPreview.metricText)}`}
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
                      >
                        <span
                          className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                        >
                          {project.metrics?.[1]?.value}
                        </span>
                        {' '}{project.metrics?.[1]?.label}
                      </motion.p>
                    )}
                    {!project.metrics?.[0]?.value && project.metrics?.[0]?.label && (
                      <p
                        className={`absolute left-[61px] bottom-[104px] ${typoClass(typography?.mlPreview.metricText)}`}
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#191818' }}
                      >
                        {project.metrics?.[0]?.label}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3
                      className={`${typoClass(typography?.mlPreview.cardTitle)} mt-5`}
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.primary || '#101828' }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`${typoClass(typography?.mlPreview.cardDescription)}`}
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100", color: colors?.text.secondary || '#494848' }}
                    >
                      {project.shortDescription}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
