'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  const stats = [
    { value: '8+', label: 'Years of Experience' },
    { value: '3', label: 'Major Companies' },
    { value: '100%', label: 'Passion for AI & Design' }
  ];

  return (
    <section id="about" className="bg-[#f7f4ed] py-16 md:py-24">
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
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#f0633f] text-[14px] md:text-[16px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              ONE PERSON TEAM
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#191818] text-[28px] md:text-[36px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              I'm Gloria
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <p
                className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] md:text-[18px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                I'm Gloria - a product designer, based in Bulgaria with 8 years of experience exploring how systems, data, and human behavior connect to shape meaningful experiences. I've always been drawn to the details that make complex systems feel seamless, from how a product behaves to how people move through its journey. My curiosity about data naturally led me to machine learning, where I found a new way to understand and design smarter experiences.
              </p>

              <p
                className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] md:text-[18px]"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
              >
                After studying statistics and ML and building several projects, I'm excited to merge these worlds — using design thinking to make AI more intuitive and human-centered. If you're working on something in that space, I'd love to collaborate
              </p>
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
                    className="font-['Bricolage_Grotesque:Bold',sans-serif] text-[#191818] text-[32px] md:text-[40px]"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[14px]"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
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
              className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-[400px] mx-auto lg:max-w-none"
            >
              <Image
                src="/rag-results.png"
                alt="Gloria"
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