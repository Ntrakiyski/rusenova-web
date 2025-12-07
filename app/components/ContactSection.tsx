'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Linkedin } from 'lucide-react';


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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-bg-dark relative overflow-clip shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]"
            style={{ borderRadius: '60px 60px 60px 60px' }}
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center p-8 sm:p-16">
              <div className="flex flex-col gap-5">
                <h2
                  className="font-bricolage font-semibold text-white text-display-md leading-[44px] tracking-[-0.72px]"
                >
                  {contactContent.title}
                </h2>

                <p
                  className="font-bricolage font-normal text-white text-text-xl-regular leading-[30px]"
                >
                  {contactContent.subtitle}
                </p>

                <div className="flex gap-3 mt-8">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href={contactContent.email}
                      className="box-border flex items-center justify-center w-12 h-12 rounded-full border shadow-md transition-colors hover:opacity-90 bg-text-orange border-text-orange">
                    <Mail className="w-5 h-5 text-white" /> {/* White icon */}
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href={contactContent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="box-border flex items-center justify-center w-12 h-12 rounded-full border shadow-md transition-colors hover:opacity-90 bg-white border-white">
                    <Linkedin className="w-5 h-5 text-text-primary" /> {/* White icon */}
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center p-8 sm:p-16">
              <div className="flex flex-col gap-5">
                <p
                  className="font-bricolage font-normal text-white text-text-xl-regular leading-[30px]"
                >
                  I'm currently seeking opportunities in:
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-3">
                    {contactContent.opportunities[0].map((opportunity, index) => (
                      <div
                        key={index}
                        className="backdrop-blur-sm backdrop-filter bg-[rgba(255,255,255,0.03)] px-6 py-3 rounded-[10px] h-12 flex items-center justify-center"
                      >
                        <p
                          className="font-bricolage font-bold text-white text-text-lg-regular leading-[24px] whitespace-nowrap"
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
                          className="font-bricolage font-bold text-white text-text-lg-regular leading-[24px] whitespace-nowrap"
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

          <div className="absolute bottom-[-1790px] right-[-1150px] pointer-events-none translate-y-16">
            <div className="relative w-[2150px] h-[2150px]">
              <Image
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src="/gradient-orange-pink.png"
                width={250}
                height={250}
              />
            </div>
          </div>
          <div className="absolute bottom-[-60px] right-[-90px] pointer-events-none translate-y-16">
            <div className="relative w-[300px] h-[300px]">
              <Image
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src="/fractal.png"
                width={250}
                height={250}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}