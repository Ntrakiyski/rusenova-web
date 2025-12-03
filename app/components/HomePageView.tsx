'use client';

import { HomeContent } from '@/types/project';
import HeroSection from './home/HeroSection';
import ServicesSection from './home/ServicesSection';
import FeaturesSection from './home/FeaturesSection';
import MLPreviewSection from './home/MLPreviewSection';
import PDPreviewSection from './home/PDPreviewSection';
import AboutSection from './home/AboutSection';

export default function HomePageView({ content }: { content: HomeContent }) {
  const pdData = content.pdPreview?.projects || [];
  const mlData = content.mlPreview?.projects || [];

  return (
    <>
      <HeroSection content={content.hero} colors={content.colors} />
      <ServicesSection content={content.services} colors={content.colors} />
      <FeaturesSection content={content.features} colors={content.colors} />
      <section id="projects">
        <MLPreviewSection content={content.mlPreview} mlData={mlData} colors={content.colors} />
      </section>
      <section id="about">
        <AboutSection content={content.about} colors={content.colors} />
      </section>
      <section id="experience">
        <PDPreviewSection content={content.pdPreview} pdData={pdData} colors={content.colors} />
      </section>
    </>
  );
}

