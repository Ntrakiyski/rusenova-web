'use client';

import React from 'react';
import { Project, IntroSection, ApproachSection, ArchitectureSection, ResultsSection } from '@/types/project';
import MLHero from './MLHero';
import MLWhatIBuild from './MLWhatIBuild';
import MLChallenge from './MLChallenge';
import MLApproach from './MLApproach';
import MLArchitecture from './MLArchitecture';
import MLResultsAndImpact from './MLResultsAndImpact';

interface RealTimeMeetingAgentProps {
  projectData: Project;
}

export default function RealTimeMeetingAgent({ projectData }: RealTimeMeetingAgentProps) {
  // Extract sections from project data with proper type checking
  const challengeSection = projectData.sections.find((section): section is IntroSection =>
    section.type === 'intro' && section.layout === 'text-left-image-right'
  );

  const approachSection = projectData.sections.find((section): section is ApproachSection =>
    section.type === 'approach'
  );

  const architectureSection = projectData.sections.find((section): section is ArchitectureSection =>
    section.type === 'architecture'
  );

  const resultsSection = projectData.sections.find((section): section is ResultsSection =>
    section.type === 'results'
  );

  return (
    <div className="bg-bg-white w-full min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <MLHero
        title={(projectData as any).heroTitle || projectData.title}
        subtitle={(projectData as any).heroDescription || projectData.shortDescription}
        heroImage={projectData.heroImage ?? "/rag-hero.png"}
        background={(projectData as any).heroBackground}
      />

      {/* What I Build Section */}
      <MLWhatIBuild
        title="What I Built"
        description={projectData.description || ''}
        metrics={projectData.metrics || []}
      />

      {/* Challenge Section */}
      {challengeSection && (
        <MLChallenge
          title={challengeSection.title}
          description={challengeSection.description}
          challenges={challengeSection.content}
        />
      )}

      {/* Approach Section */}
      {approachSection && (
        <MLApproach
          title={approachSection.title}
          description={approachSection.description}
          cards={approachSection.cards}
        />
      )}

      {/* Architecture Section */}
      {architectureSection && (
        <MLArchitecture
          title={architectureSection.title}
          description={architectureSection.description}
          image={architectureSection.image || '/rag-results.png'}
        />
      )}

      {/* Results & Impact Section */}
      {resultsSection && (
        <MLResultsAndImpact
          title={resultsSection.title}
          description={resultsSection.description}
          outcomes={resultsSection.outcomes}
          businessValue={resultsSection.businessValue}
          image={resultsSection.image}
        />
      )}
    </div>
  );
}
