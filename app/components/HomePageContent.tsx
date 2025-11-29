'use client';

import { mlProjects } from '@/app/data/mlProjects';
import { productDesignProjects } from '@/app/data/productDesignProjects';
import homeContent from '@/app/data/homeContent.json';
import { useState, useEffect } from 'react';

import HeroSection from './home/HeroSection';
import ServicesSection from './home/ServicesSection';
import FeaturesSection from './home/FeaturesSection';
import MLPreviewSection from './home/MLPreviewSection';
import PDPreviewSection from './home/PDPreviewSection';
import AboutSection from './home/AboutSection';

export default function HomePageContent() {
  const [pdData, setPdData] = useState(productDesignProjects);

  // Listen for custom event to refresh data
  useEffect(() => {
    const handleRefresh = async () => {
      try {
        // Dynamic import to bypass module caching
        const moduleData = await import('@/app/data/productDesignProjects');
        setPdData(moduleData.productDesignProjects);
      } catch (error) {
        console.error('Failed to refresh PD projects:', error);
      }
    };

    window.addEventListener('refresh-pd-projects', handleRefresh);
    return () => window.removeEventListener('refresh-pd-projects', handleRefresh);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection content={homeContent.hero as typeof homeContent.hero & { buttons: Array<{text: string; link: string; style: "primary" | "secondary"}>} } colors={homeContent.colors} />

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
          pdData={pdData}
          colors={homeContent.colors}
        />
      </section>
    </>
  );
}