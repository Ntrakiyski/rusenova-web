'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import spiralImage from "@/public/rag-results.png";

interface ContactSectionProps {
  content: {
    title: string;
    subtitle: string;
    email: string;
    linkedin: string;
    opportunities: string[][];
  };
}

export default function ContactSection({ content }: ContactSectionProps) {
  // Fallback content in case content is undefined
  const fallbackContent = {
    title: "Want to talk about your project?",
    subtitle: "Message me on LinkedIn or send me an email",
    email: "mailto:gloria@example.com",
    linkedin: "https://linkedin.com",
    opportunities: [
      ["Machine Learning Engineering", "Data Science"],
      ["Product Design"]
    ]
  };

  const contactContent = content || fallbackContent;
  return (
    <section id="contact" className="relative py-20">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#212121] rounded-[24px] overflow-clip shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center p-16"
            >
              <div className="flex flex-col gap-5">
                <h2
                  className="font-['Inter:Semi_Bold',sans-serif] text-white text-[36px] leading-[44px] tracking-[-0.72px]"
                >
                  {contactContent.title}
                </h2>

                <p
                  className="font-['Inter:Regular',sans-serif] text-white text-[20px] leading-[30px]"
                >
                  {contactContent.subtitle}
                </p>

                <div className="flex gap-3 mt-8">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href={contactContent.email}
                    className="px-[18px] py-[12px] rounded-lg border border-white hover:bg-white/5 transition-colors shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                  >
                    <span
                      className="font-['Inter:Semi_Bold',sans-serif] text-white text-[16px] leading-[24px]"
                    >
                      Email
                    </span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href={contactContent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-[18px] py-[12px] rounded-lg bg-white hover:bg-white/90 transition-colors border border-[#7f56d9] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                  >
                    <span
                      className="font-['Inter:Semi_Bold',sans-serif] text-[#212121] text-[16px] leading-[24px]"
                    >
                      LinkedIn
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center p-16"
            >
              <div className="flex flex-col gap-5">
                <p
                  className="font-['Inter:Regular',sans-serif] text-white text-[20px] leading-[30px]"
                >
                  I&apos;m currently seeking opportunities in:
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-3">
                    {contactContent.opportunities[0].map((opportunity, index) => (
                      <div
                        key={index}
                        className="backdrop-blur-sm backdrop-filter bg-[rgba(255,255,255,0.03)] px-6 py-3 rounded-[10px] h-12 flex items-center justify-center"
                      >
                        <p
                          className="font-['Inter:Bold',sans-serif] text-white text-[15.6px] leading-[24px] whitespace-nowrap"
                        >
                          {opportunity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {contactContent.opportunities[1].map((opportunity, index) => (
                      <div
                        key={index}
                        className="backdrop-blur-sm backdrop-filter bg-[rgba(255,255,255,0.03)] px-6 py-3 rounded-[10px] h-12 flex items-center justify-center"
                      >
                        <p
                          className="font-['Inter:Bold',sans-serif] text-white text-[15.6px] leading-[24px] whitespace-nowrap"
                        >
                          {opportunity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute items-center justify-center left-[850px] w-[559.467px] h-[559.467px] top-[134px] pointer-events-none lg:flex hidden">
            <div className="rotate-300">
              <div className="relative w-[409.558px] h-[409.558px]">
                <Image
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={spiralImage}
                  width={409}
                  height={409}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}