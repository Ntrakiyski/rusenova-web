'use client';

import React from 'react';
import PDHero from './PDHero';
import PDNutshell from './PDNutshell';
import PDSectionLeft from './PDSectionLeft';
import PDSectionRight from './PDSectionRight';
import PDKeepInMind from './PDKeepInMind';

interface EpamFeature {
  title: string;
  description: string;
}

interface EpamProjectItem {
  id: string;
  title: string;
  description: string;
  achievements: string[];
  images: string[];
  layout: 'text-left' | 'text-right';
}

interface EpamCallout {
  title: string;
  description: string;
}

interface EpamIntro {
  title: string;
  description: string;
  features: EpamFeature[];
}

interface EpamProject {
  id: string;
  title: string;
  subtitle: string;
  heroBackground: string;
  titleHighlight: string;
  intro: EpamIntro;
  projects: EpamProjectItem[];
  callout: EpamCallout;
}

interface EpamProps {
  projectData: {
    id: string;
    title: string;
    subtitle: string;
    heroBackground: string;
    titleHighlight: string;
    intro: {
      title: string;
      description: string;
      features: {
        title: string;
        description: string;
      }[];
    };
    projects: {
      id: string;
      title: string;
      description: string;
      achievements: string[];
      images: string[];
      layout: string;
    }[];
    callout: {
      title: string;
      description: string;
    };
  };
}

export default function Epam({ projectData }: EpamProps) {
  const {
    title,
    subtitle,
    heroBackground,
    titleHighlight,
    intro,
    projects,
    callout
  } = projectData;

  // Fix layout types for projects
  const fixedProjects = projects.map(project => ({
    ...project,
    layout: project.layout as 'text-left' | 'text-right'
  }));

  return (
    <div className="min-h-screen w-full">
      {/* 1. Hero Header Section */}
      <PDHero
        title={title}
        subtitle={subtitle}
        titleHighlight={titleHighlight}
        background={heroBackground}
      />

      {/* 2. Nutshell Section */}
      <PDNutshell
        title={intro.title}
        features={intro.features}
      />

      {/* 3. Project Sections - Pattern: image left, image right, image left */}
      {fixedProjects.map((project, index) => {
        // Pattern: 0: left (image left), 1: right (image right), 2: left (image left)
        if (index % 2 === 0) {
          return (
            <PDSectionLeft
              key={project.id}
              title={project.title}
              description={project.description}
              achievements={project.achievements}
              images={project.images}
              background="bg-[#f7f4ed]"
            />
          );
        } else {
          return (
            <PDSectionRight
              key={project.id}
              title={project.title}
              description={project.description}
              achievements={project.achievements}
              images={project.images}
              background="bg-[#f7f4ed]"
            />
          );
        }
      })}

      {/* 4. Keep In Mind Section */}
      <PDKeepInMind
        title={callout.title}
        description={callout.description}
      />
    </div>
  );
}
