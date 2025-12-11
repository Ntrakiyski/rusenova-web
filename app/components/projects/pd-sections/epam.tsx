'use client';

import React from 'react';
import PDHero from './PDHero';
import PDNutshell from './PDNutshell';
import PDSectionLeft from './PDSectionLeft';
import PDSectionRight from './PDSectionRight';
import PDKeepInMind from './PDKeepInMind';
import { Project, IntroSection, GenericSection, ProjectFeature } from '@/types/project';
import PDSelectedWork from './PDSelectedWork';
import PDSlider from './PDSlider';

interface EpamProps {
  projectData: Project;
}

export default function Epam({ projectData }: EpamProps) {
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

      {/* 2. Nutshell Section */}
      {introSection && (
        <PDNutshell
          title={introSection.title}
          features={Array.isArray(introSection.content) ? introSection.content.map((item: ProjectFeature | string) => ({
            title: typeof item === 'string' ? '' : (item.title || ''),
            description: typeof item === 'string' ? item : (item.description || '')
          })) : []}
        />
      )}

       <PDSelectedWork
        title="Selected Work"
        description="Featured below are select projects from my broader portfolio. Happy to dive deeper into specific work"
      />

      {/* 3. Project Sections - Replace PDSectionLeft with PDSlider */}
      {projectSections.map((section, index) => {
        const achievements = (section as GenericSection).achievements || [];
        const image = (section as GenericSection).image;

        // Use PDSlider for the first section (index 0) instead of PDSectionLeft
        if (index === 0) {
          return (
            <PDSlider
              key={section.type}
              title={section.title}
              description={section.description || ''}
              achievements={achievements}
              sliderImages={["/epam-ecom-1.svg", "/epam-ecom-2.svg", "/epam-ecom-3.svg"]}
              background="bg-white"
            />
          );
        }
        // Pattern: 1: right (image right), 2: left (image left)
        else if (index % 2 === 1) {
          return (
            <PDSectionRight
              key={section.type}
              title={section.title}
              description={section.description || ''}
              achievements={achievements}
              images={image ? [image] : ["/rag-results.png"]}
              background="bg-white"
            />
          );
        } else {
          return (
            <PDSectionLeft
              key={section.type}
              title={section.title}
              description={section.description || ''}
              achievements={achievements}
              images={image ? [image] : ["/rag-results.png"]}
              background="bg-white"
            />
          );
        }
      })}

    

      {/* 5. Keep In Mind Section */}
      <PDKeepInMind
        title="Keep in mind"
        description="What you see here is a snapshot - each project has layers of research, collaboration, and tough decisions that shaped the outcome. If something catches your eye, let's talk about how that experience translates to what you're working on."
      />
    </div>
  );
}
