import { mlProjects } from '@/app/data/mlProjects';
import { productDesignProjects } from '@/app/data/productDesignProjects';
import { Project } from '@/types/project';

export function getAllProjects(): Project[] {
  return [...mlProjects, ...productDesignProjects];
}

export function getProjectBySlug(type: 'ml' | 'productdesign', slug: string): Project | undefined {
  const projects = type === 'ml' ? mlProjects : productDesignProjects;
  return projects.find(project => project.slug === slug);
}

export function getMLProjects(): Project[] {
  return mlProjects;
}

export function getProductDesignProjects(): Project[] {
  return productDesignProjects;
}