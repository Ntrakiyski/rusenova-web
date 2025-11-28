
# ML Projects Reusable Sections

This directory contains reusable React components for Machine Learning project pages. These components follow the same pattern as the Product Design (PD) sections but are specifically designed for ML projects.

## Architecture Overview

The ML projects now follow this architecture:

```
[ml/[slug]/page.tsx]
       ↓ (switch statement)
[RagEvaluationSystem.tsx] → [ml-sections/...]
[FraudDetectionSystem.tsx] → [ml-sections/...]
[RealTimeMeetingAgent.tsx] → [ml-sections/...]
```

Each ML project has its own component that composes the reusable sections, similar to how PD projects work.

## Available Components

### Core Sections (Extracted from archive/mlprojects.tsx)

1. **MLHero.tsx**
   - Hero section for ML projects
   - Props: `title`, `subtitle`, `heroImage`, `decorationImage`, `gradientColors`, `background`

2. **MLWhatIBuild.tsx**
   - Introduction section with metrics
   - Props: `description`, `metrics`, `background`

3. **MLChallenge.tsx**
   - Challenge section with text on left and decorative graphic on right
   - Props: `title`, `description`, `challenges` (string[] or ProjectFeature[]), `background`

4. **MLApproach.tsx**
   - Approach section with methodology cards
   - Props: `title`, `description`, `cards`, `background`

5. **MLArchitecture.tsx**
   - Architecture section with diagram/image
   - Props: `title`, `description`, `image`, `background`

6. **MLSectionWithBullets.tsx**
   - Generic section with bullet points
   - Props: `title`, `description`, `items`, `background`

7. **MLResultsAndImpact.tsx**
   - Results section with outcomes and business value cards
   - Props: `title`, `description`, `outcomes`, `businessValue`, `image`, `background`

8. **MLTechStack.tsx**
   - Technology stack section with technologies and categories
   - Props: `title`, `description`, `technologies`, `categories`, `background`

### Additional Sections

1. **MLSectionWithCards.tsx**
   - Section with 3 cards (grid or list layout)
   - Props: `title`, `description`, `cards`, `background`, `cardLayout`

2. **MLSectionWithTable.tsx**
   - Section with a data table
   - Props: `title`, `description`, `columns`, `rows`, `background`

3. **MLKeyResultsOnly.tsx**
   - Key results only section with icons
   - Props: `title`, `description`, `results`, `background`, `resultType`

## Usage Pattern

### 1. Create Individual Project Components

Each ML project should have its own component that composes the reusable sections. Example:

```tsx
// app/components/projects/ml-sections/RagEvaluationSystem.tsx
import MLHero from './MLHero';
import MLWhatIBuild from './MLWhatIBuild';
// ... other sections

export default function RagEvaluationSystem({ projectData }) {
  return (
    <div className="bg-white w-full min-h-screen">
      <MLHero title={projectData.title} subtitle={projectData.shortDescription} ... />
      <MLWhatIBuild description={projectData.description} metrics={projectData.metrics} />
      {/* ... other sections */}
    </div>
  );
}
```

### 2. Update the Dynamic Route

Update `app/ml/[slug]/page.tsx` to use individual project components:

```tsx
import RagEvaluationSystem from '@/app/components/projects/ml-sections/RagEvaluationSystem';
import FraudDetectionSystem from '@/app/components/projects/ml-sections/FraudDetectionSystem';
// ... other project components

export default function MLProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug('ml', slug);

  switch (slug) {
    case 'rag-evaluation-system':
      return <RagEvaluationSystem projectData={project} />;
    case 'fraud-detection-system':
      return <FraudDetectionSystem projectData={project} />;
    // ... other cases
    default:
      notFound();
  }
}
```

### 3. Project Data Structure

The project data should follow this structure in `app/data/mlProjects.ts`:

```ts
{
  id: "project-id",
  slug: "project-slug",
  title: "Project Title",
  shortDescription: "Short description",
  description: "Longer description",
  metrics: [{ value: "92%", label: "Precision" }],
  gradientColors: ["#F38301"],
  heroImage: "/project-image.png",
  sections: [
    {
      type: "intro",
      title: "The Challenge",
      description: "Challenge description",
      content: ["Challenge 1", "Challenge 2"],
      layout: "text-left-image-right"
    },
    {
      type: "approach",
      title: "Our Approach",
      description: "Approach description",
      cards: [
        { title: "Card 1", description: "Description 1" },
        { title: "Card 2", description: "Description 2" }
      ]
    },
    // ... other sections
  ]
}
```

## Type Definitions

The components use TypeScript interfaces defined in `types/project.ts`. Key section types:

- `IntroSection`: Challenge/intro sections
- `ApproachSection`: Approach sections with cards
- `ArchitectureSection`: Architecture sections with diagrams
- `SmartRetrievalSection`, `EvaluationSection`, `ProductionSection`: Sections with bullet points
- `ResultsSection`: Results sections with outcomes and business value
- `TechStackSection`: Technology stack sections

## Benefits

1. **Consistency**: All ML projects follow the same visual pattern
2. **Maintainability**: Each section type has its own dedicated component
3. **Flexibility**: Individual project components can customize section composition
4. **Scalability**: Easy to add new ML projects with consistent structure
5. **Type Safety**: Strong typing for each section type

## Testing

To test the implementation:

1. Run the development server
2. Navigate to each ML project page:
   - `/ml/rag-evaluation-system`
   - `/ml/fraud-detection-system`
   - `/ml/real-time-meeting-agent`
3. Verify that all sections render correctly
4. Check that the layout and styling match the design system

## Future Extensions

Additional sections that can be created as needed:

- `MLSectionWithCardsAndBullets.tsx`: