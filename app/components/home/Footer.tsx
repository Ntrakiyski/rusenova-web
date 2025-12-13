'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import NextLink from 'next/link';
import productDesignProjects from '@/app/data/productDesignProjects';

export default function Footer() {
  return (
    <footer className="bg-[#191818] text-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <h3
              className="font-bricolage font-extrabold text-white text-display-xs"
            >
              Gloria
            </h3>
            <p
              className="font-bricolage font-normal text-text-light-gray text-text-lg-regular max-w-[400px]"
            >
              Building intelligent systems that bridge the gap between cutting-edge machine learning and delightful user experiences.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://github.com/gloriarusenova"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/gloriarusenova"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:gloriarusenova@gmail.com"
                className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4
              className="font-bricolage font-semibold text-white text-text-lg-regular"
            >
              Projects
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <NextLink
                  href="/ml/rag-evaluation-system"
                  className="font-bricolage font-normal text-text-light-gray hover:text-white text-sm transition-colors"
                >
                  RAG + Evaluation pipeline
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/ml/fraud-detection-system"
                  className="font-bricolage font-normal text-text-light-gray hover:text-white text-sm transition-colors"
                >
                  Fraud detection system
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/ml/real-time-meeting-agent"
                  className="font-bricolage font-normal text-text-light-gray hover:text-white text-sm transition-colors"
                >
                  Real-time meeting agent
                </NextLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4
              className="font-bricolage font-semibold text-white text-text-lg-regular"
            >
              Experience
            </h4>
            <ul className="flex flex-col gap-3">
              {productDesignProjects.map((project, index) => (
                <li key={index}>
                  <NextLink
                    href={`/product-design/${project.slug}`}
                    className="font-bricolage font-normal text-text-light-gray hover:text-white text-sm transition-colors"
                  >
                    {project.heroTitle}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10">
          <p
            className="font-bricolage font-normal text-text-light-gray text-sm text-center md:text-left"
          >
            © 2025 Gloria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
