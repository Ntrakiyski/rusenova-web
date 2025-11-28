'use client';

import React from 'react';
import PDHero from './PDHero';
import PDNutshell from './PDNutshell';
import PDSelectedWork from './PDSelectedWork';
import PDSectionLeft from './PDSectionLeft';
import PDSectionRight from './PDSectionRight';
import PDKeepInMind from './PDKeepInMind';

interface TideFeature {
  title: string;
  description: string;
}

interface TideProjectItem {
  id: string;
  title: string;
  description: string;
  achievements: string[];
  images: string[];
  layout: 'text-left' | 'text-right';
}

interface TideSelectedWork {
  title: string;
  description: string;
}

interface TideCallout {
  title: string;
  description: string;
}

interface TideIntro {
  title: string;
  features: TideFeature[];
}

interface TideProject {
  id: string;
  title: string;
  subtitle: string;
  heroBackground: string;
  titleHighlight: string;
  intro: TideIntro;
  selectedWork: TideSelectedWork;
  projects: TideProjectItem[];
  callout: TideCallout;
}

interface TideProps {
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

export default function Tide({ projectData }: TideProps) {
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
    <div className="min-h-screen">
      {/* 1. Hero Header Section */}
      <PDHero
        title={title}
        subtitle={subtitle}
        titleHighlight={titleHighlight}
        background={heroBackground}
      />

      {/* 2. Intro Section */}
      <PDNutshell
        title={intro.title}
        features={intro.features}
      />

      {/* 3. Selected Work Section */}
      <PDSelectedWork
        title={selectedWork.title}
        description={selectedWork.description}
      />

      {/* 4. Project Sections - Pattern: image left, image right, image left */}
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

      {/* 5. Dark Callout Section */}
      <PDKeepInMind
        title={callout.title}
        description={callout.description}
      />
    </div>
  );
}