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