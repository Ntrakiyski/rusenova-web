'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import NextLink from 'next/link';

export default function Footer() {
  const footerLinks = {
    services: [
      { label: 'Machine Learning', href: '#' },
      { label: 'Product Design', href: '#' },
      { label: 'AI Integration', href: '#' },
      { label: 'Consulting', href: '#' }
    ],
    company: [
      { label: 'About', href: '/#about' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Contact', href: '/#contact' }
    ]
  };

  return (
    <footer className="bg-[#191818] text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h3
              className="font-['Bricolage_Grotesque:96pt_ExtraBold',sans-serif] text-white text-[24px]"
              style={{ fontVariationSettings: "'opsz' 96, 'wdth' 100" }}
            >
              Gloria
            </h3>
            <p
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] text-[16px] max-w-[400px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Building intelligent systems that bridge the gap between cutting-edge machine learning and delightful user experiences.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:gloria@example.com"
                className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[16px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[16px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Projects
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <NextLink
                  href="/ml/rag-evaluation-system"
                  className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  RAG + Evaluation pipeline
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/ml/fraud-detection-system"
                  className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  Fraud detection system
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/ml/real-time-meeting-agent"
                  className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  Real-time meeting agent
                </NextLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4
              className="font-['Bricolage_Grotesque:SemiBold',sans-serif] text-white text-[16px]"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <NextLink
                    href={link.href}
                    className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10">
          <p
            className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] text-[14px] text-center md:text-left"
            style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
          >
            © 2025 Gloria. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-['Bricolage_Grotesque:Regular',sans-serif] text-[#babcc0] hover:text-white text-[14px] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}