export interface Metric {
  value: string;
  label: string;
}

export interface ProjectCard {
  title: string;
  description: string;
}

export interface ProjectFeature {
  type: 'feature';
  title: string;
  description: string;
}

export interface BaseProjectSection {
  type: string;
  title: string;
  description: string;
  layout?: 'text-left-image-right' | 'image-left-text-right' | 'text-only' | 'centered' | 'text-left' | 'text-right';
  image?: string;
}

export interface IntroSection extends BaseProjectSection {
  type: 'intro';
  content: string[] | ProjectFeature[];
}

export interface ApproachSection extends BaseProjectSection {
  type: 'approach';
  cards: ProjectCard[];
}

export interface ArchitectureSection extends BaseProjectSection {
  type: 'architecture';
}

export interface SmartRetrievalSection extends BaseProjectSection {
  type: 'smart-retrieval';
  items: string[];
}

export interface EvaluationSection extends BaseProjectSection {
  type: 'evaluation';
  items: string[];
}

export interface ProductionSection extends BaseProjectSection {
  type: 'production';
  items: string[];
}

export interface TechStackSection extends BaseProjectSection {
  type: 'tech-stack';
  items?: string[];
  technologies?: string[];
  categories?: string[];
}

export interface ResultsSection extends BaseProjectSection {
  type: 'results';
  outcomes: string[];
  businessValue: string[];
}

export interface WhatIBuildSection extends Omit<BaseProjectSection, 'type'> {
  type: 'what-i-build';
  metrics: Metric[];
}

export interface SectionWithCards extends Omit<BaseProjectSection, 'type'> {
  type: 'section-with-cards';
  cards: Array<{
    title: string;
    description: string;
    icon?: string; // SVG content as string (not used in current implementation - using static file.svg)
  }>;
}

export interface SectionWithCardsAndBullets extends Omit<BaseProjectSection, 'type'> {
  type: 'section-with-cards-and-bullets';
  cards: Array<{
    title: string;
    items: string[];
  }>;
}

export interface SectionWithTable extends Omit<BaseProjectSection, 'type'> {
  type: 'section-with-table';
  columns: string[];
  rows: Array<Record<string, string>>;
}

export interface KeyResultsOnlySection extends Omit<BaseProjectSection, 'type'> {
  type: 'key-results-only';
  image: string;
}

export interface TechnicalPerformanceSection extends Omit<BaseProjectSection, 'type'> {
  type: 'technical-performance';
  metrics: Array<{
    name: string;
    value: string;
    description: string;
    details?: string;
  }>;
}

export interface CostBenefitSection extends Omit<BaseProjectSection, 'type'> {
  type: 'cost-benefit';
  items: Array<{
    title: string;
    content: string | string[];
  }>;
}

export interface SegmentAnalysisSection extends Omit<BaseProjectSection, 'type'> {
  type: 'segment-analysis';
  segments: Array<{
    name: string;
    metrics: Array<{
      name: string;
      value: string;
    }>;
  }>;
}

export interface KeyLearningSection extends Omit<BaseProjectSection, 'type'> {
  type: 'key-learning';
  learnings: Array<{
    title: string;
    description: string;
  }>;
}

export interface ProductionDeploymentSection extends Omit<BaseProjectSection, 'type'> {
  type: 'production-deployment';
  cards: Array<{
    title: string;
    icon?: string; // SVG content as string (not used in current implementation - using static file.svg)
    bullets: string[];
  }>;
}

export interface GenericSection extends BaseProjectSection {
  type: string;
  content?: string[] | ProjectFeature[];
  achievements?: string[];
  items?: string[];
  cards?: ProjectCard[];
}

export type ProjectSection =
  | IntroSection
  | ApproachSection
  | ArchitectureSection
  | SmartRetrievalSection
  | EvaluationSection
  | ProductionSection
  | TechStackSection
  | ResultsSection
  | WhatIBuildSection
  | SectionWithCards
  | SectionWithCardsAndBullets
  | SectionWithTable
  | KeyResultsOnlySection
  | TechnicalPerformanceSection
  | CostBenefitSection
  | SegmentAnalysisSection
  | KeyLearningSection
  | ProductionDeploymentSection
  | GenericSection;

export interface Project {
  id: string;
  slug: string;
  title: string;
  company?: string;
  role?: string;
  shortDescription: string;
  description?: string;
  metrics: Metric[];
  gradientColors: string[];
  heroImage: string;
  sections: ProjectSection[];
}

// Home Page Content Interfaces
export interface HomeContent {
  meta: {
    version: string;
    lastUpdated: string;
  };
  
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: {
      primary: string;
      secondary: string;
      accent: string;
      muted: string;
    };
    border: string;
  };
  
  hero: {
    backgroundColor: string;
    badge: string;
    title: string;
    subtitle: string;
    buttons: Array<{
      text: string;
      link: string;
      style: 'primary' | 'secondary';
    }>;
    image: {
      src: string;
      alt: string;
    };
  };
  
  services: {
    title: string;
    items: string[];
  };
  
  features: {
    backgroundColor: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  about: {
    backgroundColor: string;
    badge: string;
    title: string;
    paragraphs: string[];
    stats: Array<{
      value: string;
      label: string;
    }>;
    image: {
      src: string;
      alt: string;
    };
  };
  
  contact: {
    title: string;
    subtitle: string;
    email: string;
    linkedin: string;
    opportunities: string[][];
  };
  
  footer: {
    backgroundColor: string;
    brand: {
      name: string;
      description: string;
    };
    social: Array<{
      platform: string;
      url: string;
      ariaLabel: string;
    }>;
    sections: Array<{
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
    legal: {
      copyright: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    };
  };
}
