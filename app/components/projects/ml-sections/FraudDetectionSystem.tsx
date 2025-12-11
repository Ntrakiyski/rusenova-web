'use client';

import { Project, WhatIBuildSection, SectionWithCards, SectionWithCardsAndBullets, SectionWithTable, KeyResultsOnlySection, TechnicalPerformanceSection, CostBenefitSection, SegmentAnalysisSection, KeyLearningSection, ProductionDeploymentSection, TechStackSection, ApproachSection } from '@/types/project';
import MLHero from './MLHero';
import MLWhatIBuild from './MLWhatIBuild';
import MLApproach from './MLApproach';
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
import MLMoreProjects from './MLMoreProjects';


interface FraudDetectionSystemProps {
  projectData: Project;
}

export default function FraudDetectionSystem({ projectData }: FraudDetectionSystemProps) {
  // Extract sections from project data with proper type checking
  const whatIBuildSection = projectData.sections.find((section): section is WhatIBuildSection =>
    section.type === 'what-i-build'
  ) as WhatIBuildSection | undefined;

  const approachSection = projectData.sections.find((section): section is ApproachSection =>
    section.type === 'approach'
  ) as ApproachSection | undefined;

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

  return (
    <div className="bg-bg-white w-full min-h-screen relative overflow-x-hidden">
      {/* ML-Hero Section */}
      <MLHero
        title={(projectData as any).heroTitle || projectData.title}
        subtitle={(projectData as any).heroDescription || projectData.shortDescription}
        heroImage={projectData.heroImage ?? "/rag-hero.png"}
        heroVideo={projectData.heroVideo}
        metrics={(projectData as any).metrics || []}
      />

      {/* ML-What I Build Section */}
      {whatIBuildSection && (
        <MLWhatIBuild
          title={whatIBuildSection.title}
          metrics={whatIBuildSection.metrics?.map(m => ({
            ...m,
            icon: m.iconSvg ? (
              <div dangerouslySetInnerHTML={{ __html: m.iconSvg }} />
            ) : undefined,
            iconBg: m.iconBg
          })) || []}
          bulletPoints={whatIBuildSection.bulletPoints}
          showImage={false}
          image={whatIBuildSection.image}
          boldWords={whatIBuildSection.boldWords}
        />
      )}

      {/* ML-Approach Section */}
      {approachSection && (
        <MLApproach
          title={approachSection.title}
          description={approachSection.description}
          cards={approachSection.cards}
        />
      )}

      {/* ML-Section with 3 cards */}
      {sectionWithCards && (
        <MLSectionWithCards
          title={sectionWithCards.title}
          description={sectionWithCards.description}
          cards={sectionWithCards.cards.map(card => ({
            ...card,
            icon: card.icon && card.icon.startsWith('/') ? (
              <img src={card.icon} alt="" className="w-6 h-6" />
            ) : card.icon ? (
              <div dangerouslySetInnerHTML={{ __html: card.icon }} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#155DFC" strokeWidth="2"/>
              </svg>
            ),
            bg: card.bg
          }))}
        />
      )}

      {/* ML-Section with 3 cards and bullets */}
      {sectionWithCardsAndBullets && (
        <MLSectionWithCardsAndBullets
          title={sectionWithCardsAndBullets.title}
          description={sectionWithCardsAndBullets.description}
          cards={sectionWithCardsAndBullets.cards}
        />
      )}

      {/* ML-Section with table */}
      {sectionWithTable && (
        <MLSectionWithTable
          title={sectionWithTable.title}
          description={sectionWithTable.description}
          columns={sectionWithTable.columns}
          rows={sectionWithTable.rows}
        />
      )}

      {/* ML-Section with results only */}
      {keyResultsSection && (
        <MLKeyResultsOnly
          title={keyResultsSection.title}
          description={keyResultsSection.description}
          image={keyResultsSection.image}
          video={keyResultsSection.video}
        />
      )}

     

         {/* ML-Cost-Benefit */}
         {costBenefitSection && (
        <MLCostBenefit
          title={costBenefitSection.title}
          description={costBenefitSection.description}
          items={costBenefitSection.items}
        />
      )}

       {/* ML-Technical Performance */}
       {technicalPerformanceSection && (
        <MLTechnicalPerformance
          title={technicalPerformanceSection.title}
          description={technicalPerformanceSection.description}
          metrics={technicalPerformanceSection.metrics}
        />
      )}

        {/* ML-Segment Analysis */}
        {segmentAnalysisSection && (
        <MLSegmentAnalysis
          title={segmentAnalysisSection.title}
          description={segmentAnalysisSection.description}
          items={segmentAnalysisSection.items}
        />
      )}

      

         {/* ML-Key Learning */}
         {keyLearningSection && (
        <MLKeyLearning
          title={keyLearningSection.title}
          learnings={keyLearningSection.learnings}
          boldWords={keyLearningSection.learnings.map(l => l.boldWords || '').filter(Boolean)}
          image={keyLearningSection.image}
          showImage={true}
      />
      )}

   

  

      {/* ML-TechStack */}
      {techStackSection && (
        <MLTechStack
          title={techStackSection.title}
          description={techStackSection.description}
          technologies={techStackSection.technologies || []}
          categories={techStackSection.categories || []}
        />
      )}

      {/* ML-Production Deployment */}
      {/* {productionDeploymentSection && (
        <MLProductionDeployment
          title={productionDeploymentSection.title}
          description={productionDeploymentSection.description}
          cards={productionDeploymentSection.cards}
        />
      )} */}

      {/* More Projects Section */}
      <MLMoreProjects 
        currentSlug="fraud-detection-system"
      />
    </div>
  );
}