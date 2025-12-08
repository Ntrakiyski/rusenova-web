import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { mlProjects } from '@/app/data/mlProjects';

const MetricSchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  iconSvg: z.string().optional(),
  iconBg: z.string().optional(),
}).passthrough();

const BaseProjectSectionSchema = z.object({
  type: z.string(),
  title: z.string(),
  description: z.string(),
  layout: z.enum(['text-left-image-right', 'image-left-text-right', 'text-only', 'centered', 'text-left', 'text-right']).optional(),
  image: z.string().optional(),
}).passthrough();

const IntroSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('intro'),
  content: z.array(z.string()),
  row1Image: z.string().optional(),
  row2Image: z.string().optional(),
}).passthrough();

const ApproachSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('approach'),
  cards: z.array(z.object({
    title: z.string(),
    description: z.string(),
  }).passthrough()),
}).passthrough();

const SystemApproachSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('system-approach'),
  cards: z.array(z.object({
    title: z.string(),
  }).passthrough()),
}).passthrough();

const ArchitectureSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('architecture'),
}).passthrough();

const SmartRetrievalSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('smart-retrieval'),
  items: z.array(z.string()),
}).passthrough();

const EvaluationSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('evaluation'),
  items: z.array(z.string()),
}).passthrough();

const ProductionSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('production'),
  items: z.array(z.string()),
}).passthrough();

const TechStackSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('tech-stack'),
  items: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
}).passthrough();

const ResultsSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('results'),
  outcomes: z.array(z.string()).optional(),
  businessValue: z.array(z.string()).optional(),
  video: z.string().optional(),
}).passthrough();

const WhatIBuildSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('what-i-build'),
  bulletPoints: z.array(z.string()).optional(),
  image: z.string().optional(),
  boldWords: z.array(z.string()).optional(),
}).passthrough();

const SectionWithCardsSchema = BaseProjectSectionSchema.extend({
  type: z.literal('section-with-cards'),
  cards: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    bg: z.string().optional(),
  }).passthrough()),
}).passthrough();

const SectionWithCardsAndBulletsSchema = BaseProjectSectionSchema.extend({
  type: z.literal('section-with-cards-and-bullets'),
  cards: z.array(z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(z.string()),
    icon: z.string().optional(),
    bg: z.string().optional(),
  }).passthrough()),
}).passthrough();

const SectionWithTableSchema = BaseProjectSectionSchema.extend({
  type: z.literal('section-with-table'),
  columns: z.array(z.string()),
  rows: z.array(z.record(z.string(), z.string())),
}).passthrough();

const KeyResultsOnlySectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('key-results-only'),
  image: z.string(),
  video: z.string().optional(),
}).passthrough();

const TechnicalPerformanceSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('technical-performance'),
  metrics: z.array(z.object({
    name: z.string(),
    value: z.string(),
    description: z.string().optional(),
    details: z.string().optional(),
  }).passthrough()),
}).passthrough();

const CostBenefitSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('cost-benefit'),
  items: z.array(z.object({
    title: z.string(),
    content: z.union([z.string(), z.array(z.string())]),
    icon: z.string().optional(),
    iconBg: z.string().optional(),
  }).passthrough()),
}).passthrough();

const SegmentAnalysisSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('segment-analysis'),
  items: z.array(z.object({
    title: z.string(),
    content: z.union([z.string(), z.array(z.string())]),
    icon: z.string().optional(),
    iconBg: z.string().optional(),
  }).passthrough()),
}).passthrough();

const KeyLearningSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('key-learning'),
  learnings: z.array(z.object({
    title: z.string(),
    boldWords: z.string().optional(),
  }).passthrough()),
  image: z.string().optional(),
}).passthrough();

const ProductionDeploymentSectionSchema = BaseProjectSectionSchema.extend({
  type: z.literal('production-deployment'),
  cards: z.array(z.object({
    title: z.string(),
    icon: z.string().optional(),
    iconBg: z.string().optional(),
    bullets: z.array(z.string()),
  }).passthrough()),
}).passthrough();

const GenericSectionSchema = BaseProjectSectionSchema.extend({
  content: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  items: z.array(z.string()).optional(),
  cards: z.array(z.object({
    title: z.string(),
    description: z.string(),
  }).passthrough()).optional(),
}).passthrough();

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
  SystemApproachSectionSchema,
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
}).passthrough();

const ProjectsArraySchema = z.array(ProjectSchema);

const ML_PROJECTS_PATH = path.join(process.cwd(), 'app', 'data', 'mlProjects.ts');

const writeProjectsToFile = async (projects: unknown[]) => {
  const fileContent = `import { Project } from '@/types/project';

export const mlProjects: Project[] = ${JSON.stringify(projects, null, 2)};

export default mlProjects;
`;
  await fs.writeFile(ML_PROJECTS_PATH, fileContent, 'utf-8');
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mlProjects,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to read ML projects',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = ProjectsArraySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid data structure',
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const updatedProjects = parseResult.data;
    await writeProjectsToFile(updatedProjects);

    return NextResponse.json({
      success: true,
      message: 'ML projects saved successfully',
      data: updatedProjects,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save ML projects',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = ProjectSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid project data',
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const updatedProject = parseResult.data;
    const existingProjects = mlProjects;
    const projectIndex = existingProjects.findIndex((p) => p.slug === updatedProject.slug);

    if (projectIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found',
        },
        { status: 404 }
      );
    }

    const updatedProjects = [...existingProjects];
    updatedProjects[projectIndex] = updatedProject;

    await writeProjectsToFile(updatedProjects);

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update ML project',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
