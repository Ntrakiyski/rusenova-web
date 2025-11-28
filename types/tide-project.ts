/**
 * Type definitions for Tide project data
 */

export interface TideProjectFeature {
  title: string;
  description: string;
}

export interface TideProjectIntro {
  title: string;
  features: TideProjectFeature[];
}

export interface TideProjectSelectedWork {
  title: string;
  description: string;
}

export interface TideProject {
  id: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  heroBackground: string;
  intro: TideProjectIntro;
  selectedWork: TideProjectSelectedWork;
  projects: TideProjectItem[];
  callout: TideProjectCallout;
}

export interface TideProjectItem {
  id: string;
  title: string;
  description: string;
  achievements: string[];
  images: string[];
  layout: 'text-left' | 'text-right';
}

export interface TideProjectCallout {
  title: string;
  description: string;
}