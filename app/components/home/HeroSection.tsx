"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HomeContent } from "@/types/project";
import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { IconContext } from "react-icons";

interface HeroSectionProps {
  content: HomeContent["hero"];
  colors: HomeContent["colors"];
}

export default function HeroSection({ content, colors }: HeroSectionProps) {
  return (
    <section
      className={`relative pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden h-[85vh] flex flex-col justify-center`}
      style={{ borderRadius: "0 0 60px 60px" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center gap-8 md:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`text-text-md-semibold text-text-orange font-bricolage uppercase text-center`}
          >
            {content.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`text-display-2xl font-bricolage font-bold text-center max-w-[1024px]`}
            style={{ color: colors.text.primary }}
          >
            {content.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className={`text-text-md-regular font-bricolage text-center max-w-[768px]`}
            style={{ color: colors.text.secondary }}
          >
            {content.subtitle}
          </motion.p>

          {/*  */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-3 md:gap-5 justify-center"
          >
            {content.buttons.map((button, index) => {
              // Determine layout based on index: Left (0) = Mail, Right (1) = Linkedin
              const isLeft = index === 0;
              const Icon = Mail;
              const LinkedinIcon = (
                <IconContext.Provider value={{ color: "white", size: '20px' }}>
                  <FaLinkedinIn />
                </IconContext.Provider>
              );

              // Set Background classes: Left = text-orange, Right = text-dark
              const bgClass = isLeft
                ? "bg-text-orange border-text-orange"
                : "bg-bg-dark border-text-dark";

              return (
                <div
                  key={index}
                  className={`flex gap-2 items-center justify-center transition-colors hover:opacity-90 ${bgClass} rounded-full p-4 max-h-[44px]`}
                >
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    // Applied dynamic bgClass, fixed sizes, and circle shape
                    className={`box-border flex items-center justify-center`}
                    onClick={() => window.open(button.link, "_blank")}
                  >
                    {/* Icon is always white */}
                    {isLeft ? (
                      <Icon className="w-5 h-5 text-white" />
                    ) : (
                      LinkedinIcon
                    )}
                  </motion.button>
                  <p className="text-text-lg-semibold font-bricolage text-white mt-[2px]">
                    {button.text}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-[-1800px] right-[-850px] z-0 w-[2130px] h-[2130px]">
        <Image
          alt=""
          className="pointer-events-none"
          src="/gradient-orange-pink.png"
          width={2130}
          height={2130}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-[-80px] right-0 h-[200px] md:h-[250px] lg:h-[320px] max-w-[40vw] w-auto"
      >
        <div className="relative h-full">
          <div className="h-full relative">
            <Image
              alt={content.image.alt}
              className="h-full w-auto object-contain pointer-events-none relative z-10 max-w-full"
              src={content.image.src}
              width={0}
              height={0}
              sizes="40vw"
              style={{ width: "auto", height: "100%", maxWidth: "100%" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
