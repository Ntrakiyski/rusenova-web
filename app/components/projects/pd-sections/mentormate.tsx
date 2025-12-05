'use client';

import React from 'react';
import PDHero from './PDHero';
import PDNutshell from './PDNutshell';
import PDSectionLeft from './PDSectionLeft';
import PDSectionRight from './PDSectionRight';
import PDKeepInMind from './PDKeepInMind';
import { Project, IntroSection } from '@/types/project';

interface MentormateProps {
  projectData: Project;
}

export default function Mentormate({ projectData }: MentormateProps) {
  // Extract data from Project structure
  const introSection = projectData.sections.find((section): section is IntroSection => section.type === 'intro');
  const projectSections = projectData.sections.filter(section => section.type !== 'intro' && section.type !== 'tech-stack');

  return (
    <div className="min-h-screen w-full">
      {/* 1. Hero Header Section */}
      <PDHero
        title={(projectData as any).heroTitle || projectData.title}
        subtitle={(projectData as any).heroDescription || projectData.shortDescription}
        titleHighlight={(projectData as any).titleHighlight || ''}
        descriptionHighlight={(projectData as any).heroDescriptionHighlight || ''}
        background={(projectData as any).heroBackground || 'bg-bg-dark'}
      />

      {/* 2. Nutshell Section */}
      {introSection && (
        <PDNutshell
          title={introSection.title}
          features={Array.isArray(introSection.content) ? introSection.content.map((item: any) => ({
            title: typeof item === 'string' ? '' : (item.title || ''),
            description: typeof item === 'string' ? item : (item.description || '')
          })) : []}
        />
      )}

      {/* 3. Project Sections */}
      {projectSections.map((section) => {
        const layout = section.layout || 'text-left';
        const achievements = (section as any).achievements || [];
        const image = section.image;

        if (layout === 'text-left' || layout === 'text-left-image-right') {
          return (
            <PDSectionLeft
              key={section.type}
              title={section.title}
              description={section.description || ''}
              achievements={achievements}
              images={image ? [image] : ["/rag-results.png"]}
              background="bg-bg-light"
            />
          );
        } else {
          return (
            <PDSectionRight
              key={section.type}
              title={section.title}
              description={section.description || ''}
              achievements={achievements}
              images={image ? [image] : ["/rag-results.png"]}
              background="bg-bg-light"
            />
          );
        }
      })}

      {/* 4. Keep In Mind Section */}
      <PDKeepInMind
        title="Keep in mind"
        description="What you see here is a snapshot - each project has layers of research, collaboration, and tough decisions that shaped the outcome. If something catches your eye, let's talk about how that experience translates to what you're working on."
      />
    </div>
  );
}
