'use client';

import homeContent from '@/app/data/homeContent.json';
import { useState, useEffect } from 'react';
import { HomeContent } from '@/types/project';

import HeroSection from './home/HeroSection';
import ServicesSection from './home/ServicesSection';
import FeaturesSection from './home/FeaturesSection';
import MLPreviewSection from './home/MLPreviewSection';
import PDPreviewSection from './home/PDPreviewSection';
import AboutSection from './home/AboutSection';

// Type assertion for the JSON data
type TypedHomeContent = HomeContent;
const typedHomeContent = homeContent as TypedHomeContent;

export default function HomePageContent() {
  // Use projects from homeContent.json instead of separate TypeScript files
  const pdData = typedHomeContent.pdPreview?.projects || [];
  const mlData = typedHomeContent.mlPreview?.projects || [];

  // Listen for custom event to refresh data
  useEffect(() => {
    const handleRefresh = async () => {
      try {
        // Refresh homeContent.json data
        const moduleData = await import('@/app/data/homeContent.json?t=' + Date.now());
        // This will refresh the component since pdData and mlData are derived from homeContent
      } catch (error) {
        console.error('Failed to refresh home content:', error);
      }
    };

    window.addEventListener('refresh-home-content', handleRefresh);
    return () => window.removeEventListener('refresh-home-content', handleRefresh);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection content={typedHomeContent.hero as typeof typedHomeContent.hero & { buttons: Array<{text: string; link: string; style: "primary" | "secondary"}>} } colors={typedHomeContent.colors} typography={typedHomeContent.typography} />

      {/* Services Section */}
      <ServicesSection content={typedHomeContent.services} colors={typedHomeContent.colors} typography={typedHomeContent.typography} />

      {/* Features Section */}
      <FeaturesSection content={typedHomeContent.features} colors={typedHomeContent.colors} typography={typedHomeContent.typography} />

      {/* ML Preview Section */}
      <section id="projects">
        <MLPreviewSection
          content={typedHomeContent.mlPreview}
          mlData={mlData}
          colors={typedHomeContent.colors}
          typography={typedHomeContent.typography}
        />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection content={typedHomeContent.about} colors={typedHomeContent.colors} typography={typedHomeContent.typography} />
      </section>

      {/* Product Design Preview Section */}
      <section id="experience">
        <PDPreviewSection
          content={typedHomeContent.pdPreview}
          pdData={pdData}
          colors={typedHomeContent.colors}
          typography={typedHomeContent.typography}
        />
      </section>
    </>
  );
}
