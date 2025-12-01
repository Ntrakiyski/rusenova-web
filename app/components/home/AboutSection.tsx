'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HomeContent } from '@/types/project';

interface AboutSectionProps {
  content: HomeContent['about'];
  colors: HomeContent['colors'];
}

export default function AboutSection({ content, colors }: AboutSectionProps) {
  const stats = content.stats;

  return (
    <section id="about" className={`py-16 md:py-24`} style={{ backgroundColor: content.backgroundColor }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-text-md-semibold font-bricolage text-text-orange`}
            >
              {content.badge}
            </motion.span>


            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
               <p
                 className={`text-display-xs font-bricolage font-semibold text-text-primary`}
               >
                 I&apos;m Gloria
               </p>

              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-text-xl-regular font-bricolage text-text-secondary`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex flex-col gap-1"
                >
                  <span
                    className={`text-display-md font-bricolage font-semibold text-text-primary`}
                  >
                    {stat.value}
                  </span>
                  <span
                    className={`text-text-lg-regular font-bricolage text-text-secondary`}
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
            className="order-1 lg:order-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl overflow-hidden aspect-3/4 max-w-[400px] mx-auto lg:max-w-none"
            >
              <Image
                src={content.image.src}
                alt={content.image.alt}
                className="w-full h-full object-cover"
                width={400}
                height={533}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
