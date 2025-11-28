'use client';

import { motion } from 'framer-motion';

export default function ServicesSection() {
  const services = [
    'Machine Learning Engineering',
    'Data Science',
    'Product Design'
  ];

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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="bg-white py-16 md:py-24 rounded-bl-[40px] rounded-br-[40px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#494848] text-[16px] text-center w-full"
            style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
          >
            I can help with
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
                whileHover={{ scale: 1.05, color: '#f0633f' }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-[#191818] text-[18px] md:text-[20px] text-center cursor-default"
                style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
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