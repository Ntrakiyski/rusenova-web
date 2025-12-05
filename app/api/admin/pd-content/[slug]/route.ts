import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { productDesignProjects } from '@/app/data/productDesignProjects';

// Import types from the project types file
import type { Project, ProjectSection, Metric, IntroSection, ApproachSection, ArchitectureSection, SmartRetrievalSection, EvaluationSection, ProductionSection, TechStackSection, ResultsSection, WhatIBuildSection, SectionWithCards, SectionWithCardsAndBullets, SectionWithTable, KeyResultsOnlySection, TechnicalPerformanceSection, CostBenefitSection, SegmentAnalysisSection, KeyLearningSection, ProductionDeploymentSection, GenericSection } from '@/types/project';

// Zod schemas for validation (same as in main route.ts)

const MetricSchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  iconSvg: z.string().optional(),
  iconBg: z.string().optional(),
}).strict();

const ProjectFeatureSchema = z.object({
  type: z.literal('feature'),
  title: z.string(),
  description: z.string(),
}).strict();

const BaseProjectSectionSchema = z.object({
  type: z.string(),
  title: z.string(),
  description: z.string(),
  layout: z.enum(['text-left-image-right', 'image-left-text-right', 'text-only', 'centered', 'text-left', 'text-right']).optional(),
  image: z.string().optional(),
}).strict();

const IntroSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('intro'),
  content: z.union([z.array(z.string()), z.array(ProjectFeatureSchema)]),
  row1Image: z.string().optional(),
  row2Image: z.string().optional(),
}).strict();

const ApproachSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('approach'),
  cards: z.array(z.object({
    title: z.string(),
    description: z.string(),
  }).strict()),
}).strict();

const ArchitectureSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('architecture'),
}).strict();

const SmartRetrievalSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('smart-retrieval'),
  items: z.array(z.string()),
}).strict();

const EvaluationSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('evaluation'),
  items: z.array(z.string()),
}).strict();

const ProductionSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('production'),
  items: z.array(z.string()),
}).strict();

const TechStackSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('tech-stack'),
  items: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
}).strict();

const ResultsSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('results'),
  outcomes: z.array(z.string()),
  businessValue: z.array(z.string()),
  video: z.string().optional(),
}).strict();

const WhatIBuildSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('what-i-build'),
  metrics: z.array(MetricSchema),
  bulletPoints: z.array(z.string()).optional(),
  image: z.string().optional(),
}).strict();

const SectionWithCardsSchema = BaseProjectSectionSchema.extend({
  type: z.literal('section-with-cards'),
  cards: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    bg: z.string().optional(),
  }).strict()),
}).strict();

const SectionWithCardsAndBulletsSchema = BaseProjectSectionSchema.extend({
  type: z.literal('section-with-cards-and-bullets'),
  cards: z.array(z.object({
    title: z.string(),
    items: z.array(z.string()),
    icon: z.string().optional(),
    bg: z.string().optional(),
  }).strict()),
}).strict();

const SectionWithTableSchema = BaseProjectSectionSchema.extend({
  type: z.literal('section-with-table'),
  columns: z.array(z.string()),
  rows: z.array(z.record(z.string(), z.string())),
}).strict();

const KeyResultsOnlySectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('key-results-only'),
  image: z.string(),
  video: z.string().optional(),
}).strict();

const TechnicalPerformanceSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('technical-performance'),
  metrics: z.array(z.object({
    name: z.string(),
    value: z.string(),
    description: z.string(),
    details: z.string().optional(),
  }).strict()),
}).strict();

const CostBenefitSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('cost-benefit'),
  items: z.array(z.object({
    title: z.string(),
    content: z.union([z.string(), z.array(z.string())]),
  }).strict()),
}).strict();

const SegmentAnalysisSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('segment-analysis'),
  segments: z.array(z.object({
    name: z.string(),
    metrics: z.array(z.object({
      name: z.string(),
      value: z.string(),
    }).strict()),
  }).strict()),
}).strict();

const KeyLearningSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('key-learning'),
  learnings: z.array(z.object({
    title: z.string(),
    description: z.string(),
  }).strict()),
}).strict();

const ProductionDeploymentSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('production-deployment'),
  cards: z.array(z.object({
    title: z.string(),
    icon: z.string().optional(), // SVG content as string (not used in current implementation - using static file.svg)
    bullets: z.array(z.string()),
  }).strict()),
}).strict();

const GenericSectionSchema = BaseProjectSectionSchema.extend({
  type: z.string(),
  content: z.union([z.array(z.string()), z.array(ProjectFeatureSchema)]).optional(),
  achievements: z.array(z.string()).optional(),
  items: z.array(z.string()).optional(),
  cards: z.array(z.object({
    title: z.string(),
    description: z.string(),
  }).strict()).optional(),
}).strict();

const ProjectSectionSchema = z.union([
  IntroSectionSchema,
  ApproachSectionSchema,
  ArchitectureSectionSchema,
  SmartRetrievalSectionSchema,
  EvaluationSectionSchema,
  ProductionSectionSchema,
  TechStackSectionSchema,
  ResultsSectionSchema,
  WhatIBuildSectionSchema,
  SectionWithCardsSchema,
  SectionWithCardsAndBulletsSchema,
  SectionWithTableSchema,
  KeyResultsOnlySectionSchema,
  TechnicalPerformanceSectionSchema,
  CostBenefitSectionSchema,
  SegmentAnalysisSectionSchema,
  KeyLearningSectionSchema,
  ProductionDeploymentSectionSchema,
  GenericSectionSchema,
]);

const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  sections: z.array(ProjectSectionSchema),
  title: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  heroImage: z.string().optional(),
  heroVideo: z.string().optional(),
  heroTitle: z.string().optional(),
  heroDescription: z.string().optional(),
  titleHighlight: z.string().optional(),
  heroDescriptionHighlight: z.string().optional(),
  heroBackground: z.string().optional(),
  metrics: z.array(MetricSchema).optional(),
  gradientColors: z.array(z.string()).optional(),
  previewImage: z.string().optional(),
}).strict();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Find the project by slug
    const project = productDesignProjects.find(p => p.slug === slug);
    
    if (!project) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Project not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error reading PD project:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to read PD project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    // Validate the project data
    const parseResult = ProjectSchema.safeParse(body);
    
    if (!parseResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid project data',
          details: parseResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const updatedProject = parseResult.data;
    const existingProjects = productDesignProjects;
    
    // Find the project index
    const projectIndex = existingProjects.findIndex(p => p.slug === slug);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Project not found'
        },
        { status: 404 }
      );
    }

    // Update the project
    const updatedProjects = [...existingProjects];
    updatedProjects[projectIndex] = updatedProject;
    
    // Write to file
    const PD_PROJECTS_PATH = path.join(process.cwd(), 'app', 'data', 'productDesignProjects.ts');
    
    const fileContent = `import { Project } from '@/types/project';

export const productDesignProjects: Project[] = ${JSON.stringify(updatedProjects, null, 2)};

export default productDesignProjects;
`;

    await fs.writeFile(
      PD_PROJECTS_PATH,
      fileContent,
      'utf-8'
    );

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    console.error('Error updating PD project:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update PD project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const existingProjects = productDesignProjects;
    
    // Find the project index
    const projectIndex = existingProjects.findIndex(p => p.slug === slug);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Project not found'
        },
        { status: 404 }
      );
    }

    // Remove the project
    const updatedProjects = existingProjects.filter(p => p.slug !== slug);
    
    // Write to file
    const PD_PROJECTS_PATH = path.join(process.cwd(), 'app', 'data', 'productDesignProjects.ts');
    
    const fileContent = `import { Project } from '@/types/project';

export const productDesignProjects: Project[] = ${JSON.stringify(updatedProjects, null, 2)};

export default productDesignProjects;
`;

    await fs.writeFile(
      PD_PROJECTS_PATH,
      fileContent,
      'utf-8'
    );

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
      data: { deletedSlug: slug }
    });
  } catch (error) {
    console.error('Error deleting PD project:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete PD project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}