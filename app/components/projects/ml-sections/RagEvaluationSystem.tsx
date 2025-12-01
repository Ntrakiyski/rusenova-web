'use client';

import React from 'react';
import { Project, WhatIBuildSection, IntroSection } from '@/types/project';
import MLHero from './MLHero';
import MLWhatIBuild from './MLWhatIBuild';
import MLChallenge from './MLChallenge';
import MLApproach from './MLApproach';
import MLArchitecture from './MLArchitecture';
import MLSectionWithBullets from './MLSectionWithBullets';
import MLResultsAndImpact from './MLResultsAndImpact';
import MLTechStack from './MLTechStack';

interface RagEvaluationSystemProps {
  projectData: Project;
  homeContentData?: {
    title: string;
    shortDescription: string;
  };
}

export default function RagEvaluationSystem({ projectData, homeContentData }: RagEvaluationSystemProps) {
  // Extract sections from project data
  const whatIBuildSection = projectData.sections.find((section): section is WhatIBuildSection =>
    section.type === 'what-i-build'
  ) as WhatIBuildSection | undefined;

  const challengeSection = projectData.sections.find((section): section is IntroSection =>
    section.type === 'intro' && section.layout === 'text-left-image-right'
  );

  const approachSection = projectData.sections.find((section): section is import('@/types/project').ApproachSection => section.type === 'approach');
  const architectureSection = projectData.sections.find((section): section is import('@/types/project').ArchitectureSection => section.type === 'architecture');
  const smartRetrievalSection = projectData.sections.find((section): section is import('@/types/project').SmartRetrievalSection => section.type === 'smart-retrieval');
  const evaluationSection = projectData.sections.find((section): section is import('@/types/project').EvaluationSection => section.type === 'evaluation');
  const productionSection = projectData.sections.find((section): section is import('@/types/project').ProductionSection => section.type === 'production');
  const resultsSection = projectData.sections.find((section): section is import('@/types/project').ResultsSection => section.type === 'results');
  const techStackSection = projectData.sections.find((section): section is import('@/types/project').TechStackSection => section.type === 'tech-stack');

  return (
    <div className="bg-bg-white w-full min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <MLHero
        title={projectData.title ?? (homeContentData?.title ?? "")}
        subtitle={projectData.shortDescription ?? (homeContentData?.shortDescription ?? "")}
        heroImage={projectData.heroImage ?? "/rag-hero.png"}
      />

      {/* What I Build Section */}
      {whatIBuildSection && (
        <MLWhatIBuild
          title={whatIBuildSection.title}
          description={whatIBuildSection.description}
          metrics={whatIBuildSection.metrics.map(m => ({
            ...m,
            icon: m.iconSvg ? (
              <div dangerouslySetInnerHTML={{ __html: m.iconSvg }} />
            ) : undefined,
            iconBg: m.iconBg
          }))}
          bulletPoints={whatIBuildSection.bulletPoints}
        />
      )}

      {/* Challenge Section */}
      {challengeSection && (
        <MLChallenge
          title={challengeSection.title}
          description={challengeSection.description}
          challenges={challengeSection.content}
          image={challengeSection.image}
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

      {/* Smart Retrieval System Section */}
      {smartRetrievalSection && (
        <MLSectionWithBullets
          title={smartRetrievalSection.title}
          description={smartRetrievalSection.description}
          items={smartRetrievalSection.items}
        />
      )}

      {/* Evaluation Framework Section */}
      {evaluationSection && (
        <MLSectionWithBullets
          title={evaluationSection.title}
          description={evaluationSection.description}
          items={evaluationSection.items}
        />
      )}

      {/* Production Architecture Section */}
      {productionSection && (
        <MLSectionWithBullets
          title={productionSection.title}
          description={productionSection.description}
          items={productionSection.items}
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

      {/* Tech Stack Section */}
      {techStackSection && (
        <MLTechStack
          title={techStackSection.title}
          description={techStackSection.description}
          technologies={techStackSection.technologies || []}
          categories={techStackSection.categories || []}
        />
      )}
    </div>
  );
}
