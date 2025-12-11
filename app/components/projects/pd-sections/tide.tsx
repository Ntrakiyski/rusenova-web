'use client';

import React from 'react';
import PDHero from './PDHero';
import PDNutshell from './PDNutshell';
import PDSectionLeft from './PDSectionLeft';
import PDSectionRight from './PDSectionRight';
import PDSelectedWork from './PDSelectedWork';
import PDKeepInMind from './PDKeepInMind';
import PDSlider from './PDSlider';
import { Project, IntroSection, GenericSection, ProjectFeature } from '@/types/project';

interface TideProps {
  projectData: Project;
}

export default function Tide({ projectData }: TideProps) {
  // Extract data from Project structure
  const introSection = projectData.sections.find((section): section is IntroSection => section.type === 'intro');
  const projectSections = projectData.sections.filter(section => section.type !== 'intro' && section.type !== 'tech-stack');

  return (
    <div className="min-h-screen w-full">
      {/* 1. Hero Header Section */}
      <PDHero
        title={projectData.heroTitle || projectData.title || ''}
        subtitle={projectData.heroDescription || projectData.shortDescription || ''}
        titleHighlight={projectData.titleHighlight || ''}
        descriptionHighlight={projectData.heroDescriptionHighlight || ''}
        background={projectData.heroBackground || 'bg-bg-dark'}
      />

      {/* 2. Intro Section */}
      {introSection && (
        <PDNutshell
          features={Array.isArray(introSection.content) ? introSection.content.map((item: ProjectFeature | string) => ({
            title: typeof item === 'string' ? '' : (item.title || ''),
            description: typeof item === 'string' ? item : (item.description || '')
          })) : []}
        />
      )}

      {/* 3. Selected Work Section */}
      <PDSelectedWork
        title="Selected Work"
        description="Featured below are select projects from my broader portfolio. Happy to dive deeper into specific work"
      />

      {/* 4. Project Sections */}
      {projectSections.map((section, index) => {
        const layout = section.layout || 'text-left';
        const achievements = (section as GenericSection).achievements || [];
        const image = section.image;

        // Parse comma-separated images for slider sections
        const sliderImages = image ? image.split(',').map(img => img.trim()) : ["/tide-home-1.svg", "/tide-home-2.svg", "/tide-home-3.svg"];

        // First section (index 0): keep as PDSectionLeft
        if (index === 0) {
          return (
            <PDSectionLeft
              key={section.type}
              title={section.title}
              description={section.description || ''}
              achievements={achievements}
              images={image ? [image] : ["/rag-results.png"]}
            />
          );
        }
        // Second and third sections (index 1, 2): use PDSlider with custom images
        else if (index === 1 || index === 2) {
          return (
            <PDSlider
              key={section.type}
              title={section.title}
              description={section.description || ''}
              achievements={achievements}
              sliderImages={sliderImages}
              background="bg-white"
            />
          );
        }
        // For other sections: use the original layout logic
        else if (layout === 'text-right' || layout === 'image-left-text-right') {
          return (
            <PDSectionRight
              key={section.type}
              title={section.title}
              description={section.description || ''}
              achievements={achievements}
              images={image ? [image] : ["/rag-results.png"]}
            />
          );
        }
        return null;
      })}

      {/* 5. Keep in Mind Section */}
      <PDKeepInMind
        title="Keep in mind"
        description="What you see here is a snapshot - each project has layers of research, collaboration, and tough decisions that shaped the outcome. If something catches your eye, let's talk about how that experience translates to what you're working on."
      />
    </div>
  );
}
