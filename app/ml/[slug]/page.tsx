import { notFound } from 'next/navigation';
import { getProjectBySlug, getMLProjects, getMLProjectFromHomeContent } from '@/app/utils/projectUtils';
import { Project } from '@/types/project';
import type { Metadata } from 'next';
import RagEvaluationSystem from '@/app/components/projects/ml-sections/RagEvaluationSystem';
import FraudDetectionSystem from '@/app/components/projects/ml-sections/FraudDetectionSystem';
import RealTimeMeetingAgent from '@/app/components/projects/ml-sections/RealTimeMeetingAgent';

export function generateStaticParams() {
  const mlProjects = getMLProjects();
  return mlProjects.map((project: Project) => ({
    slug: project.slug,
  }));
}

interface MLProjectParams {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MLProjectPage({ params }: MLProjectParams) {
  const { slug } = await params;
  const project = getProjectBySlug('ml', slug);
  const homeContentProject = getMLProjectFromHomeContent(slug);

  if (!project) {
    notFound();
  }

  // Select the appropriate component based on the slug
  switch (slug) {
    case 'rag-evaluation-system':
      return <RagEvaluationSystem projectData={project} homeContentData={homeContentProject} />;
    case 'fraud-detection-system':
      return <FraudDetectionSystem projectData={project} />;
    case 'ai-meeting-assistant':
      return <RealTimeMeetingAgent projectData={project} />;
    default:
      notFound();
  }
}

export const dynamicParams = false;
