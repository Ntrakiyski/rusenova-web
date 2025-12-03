'use client';

import React from 'react';
import {
  Project,
  IntroSection,
  ApproachSection,
  ArchitectureSection,
  ResultsSection,
  WhatIBuildSection,
  SectionWithCards,
  SectionWithCardsAndBullets,
  SectionWithTable,
  KeyResultsOnlySection,
  TechnicalPerformanceSection,
  CostBenefitSection,
  SegmentAnalysisSection,
  KeyLearningSection,
  ProductionDeploymentSection,
  TechStackSection,
} from '@/types/project';
import MLHero from './MLHero';
import MLWhatIBuild from './MLWhatIBuild';
import MLChallenge from './MLChallenge';
import MLApproach from './MLApproach';
import MLArchitecture from './MLArchitecture';
import MLResultsAndImpact from './MLResultsAndImpact';
import MLSectionWithCards from './MLSectionWithCards';
import MLSectionWithCardsAndBullets from './MLSectionWithCardsAndBullets';
import MLSectionWithTable from './MLSectionWithTable';
import MLKeyResultsOnly from './MLKeyResultsOnly';
import MLTechnicalPerformance from './MLTechnicalPerformance';
import MLCostBenefit from './MLCostBenefit';
import MLSegmentAnalysis from './MLSegmentAnalysis';
import MLKeyLearning from './MLKeyLearning';
import MLProductionDeployment from './MLProductionDeployment';
import MLTechStack from './MLTechStack';

interface RealTimeMeetingAgentProps {
  projectData: Project;
}

