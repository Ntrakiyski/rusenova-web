'use client';

import React from 'react';
import PDHero from './PDHero';
import PDTelenorIntro from './PDTelenorIntro';
import PDSelectedWork from './PDSelectedWork';
import PDSectionLeft from './PDSectionLeft';
import PDSectionRight from './PDSectionRight';
import PDKeepInMind from './PDKeepInMind';

interface TelenorFeature {
  title: string;
  description: string;
}

interface TelenorProjectItem {
  id: string;
  title: string;
  description: string;
  achievements: string[];
  images: string[];
  layout: 'text-left' | 'text-right';
}

interface TelenorSelectedWork {
  title: string;
  description: string;
}

interface TelenorCallout {
  title: string;
  description: string;
}

interface TelenorIntro {
  title: string;
  features: TelenorFeature[];
}

interface TelenorProject {
  id: string;
  title: string;
  subtitle: string;
  heroBackground: string;
  titleHighlight: string;
  intro: TelenorIntro;
  selectedWork: TelenorSelectedWork;
  projects: TelenorProjectItem[];
  callout: TelenorCallout;
}

interface TelenorProps {
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
    selectedWork: {
      title: string;
      description: string;
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

export default function Telenor({ projectData }: TelenorProps) {
  const {
    title,
    subtitle,
    heroBackground,
    titleHighlight,
    intro,
    selectedWork,
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

      {/* 2. Telenor Intro Section */}
      <PDTelenorIntro
        title={intro.title}
        features={intro.features}
      />

      {/* 3. Selected Work Section */}
      <PDSelectedWork
        title={selectedWork.title}
        description={selectedWork.description}
      />

      {/* 4. Project Sections - Use layout from project data */}
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

      {/* 5. Keep In Mind Section */}
      <PDKeepInMind
        title={callout.title}
        description={callout.description}
      />
    </div>
  );
}
