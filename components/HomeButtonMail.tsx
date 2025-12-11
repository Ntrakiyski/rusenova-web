"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function HomeButtonMail() {
  const [copied, setCopied] = useState(false);

  const handleMailClick = () => {
    const email = "gloriarussenovaa@gmail.com";

    // Defer the copy operation to break out of touch event context
    setTimeout(() => {
      const tempInput = document.createElement("input");
      tempInput.value = email;
      tempInput.style.position = "fixed";
      tempInput.style.left = "-999999px";
      tempInput.style.top = "-999999px";
      document.body.appendChild(tempInput);

      tempInput.select();
      tempInput.setSelectionRange(0, 99999);

      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed:", err);
      }

      document.body.removeChild(tempInput);
    }, 0);
  };

  return (
    <div
      className="flex gap-2 items-center justify-center transition-colors hover:opacity-90 bg-text-orange border-text-orange rounded-full p-4 max-h-[44px] cursor-pointer"
      onClick={handleMailClick}
    >
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="box-border flex items-center justify-center"
      >
        <Mail className="w-5 h-5 text-white" />
      </motion.button>
      <p className="text-text-lg-semibold font-bricolage text-white mt-[2px]">
        {copied ? "Copied" : "Copy Email"}
      </p>
    </div>
  );
}
