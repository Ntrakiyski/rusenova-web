'use client';

import { Project } from '@/types/project';
import ProjectHero from '@/app/components/projects/ProjectHero';
import ProjectSection from '@/app/components/projects/ProjectSection';
import ProjectIntroSection from '@/app/components/projects/ProjectIntroSection';
import ApproachSection from '@/app/components/projects/ApproachSection';
import ChallengeSection from '@/app/components/projects/ChallengeSection';
import SectionWithBullets from '@/app/components/projects/SectionWithBullets';
import TechStackSection from '@/app/components/projects/TechStackSection';
import RagEvaluationSystemSections from '@/app/components/projects/RagEvaluationSystemSections';

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <div className="bg-white w-full min-h-screen relative overflow-x-hidden">
      {/* Project Hero Section */}
      <ProjectHero project={project} />

      {/* Project Intro Section - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' && (
        <ProjectIntroSection project={project} />
      )}

      {/* Project Approach Section - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' && (
        <ApproachSection project={project} />
      )}

      {/* Project Challenge Section - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' && (
        <ChallengeSection project={project} />
      )}

      {/* Project Architecture Section - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' && (
        <SectionWithBullets
          project={project}
          sectionType="architecture"
          imagePosition="left"
        />
      )}

      {/* Project Smart Retrieval Section - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' && (
        <SectionWithBullets
          project={project}
          sectionType="smart-retrieval"
          gradientFromColor="#F44D2E"
          gradientViaColor="#C1ABD8"
          gradientToColor="#F7F4ED"
        />
      )}

      {/* Project Evaluation Section - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' && (
        <SectionWithBullets
          project={project}
          sectionType="evaluation"
          gradientFromColor="#7F56D9"
          gradientViaColor="#A8C5E5"
          gradientToColor="#F7F4ED"
        />
      )}

      {/* Project Production Section - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' && (
        <SectionWithBullets
          project={project}
          sectionType="production"
          gradientFromColor="#F44D2E"
          gradientViaColor="#F0844C"
          gradientToColor="#F7F4ED"
        />
      )}

      {/* Project Tech Stack Section - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' && (
        <TechStackSection project={project} />
      )}

      {/* Project Sections - Special handling for RAG Evaluation System */}
      {project.slug === 'rag-evaluation-system' ? (
        <RagEvaluationSystemSections />
      ) : (
        project.sections?.map((section, index) => (
          <ProjectSection key={`section-${index}`} section={section} />
        ))
      )}
    </div>
  );
}