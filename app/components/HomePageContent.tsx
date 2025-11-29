'use client';

import { useRouter } from 'next/navigation';
import { mlProjects } from '@/app/data/mlProjects';
import { productDesignProjects } from '@/app/data/productDesignProjects';
import { HomeContent } from '@/types/project';
import homeContent from '@/app/data/homeContent.json';

import HeroSection from './home/HeroSection';
import ServicesSection from './home/ServicesSection';
import FeaturesSection from './home/FeaturesSection';
import MLPreviewSection from './home/MLPreviewSection';
import PDPreviewSection from './home/PDPreviewSection';
import AboutSection from './home/AboutSection';

export default function HomePageContent() {
  const router = useRouter();

  // Links now handle navigation directly with target="_blank"

  return (
    <>
      {/* Hero Section */}
      <HeroSection content={homeContent.hero} colors={homeContent.colors} />

      {/* Services Section */}
      <ServicesSection content={homeContent.services} colors={homeContent.colors} />

      {/* Features Section */}
      <FeaturesSection content={homeContent.features} colors={homeContent.colors} />

      {/* ML Preview Section */}
      <section id="projects">
        <MLPreviewSection
          mlData={mlProjects}
          colors={homeContent.colors}
        />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection content={homeContent.about} colors={homeContent.colors} />
      </section>

      {/* Product Design Preview Section */}
      <section id="experience">
        <PDPreviewSection
          pdData={productDesignProjects}
          colors={homeContent.colors}
        />
      </section>
    </>
  );
}