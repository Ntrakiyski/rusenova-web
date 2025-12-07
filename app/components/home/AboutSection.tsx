'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HomeContent } from '@/types/project';

interface AboutSectionProps {
  content: HomeContent['about'];
  colors: HomeContent['colors'];
}

export default function AboutSection({ content, colors }: AboutSectionProps) {
  return (
    <section id="about" className={`py-16 md:py-24 bg-white`}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 mb-12 md:mb-16"
        >
          <h2
            className={`text-display-md font-bricolage font-semibold`}
            style={{ color: colors.text.primary, textAlign: 'left' }}
          >
            {content.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-6 text-left"
          >
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-text-xl-regular font-bricolage`}
                style={{ color: colors.text.secondary }}
              >
                {paragraph}
              </p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mt-8"
            >
              {content.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex flex-col gap-1"
                >
                  <span
                    className={`text-display-md font-bricolage font-semibold text-text-orange text-center`}
                
                  >
                    {stat.value}
                  </span>
                  <span
                    className={`text-text-lg-regular font-bricolage text-center`}
                    style={{ color: colors.text.secondary }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden mx-auto h-[550px] max-h-[550px] flex items-center justify-center"
            >
              <Image
                src={content.image.src}
                alt={content.image.alt}
                className="h-full w-auto object-contain"
                width={400}
                height={533}
                style={{ height: '100%', width: 'auto' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
