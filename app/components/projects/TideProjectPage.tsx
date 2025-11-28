'use client';

import React from 'react';
import TideHeroSection from './TideHeroSection';
import TideIntroSection from './TideIntroSection';
import TideSelectedWorkSection from './TideSelectedWorkSection';
import TideTwoColumnProjectSection from './TideTwoColumnProjectSection';
import TideDarkCalloutSection from './TideDarkCalloutSection';
import { TideProject } from '@/types/tide-project';
import tideProjectData from '@/app/data/tide-project.json';

export default function TideProjectPage() {
  // Extract data from JSON
  const tideData = tideProjectData as TideProject;
  const {
    title,
    subtitle,
    heroBackground,
    titleHighlight,
    intro,
    selectedWork,
    callout
  } = tideData;

  // Fix layout types for projects
  const fixedProjects = tideData.projects.map(project => ({
    ...project,
    layout: project.layout as 'text-left' | 'text-right'
  }));

  return (
    <div className="min-h-screen">
      {/* 1. Hero Header Section */}
      <TideHeroSection
        title={title}
        subtitle={subtitle}
        titleHighlight={titleHighlight}
        background={heroBackground}
      />

      {/* 2. Intro Section */}
      <TideIntroSection
        title={intro.title}
        features={intro.features}
      />

      {/* 3. Selected Work Section */}
      <TideSelectedWorkSection
        title={selectedWork.title}
        description={selectedWork.description}
      />

      {/* 4. Communication Framework Project - Text Left, Image Right */}
      <TideTwoColumnProjectSection
        title={fixedProjects[0].title}
        description={fixedProjects[0].description}
        achievements={fixedProjects[0].achievements}
        images={fixedProjects[0].images}
        layout={fixedProjects[0].layout}
        background="bg-[#f7f4ed]"
      />

      {/* 5. Admin Project - Text Left, Image Right */}
      <TideTwoColumnProjectSection
        title={fixedProjects[1].title}
        description={fixedProjects[1].description}
        achievements={fixedProjects[1].achievements}
        images={fixedProjects[1].images}
        layout={fixedProjects[1].layout}
        background="bg-[#f7f4ed]"
      />

      {/* 6. Home Page Redesign Project - Text Right, Image Left */}
      <TideTwoColumnProjectSection
        title={fixedProjects[2].title}
        description={fixedProjects[2].description}
        achievements={fixedProjects[2].achievements}
        images={fixedProjects[2].images}
        layout={fixedProjects[2].layout}
        background="bg-[#f7f4ed]"
      />

      {/* 7. Dark Callout Section */}
      <TideDarkCalloutSection
        title={callout.title}
        description={callout.description}
      />
    </div>
  );
}