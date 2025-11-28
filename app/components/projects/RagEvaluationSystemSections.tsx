'use client';

import { ProjectSection, GenericSection } from '@/types/project';
import ProjectSectionComponent from './ProjectSection';
import ragEvaluationSystemData from '@/app/data/rag-evaluation-system.json';

interface RagEvaluationSystemSectionsProps {
  sectionTypes?: string[];
}

export default function RagEvaluationSystemSections({ sectionTypes }: RagEvaluationSystemSectionsProps) {
  // Convert JSON sections to ProjectSection format
  const sections: ProjectSection[] = [];

  // Hero section (not visible in main content, handled separately)
  if (ragEvaluationSystemData.sections.hero.visible) {
    // Hero is handled by ProjectHero component
  }

  // Intro section is now handled by ProjectIntroSection component

  // Challenge section is now handled by ChallengeSection component

  // Approach section is now handled by ApproachSection component

  // Architecture and one card sections are now handled by SectionWithBullets component

  // Results and Impact section
  if (ragEvaluationSystemData.sections.resultsAndImpact.visible) {
    const resultsData = ragEvaluationSystemData.sections.resultsAndImpact.data;
    sections.push({
      type: 'results',
      title: resultsData.title,
      description: resultsData.subtitle,
      image: '/rag-results.png', // Using the same image as in the current data
      outcomes: resultsData.cards.find(card => card.title === "Quantifiable Outcomes")?.items || [],
      businessValue: resultsData.cards.find(card => card.title === "Business Value")?.items || []
    });
  }

  // Tech Stack section is now handled by TechStackSection component in ProjectPage

  // Filter sections if sectionTypes is provided
  const filteredSections = sectionTypes
    ? sections.filter(section => sectionTypes.includes(section.type))
    : sections;

  return (
    <>
      {filteredSections.map((section, index) => (
        <ProjectSectionComponent key={index} section={section} />
      ))}
    </>
  );
}