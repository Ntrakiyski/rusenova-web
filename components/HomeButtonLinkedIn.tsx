"use client";

import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function HomeButtonLinkedIn() {
  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://www.linkedin.com/in/gloriarusenova/", "_blank");
  };

  return (
    <div
      className="flex gap-2 items-center justify-center transition-colors hover:opacity-90 bg-bg-dark border-text-dark rounded-full p-4 max-h-[44px] cursor-pointer"
      onClick={handleLinkedInClick}
    >
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="box-border flex items-center justify-center"
      >
        <IconContext.Provider value={{ color: "white", size: '20px' }}>
          <FaLinkedinIn />
        </IconContext.Provider>
      </motion.button>
      <p className="text-text-lg-semibold font-bricolage text-white mt-[2px]">
        Connect me
      </p>
    </div>
  );
}
