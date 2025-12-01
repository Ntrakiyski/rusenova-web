'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HomeContent } from '@/types/project';

interface FeaturesSectionProps {
  content: HomeContent['features'];
  colors: HomeContent['colors'];
}

export default function FeaturesSection({ content, colors }: FeaturesSectionProps) {
  const features = content.items;

  const featureContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section className={`relative py-16 md:py-24 overflow-hidden bg-bg-dark`}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5 mb-12 md:mb-16"
        >
          <h2
            className={`text-display-md font-semibold text-center max-w-[768px]`}
            style={{ color: 'white' }}
          >
            {content.title}
          </h2>
          <p
            className={`text-text-xl-regular font-bricolage text-center max-w-[768px]`}
            style={{ color: 'white' }}
          >
            {content.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={featureContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureItemVariants}
              className="flex flex-col items-center gap-6 p-6 rounded-2xl"
            >
              <div className="relative size-[72px]">
                <Image
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={feature.icon}
                  width={72}
                  height={72}
                />
              </div>

              <div className="flex flex-col gap-3 text-center">
                <h3
                  className={`text-text-xl-semibold font-bricolage text-white`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-text-lg-regular font-bricolage`}
                  style={{ color: colors.text.muted }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
