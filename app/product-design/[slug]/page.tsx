import { notFound } from 'next/navigation';
import { productDesignProjects } from '@/app/data/productDesignProjects';
import Tide from '@/app/components/projects/pd-sections/tide';
import Telenor from '@/app/components/projects/pd-sections/telenor';
import Epam from '@/app/components/projects/pd-sections/epam';
import Mentormate from '@/app/components/projects/pd-sections/mentormate';
import { Project } from '@/types/project';

export function generateStaticParams() {
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

  // Find the project data from productDesignProjects.ts
  const projectData = productDesignProjects.find((project: Project) => project.slug === slug);
  
  if (!projectData) {
    notFound();
  }

  // Select the appropriate component based on the slug
  switch (slug) {
    case 'tide':
      return <Tide projectData={projectData} />;
    case 'telenor':
      return <Telenor projectData={projectData} />;
    case 'epam':
      return <Epam projectData={projectData} />;
    case 'mentormate':
      return <Mentormate projectData={projectData} />;
    default:
      notFound();
  }
}

export const dynamicParams = false;