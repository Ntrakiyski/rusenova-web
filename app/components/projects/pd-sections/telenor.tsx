'use client';

import React from 'react';
import PDHero from './PDHero';
import PDTelenorIntro from './PDTelenorIntro';
import PDSelectedWork from './PDSelectedWork';
import PDSectionLeft from './PDSectionLeft';
import PDSectionRight from './PDSectionRight';
import PDKeepInMind from './PDKeepInMind';
import { Project, IntroSection } from '@/types/project';

interface TelenorProps {
  projectData: Project & {
    heroTitle?: string;
    heroDescription?: string;
    titleHighlight?: string;
    heroDescriptionHighlight?: string;
    heroBackground?: string;
  };
}

export default function Telenor({ projectData }: TelenorProps) {
  // Extract data from Project structure
  const introSection = projectData.sections.find((section): section is IntroSection => section.type === 'intro');
  const projectSections = projectData.sections.filter(section => section.type !== 'intro' && section.type !== 'tech-stack');

  return (
    <div className="min-h-screen w-full">
      {/* 1. Hero Header Section */}
      <PDHero
        title={(projectData.heroTitle || projectData.title) ?? ""}
        subtitle={(projectData.heroDescription || projectData.shortDescription) ?? ""}
        titleHighlight={projectData.titleHighlight || ''}
        descriptionHighlight={projectData.heroDescriptionHighlight || ''}
        background={projectData.heroBackground || 'bg-[#252222]'}
      />

      {/* 2. Telenor Intro Section */}
      {introSection && (
        <PDTelenorIntro
          title={introSection.title}
          row1Image={(introSection as { row1Image?: string }).row1Image || "/rag-results.png"}
          row2Image={(introSection as { row2Image?: string }).row2Image || "/rag-results.png"}
          features={Array.isArray(introSection.content) ? introSection.content.map((item: string | { title?: string; description?: string }) => ({
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
      {projectSections.map((section) => {
        const layout = section.layout || 'text-left';
        const achievements = (section as { achievements?: string[] }).achievements || [];
        const image = section.image;

        if (layout === 'text-left' || layout === 'text-left-image-right') {
          return (
            <PDSectionLeft
              key={section.type}
              title={section.title}
              description={section.description}
              achievements={achievements}
              images={image ? [image] : ["/rag-results.png"]}
              background="bg-[#f7f4ed]"
            />
          );
        } else {
          return (
            <PDSectionRight
              key={section.type}
              title={section.title}
              description={section.description}
              achievements={achievements}
              images={image ? [image] : ["/rag-results.png"]}
              background="bg-[#f7f4ed]"
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