export default function RealTimeMeetingAgent({ projectData }: RealTimeMeetingAgentProps) {
  const whatIBuildSection = projectData.sections.find((section): section is WhatIBuildSection =>
    section.type === 'what-i-build'
  ) as WhatIBuildSection | undefined;

  const introSection = projectData.sections.find((section): section is IntroSection =>
    section.type === 'intro'
  ) as IntroSection | undefined;

  const approachSection = projectData.sections.find((section): section is ApproachSection =>
    section.type === 'approach'
  ) as ApproachSection | undefined;

  const architectureSection = projectData.sections.find((section): section is ArchitectureSection =>
    section.type === 'architecture'
  ) as ArchitectureSection | undefined;

  const sectionWithCards = projectData.sections.find((section): section is SectionWithCards =>
    section.type === 'section-with-cards'
  ) as SectionWithCards | undefined;

  const sectionWithCardsAndBullets = projectData.sections.find((section): section is SectionWithCardsAndBullets =>
    section.type === 'section-with-cards-and-bullets'
  ) as SectionWithCardsAndBullets | undefined;

  const sectionWithTable = projectData.sections.find((section): section is SectionWithTable =>
    section.type === 'section-with-table'
  ) as SectionWithTable | undefined;

  const keyResultsSection = projectData.sections.find((section): section is KeyResultsOnlySection =>
    section.type === 'key-results-only'
  ) as KeyResultsOnlySection | undefined;

  const technicalPerformanceSection = projectData.sections.find((section): section is TechnicalPerformanceSection =>
    section.type === 'technical-performance'
  ) as TechnicalPerformanceSection | undefined;

  const costBenefitSection = projectData.sections.find((section): section is CostBenefitSection =>
    section.type === 'cost-benefit'
  ) as CostBenefitSection | undefined;

  const segmentAnalysisSection = projectData.sections.find((section): section is SegmentAnalysisSection =>
    section.type === 'segment-analysis'
  ) as SegmentAnalysisSection | undefined;

  const keyLearningSection = projectData.sections.find((section): section is KeyLearningSection =>
    section.type === 'key-learning'
  ) as KeyLearningSection | undefined;

  const techStackSection = projectData.sections.find((section): section is TechStackSection =>
    section.type === 'tech-stack'
  ) as TechStackSection | undefined;

  const productionDeploymentSection = projectData.sections.find((section): section is ProductionDeploymentSection =>
    section.type === 'production-deployment'
  ) as ProductionDeploymentSection | undefined;

  const resultsSection = projectData.sections.find((section): section is ResultsSection =>
    section.type === 'results'
  ) as ResultsSection | undefined;

  return (
    <div className="bg-bg-white w-full min-h-screen relative overflow-x-hidden">
      <MLHero
        title={(projectData as any).heroTitle || projectData.title || ''}
        subtitle={(projectData as any).heroDescription || projectData.shortDescription || ''}
        heroImage={projectData.heroImage ?? '/rag-hero.png'}
        heroVideo={projectData.heroVideo}
        decorationImage={keyResultsSection?.image || '/rag-results.png'}
        background={(projectData as any).heroBackground}
      />

      {whatIBuildSection ? (
        <MLWhatIBuild
          title={whatIBuildSection.title}
          description={whatIBuildSection.description}
          metrics={whatIBuildSection.metrics.map(m => ({
            ...m,
            iconBg: m.iconBg,
          }))}
          bulletPoints={whatIBuildSection.bulletPoints}
        />
      ) : (
        <MLWhatIBuild
          title="What I Built"
          description={projectData.description || ''}
          metrics={projectData.metrics || []}
        />
      )}

      {introSection && (
        <MLChallenge
          title={introSection.title}
          description={introSection.description}
          challenges={introSection.content}
          image={introSection.image}
        />
      )}

      {approachSection && (
        <MLApproach
          title={approachSection.title}
          description={approachSection.description}
          cards={approachSection.cards}
        />
      )}

      {sectionWithCards && (
        <MLSectionWithCards
          title={sectionWithCards.title}
          description={sectionWithCards.description}
          cards={sectionWithCards.cards.map(card => ({
            ...card,
            icon: card.icon && card.icon.startsWith('/')
              ? (<img src={card.icon} alt="" className="w-6 h-6" />)
              : card.icon
                ? (<div dangerouslySetInnerHTML={{ __html: card.icon }} />)
                : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#155DFC" strokeWidth="2"/>
                  </svg>
                ),
            bg: card.bg,
          }))}
        />
      )}

      {sectionWithCardsAndBullets && (
        <MLSectionWithCardsAndBullets
          title={sectionWithCardsAndBullets.title}
          description={sectionWithCardsAndBullets.description}
          cards={sectionWithCardsAndBullets.cards}
        />
      )}

      {sectionWithTable && (
        <MLSectionWithTable
          title={sectionWithTable.title}
          description={sectionWithTable.description}
          columns={sectionWithTable.columns}
          rows={sectionWithTable.rows}
        />
      )}

      {keyResultsSection && (
        <MLKeyResultsOnly
          title={keyResultsSection.title}
          description={keyResultsSection.description}
          image={keyResultsSection.image}
          video={keyResultsSection.video}
        />
      )}

      {technicalPerformanceSection && (
        <MLTechnicalPerformance
          title={technicalPerformanceSection.title}
          description={technicalPerformanceSection.description}
          metrics={technicalPerformanceSection.metrics}
        />
      )}

      {costBenefitSection && (
        <MLCostBenefit
          title={costBenefitSection.title}
          description={costBenefitSection.description}
          items={costBenefitSection.items}
        />
      )}

      {segmentAnalysisSection && (
        <MLSegmentAnalysis
          title={segmentAnalysisSection.title}
          description={segmentAnalysisSection.description}
          segments={segmentAnalysisSection.segments}
        />
      )}

      {keyLearningSection && (
        <MLKeyLearning
          title={keyLearningSection.title}
          description={keyLearningSection.description}
          learnings={keyLearningSection.learnings}
        />
      )}

      {techStackSection && (
        <MLTechStack
          title={techStackSection.title}
          description={techStackSection.description}
          technologies={techStackSection.technologies || []}
          categories={techStackSection.categories || []}
        />
      )}

      {productionDeploymentSection && (
        <MLProductionDeployment
          title={productionDeploymentSection.title}
          description={productionDeploymentSection.description}
          cards={productionDeploymentSection.cards}
        />
      )}

      {architectureSection && (
        <MLArchitecture
          title={architectureSection.title}
          description={architectureSection.description}
          image={architectureSection.image || '/rag-results.png'}
        />
      )}

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
