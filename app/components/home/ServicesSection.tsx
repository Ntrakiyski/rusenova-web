'use client';

import { motion } from 'framer-motion';
import { HomeContent } from '@/types/project';

interface ServicesSectionProps {
  content: HomeContent['services'];
  colors: HomeContent['colors'];
}

export default function ServicesSection({ content, colors }: ServicesSectionProps) {
  const services = content.items;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section className="bg-white py-16 md:py-24 rounded-bl-[40px] rounded-br-[40px]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`text-text-lg-regular font-bricolage text-center w-full`}
            style={{ color: colors.text.secondary }}
          >
            {content.title}
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-6"
          >
            {services.map((service, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className={`text-text-xl-semibold font-bricolage text-center cursor-default`}
                style={{ color: colors.text.primary }}
              >
                {service}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
