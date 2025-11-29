'use client';

import React from 'react';
import PDHero from './PDHero';
import PDNutshell from './PDNutshell';
import PDSectionLeft from './PDSectionLeft';
import PDSectionRight from './PDSectionRight';
import PDKeepInMind from './PDKeepInMind';

interface MentormateFeature {
  title: string;
  description: string;
}

interface MentormateProjectItem {
  id: string;
  title: string;
  description: string;
  achievements: string[];
  images: string[];
  layout: 'text-left' | 'text-right';
}

interface MentormateCallout {
  title: string;
  description: string;
}

interface MentormateIntro {
  title: string;
  features: MentormateFeature[];
}

interface MentormateProject {
  id: string;
  title: string;
  subtitle: string;
  heroBackground: string;
  titleHighlight: string;
  intro: MentormateIntro;
  projects: MentormateProjectItem[];
  callout: MentormateCallout;
}

interface MentormateProps {
  projectData: {
    id: string;
    title: string;
    subtitle: string;
    heroBackground: string;
    titleHighlight: string;
    intro: {
      title: string;
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

export default function Mentormate({ projectData }: MentormateProps) {
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

      {/* 3. Project Sections - Use layout from project data */}
      {fixedProjects.map((project) => {
        if (project.layout === 'text-left') {
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
