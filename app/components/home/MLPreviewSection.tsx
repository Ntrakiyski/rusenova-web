'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types/project';
import Link from 'next/link';
import Image from 'next/image';

interface MLPreviewSectionProps {
  mlData: Project[];
}

export default function MLPreviewSection({ mlData }: MLPreviewSectionProps) {
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
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#101828] text-[28px] md:text-[36px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Machine Learning & AI
            </h2>
            <p
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] md:text-[20px] max-w-[768px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Hands-on experimentation with fraud detection, retrieval systems, and autonomous agents.
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
            {mlData.map((project, index) => (
              <Link
                key={index}
                href={`/ml/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col gap-5 w-[320px] md:w-[380px] lg:w-[400px] flex-shrink-0 cursor-pointer"
                >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-[280px] md:h-[320px] lg:h-[403px] overflow-hidden rounded-[24px]"
                  style={{
                    background: project.gradientColors.length >= 2
                      ? `radial-gradient(58.25% 50.19% at 96.04% 96.28%, ${project.gradientColors[0]} 9.13%, ${project.gradientColors[1]} 54.81%, #F7F4ED 90.51%)`
                      : project.gradientColors.length === 1
                        ? `radial-gradient(58.25% 50.19% at 96.04% 96.28%, ${project.gradientColors[0]} 9.13%, #D9DADF 54.81%, #F7F4ED 90.51%)`
                        : 'radial-gradient(58.25% 50.19% at 96.04% 96.28%, #D29C81 9.13%, #D9DADF 54.81%, #F7F4ED 90.51%)'
                  }}
                >
                  {project.metrics[0]?.value && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="absolute left-[38px] top-[85px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[16px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      <span
                        className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                      >
                        {project.metrics[0].value}
                      </span>
                      {' '}{project.metrics[0].label}
                    </motion.p>
                  )}
                  {project.metrics[1]?.value && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="absolute left-[146px] bottom-[86px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[16px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      <span
                        className="font-['Bricolage_Grotesque:Bold',sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                      >
                        {project.metrics[1].value}
                      </span>
                      {' '}{project.metrics[1].label}
                    </motion.p>
                  )}
                  {!project.metrics[0]?.value && project.metrics[0]?.label && (
                    <p
                      className="absolute left-[61px] bottom-[104px] font-['Bricolage_Grotesque:Light',sans-serif] text-[#191818] text-[16px]"
                      style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                    >
                      {project.metrics[0].label}
                    </p>
                  )}

                </motion.div>

                <div className="flex flex-col gap-2">
                  <h3
                    className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#101828] text-[20px] md:text-[24px]"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px]"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    {project.shortDescription}
                  </p>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}