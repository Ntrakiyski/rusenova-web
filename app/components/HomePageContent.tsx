'use client';

import { useRouter } from 'next/navigation';
import { mlProjects } from '@/app/data/mlProjects';
import { productDesignProjects } from '@/app/data/productDesignProjects';

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
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* ML Preview Section */}
      <section id="projects">
        <MLPreviewSection
          mlData={mlProjects}
        />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Product Design Preview Section */}
      <section id="experience">
        <PDPreviewSection
          pdData={productDesignProjects}
        />
      </section>
    </>
  );
}