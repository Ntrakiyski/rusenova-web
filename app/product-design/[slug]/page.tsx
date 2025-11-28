import { notFound } from 'next/navigation';
import { getProductDesignProjects } from '@/app/utils/projectUtils';
import Tide from '@/app/components/projects/pd-sections/tide';
import Telenor from '@/app/components/projects/pd-sections/telenor';
import Epam from '@/app/components/projects/pd-sections/epam';
import Mentormate from '@/app/components/projects/pd-sections/mentormate';
import { Project } from '@/types/project';
import type { Metadata } from 'next';
import tideProjectData from '@/app/data/tide-project.json';
import telenorProjectData from '@/app/data/telenor-project.json';
import epamProjectData from '@/app/data/epam-project.json';
import serviceDesignProjectData from '@/app/data/service-design-project.json';

export function generateStaticParams() {
  const productDesignProjects = getProductDesignProjects();
  return productDesignProjects.map((project: Project) => ({
    slug: project.slug,
  }));
}

interface ProductDesignProjectParams {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDesignProjectPage({ params }: ProductDesignProjectParams) {
  const { slug } = await params;

  // Select the appropriate component based on the slug
  switch (slug) {
    case 'tide':
      return <Tide projectData={tideProjectData} />;
    case 'telenor':
      return <Telenor projectData={telenorProjectData} />;
    case 'epam':
      return <Epam projectData={epamProjectData} />;
    case 'mentormate':
      return <Mentormate projectData={serviceDesignProjectData} />;
    default:
      notFound();
  }
}

export const dynamicParams = false;