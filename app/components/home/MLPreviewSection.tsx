'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, HomeContent } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

interface MLPreviewSectionProps {
  mlData?: (Project | NonNullable<HomeContent['mlPreview']>['projects'][0])[];
  colors?: HomeContent['colors'];
  content?: HomeContent['mlPreview'];
}

export default function MLPreviewSection({ mlData, colors, content }: MLPreviewSectionProps) {
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
              className={`text-display-md font-bricolage font-semibold`}
              style={{ color: colors?.text.primary || '#101828' }}
            >
              {content?.title || "Machine Learning & AI"}
            </h2>
            <p
              className={`text-text-xl-regular font-bricolage max-w-[768px]`}
              style={{ color: colors?.text.secondary || '#494848' }}
            >
              {content?.subtitle || "Hands-on experimentation with fraud detection, retrieval systems, and autonomous agents."}
            </p>
          </div>
        </motion.div>
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
            {projects.map((project, index) => (
              <div key={index} id={`projects-${project.slug || project.id || index}`} className="w-[80vw] md:w-[583px] shrink-0">
                <Link
                  href={`/ml/${project.slug}`}
                >
                  <div
                    className="relative h-[403px] overflow-hidden rounded-[24px] bg-[#1F1F1F] duration-300"
                  >
                    <div className="absolute left-[-193px] top-[83px] w-[2130px] h-[2130px] z-0 pointer-events-none">
                      <div className="relative w-full h-full">
                        <Image src={project.previewImage ?? '/gradient-pink.png'} alt="" aria-hidden width={2130} height={2130} className="object-contain" draggable={false} />
                      </div>
                    </div>
                    {project.metrics?.[0]?.value && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`absolute left-[38px] top-[85px] z-10 text-display-xs font-bricolage`}
                        style={{ color: '#ffffff' }}
                      >
                        <span
                          className="font-bold"
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
                        className={`absolute left-[146px] bottom-[86px] z-10 text-display-xs font-bricolage`}
                        style={{ color: '#ffffff' }}
                      >
                        <span
                          className="font-bold"
                        >
                          {project.metrics?.[1]?.value}
                        </span>
                        {' '}{project.metrics?.[1]?.label}
                      </motion.p>
                    )}
                    {!project.metrics?.[0]?.value && project.metrics?.[0]?.label && (
                      <p
                        className={`absolute left-[61px] bottom-[104px] text-text-lg-regular font-bricolage`}
                        style={{ color: '#ffffff' }}
                      >
                        {project.metrics?.[0]?.label}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3
                      className={`text-display-xs font-bricolage font-semibold mt-5`}
                      style={{ color: colors?.text.primary || '#101828' }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-text-lg-regular font-bricolage`}
                      style={{ color: colors?.text.secondary || '#494848' }}
                    >
                      {project.shortDescription}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
