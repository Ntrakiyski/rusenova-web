# ML Sections Development Guidelines

## Overview

This document serves as a comprehensive guide for developing and maintaining ML project sections. It ensures consistency, maintainability, and adherence to the established design system and architecture patterns.

## Table of Contents

1. [Design System Integration](#design-system-integration)
2. [Data Structure and JSON Management](#data-structure-and-json-management)
3. [Component Architecture](#component-architecture)
4. [File Organization](#file-organization)
5. [Image and Asset Management](#image-and-asset-management)
6. [Type Definitions](#type-definitions)
7. [Development Workflow](#development-workflow)
8. [Testing and Validation](#testing-and-validation)
9. [Performance Considerations](#performance-considerations)
10. [Common Patterns and Examples](#common-patterns-and-examples)

---

## Design System Integration

### Color Palette
Always use colors defined in `tailwind.config.ts`:

```tsx
// ✅ CORRECT - Using design system colors
<div className="bg-bg-dark text-text-white border-stroke">

// ❌ INCORRECT - Hardcoded colors
<div className="bg-[#252222] text-[#FFFFFF] border-[#DDDDDD]">
```

**Available Colors:**
- Background: `bg-bg-light`, `bg-bg-dark`, `bg-bg-light-dark`, `bg-bg-white`
- Text: `text-text-primary`, `text-text-secondary`, `text-text-white`, `text-text-light-gray`, `text-text-orange`
- Borders: `border-stroke`, `border-strokeDark`
- Additional: `bg-[#E0EAFF]`, `bg-[#8EB2F21F]`, `bg-[#f0f0f0]`

### Typography Scale
Use predefined font sizes from `tailwind.config.ts`:

```tsx
// ✅ CORRECT - Using design system typography
<h1 className="text-display-2xl font-bricolage">
<p className="text-text-xl-regular font-bricolage">

// ❌ INCORRECT - Arbitrary font sizes
<h1 className="text-[36px] font-bricolage">
<p className="text-[16px] font-bricolage">
```

**Available Font Sizes:**
- Display: `text-display-2xl`, `text-display-md`, `text-display-xs`
- Text Regular: `text-text-xl-regular`, `text-text-md-regular`, `text-text-lg-regular`
- Text Semibold: `text-text-xl-semibold`, `text-text-md-semibold`, `text-text-lg-semibold`

### Spacing Scale
Use consistent spacing from the design system:

```tsx
// ✅ CORRECT - Using design system spacing
<div className="p-md py-lg px-xl">

// ❌ INCORRECT - Arbitrary spacing
<div className="p-[16px] py-[24px] px-[32px]">
```

**Available Spacing:**
- Small: `xs` (4px), `sm` (8px), `md` (16px)
- Medium: `lg` (24px), `xl` (32px), `2xl` (48px)
- Large: `3xl` (64px), `4xl` (80px), `5xl` (96px)

### Border Radius
Use predefined border radius values:

```tsx
// ✅ CORRECT - Using design system border radius
<div className="rounded-lg">

// ❌ INCORRECT - Arbitrary border radius
<div className="rounded-[16px]">
```

**Available Border Radius:**
- Small: `xs`, `sm`, `md`
- Medium: `lg`, `xl`, `2xl`
- Large: `3xl`, `4xl`, `5xl`, `6xl`

## Data Structure and JSON Management

### Project Data Structure
All ML projects are defined in `app/data/mlProjects.ts` with the following structure:

```typescript
interface Project {
  id: string;
  slug: string;
  title?: string;
  shortDescription?: string;
  heroImage?: string;
  heroVideo?: string;
  metrics?: Metric[];
  sections: ProjectSection[];
}
```

### Section Types
Each project contains multiple sections. The available section types are:

1. **Generic Sections:**
   - `intro` - Project introduction with content array
   - `approach` - Project approach with cards
   - `architecture` - Technical architecture
   - `tech-stack` - Technologies used
   - `results` - Project outcomes and business value

2. **ML-Specific Sections:**
   - `what-i-build` - Key metrics and build details
   - `technical-performance` - Performance metrics
   - `cost-benefit` - Cost analysis
   - `segment-analysis` - User segment analysis
   - `key-learning` - Key learnings
   - `production-deployment` - Deployment details

3. **Layout Sections:**
   - `section-with-cards` - Cards layout
   - `section-with-cards-and-bullets` - Cards with bullet points
   - `section-with-table` - Table layout
   - `key-results-only` - Results-focused layout

### Adding New Data
When adding a new ML project:

1. **Define the Project Structure:**
```typescript
{
  "id": "new-project-id",
  "slug": "new-project-slug",
  "title": "Project Title",
  "shortDescription": "Brief description",
  "heroImage": "/hero-image.png",
  "heroVideo": "/hero-video.mp4",
  "metrics": [
    {
      "value": "95%",
      "label": "Accuracy",
      "icon": "/icon.svg",
      "iconBg": "bg-[#E0EAFF]"
    }
  ],
  "sections": [
    {
      "type": "intro",
      "title": "The Challenge",
      "description": "Project description",
      "content": [
        "Content point 1",
        "Content point 2"
      ]
    }
  ]
}
```

2. **Image Requirements:**
   - Store hero images in `public/` directory
   - Use descriptive filenames (e.g., `fraud-detection-hero.png`)
   - Optimize images for web (WebP format preferred)
   - Maintain consistent aspect ratios where possible

3. **Data Validation:**
   - Always provide `id` and `slug` (required for routing)
   - Use consistent date formats if dates are included
   - Validate that all referenced images exist in the public directory

## Component Architecture

### Component Structure
Each ML section should follow this pattern:

```tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { VideoPlayer } from '@/components/ui/shadcn-io/video-player';

interface SectionProps {
  title: string;
  description: string;
  // Add specific props for the section
  metrics?: Metric[];
  image?: string;
  layout?: 'text-left-image-right' | 'image-left-text-right';
}

export default function MLSectionName({
  title,
  description,
  metrics = [],
  image,
  layout = 'text-left-image-right'
}: SectionProps) {
  return (
    <section className="bg-bg-light py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section content */}
      </div>
    </section>
  );
}
```

### Component Patterns

1. **Hero Sections:**
   - Always include `title`, `subtitle`, and background props
   - Support both image and video hero content
   - Include metrics display when applicable
   - Use responsive design with Tailwind's responsive classes

2. **Content Sections:**
   - Support multiple layout variations
   - Include proper fallbacks for missing data
   - Use consistent spacing and typography

3. **Metric Components:**
   - Standardize metric display across all sections
   - Use consistent icon and background styling
   - Support both SVG and image icons

### Component Naming
- Use PascalCase for component names (e.g., `MLHero`, `MLResults`)
- Use descriptive, specific names that indicate the section's purpose
- Follow the pattern: `ML + SectionPurpose` (e.g., `MLArchitecture`, `MLTechStack`)

## File Organization

### Directory Structure
```
app/components/projects/ml-sections/
├── MLHero.tsx                    # Hero section component
├── MLApproach.tsx                # Project approach section
├── MLArchitecture.tsx            # Technical architecture
├── MLResultsAndImpact.tsx        # Results and impact
├── MLTechnicalPerformance.tsx    # Performance metrics
├── development-guidelines.md     # This document
└── [new-section].tsx            # New sections
```

### File Naming Conventions
- Use descriptive, specific names
- Prefix with `ML` to indicate ML project sections
- Use PascalCase for component files
- Keep file names under 30 characters when possible

### Import Organization
Organize imports in the following order:

```tsx
// 1. React and Next.js imports
import React from 'react';
import Image from 'next/image';

// 2. Third-party library imports
import { VideoPlayer } from '@/components/ui/shadcn-io/video-player';

// 3. Local component imports
import { MetricCard } from './MetricCard';

// 4. Type imports
import type { ProjectSection } from '@/types/project';
```

## Image and Asset Management

### Image Storage
- Store all images in the `public/` directory
- Use descriptive, lowercase filenames with hyphens
- Organize images by project when possible (e.g., `fraud-detection-hero.png`)

### Image Optimization
- Use Next.js `Image` component for all images
- Always specify width and height or use responsive sizing
- Provide meaningful `alt` text for accessibility
- Use WebP format when possible for better compression

### Image Usage Patterns
```tsx
// ✅ CORRECT - Using Next.js Image component
<Image
  src="/hero-image.png"
  alt="Project hero image"
  width={800}
  height={600}
  className="rounded-lg"
/>

// ❌ INCORRECT - Using regular img tag
<img src="/hero-image.png" alt="Project hero image" />
```

### SVG Icons
- Store SVG icons in the `public/` directory
- Use descriptive filenames (e.g., `info-square.svg`)
- Reference SVGs as images in components
- Consider inline SVGs for small, frequently used icons

## Type Definitions

### TypeScript Usage
- Always provide type annotations for component props
- Use strict null checks
- Prefer interfaces over types for object shapes
- Use union types for controlled props

### Required Interfaces
Ensure these interfaces are imported and used:

```typescript
import type { 
  Project, 
  ProjectSection, 
  Metric,
  MLHeroProps,
  MLResultsProps 
} from '@/types/project';
```

### Custom Type Definitions
When creating new section types:

1. **Define the Interface:**
```typescript
export interface MLNewSectionProps {
  title: string;
  description: string;
  dataPoints: Array<{
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
  layout?: 'grid' | 'list' | 'carousel';
}
```

2. **Add to ProjectSection Union:**
```typescript
export type ProjectSection =
  | IntroSection
  | ApproachSection
  | MLNewSection
  | GenericSection;
```

3. **Create Type Guards:**
```typescript
export function isNewSection(section: ProjectSection): section is MLNewSection {
  return section.type === 'new-section';
}
```

## Development Workflow

### Creating a New ML Section

1. **Define the Data Structure:**
   - Add the new section type to `types/project.ts`
   - Define the interface for the section data
   - Add type guard function if needed

2. **Create the Component:**
   - Create a new `.tsx` file in `ml-sections/`
   - Follow the component structure pattern
   - Use design system colors and typography
   - Implement responsive design

3. **Add to Data File:**
   - Update `app/data/mlProjects.ts` with the new section
   - Ensure all required fields are provided
   - Validate image paths and references

4. **Update Router:**
   - If creating a new project page, update the dynamic routing
   - Ensure the slug matches the data file

5. **Test the Implementation:**
   - Verify the component renders correctly
   - Test with different data variations
   - Check responsive behavior
   - Validate accessibility

### Testing Checklist
- [ ] Component renders without errors
- [ ] All props are properly typed
- [ ] Responsive design works on all screen sizes
- [ ] Images load correctly and have appropriate alt text
- [ ] Colors match the design system
- [ ] Typography follows the scale
- [ ] Spacing is consistent
- [ ] No console errors or warnings

## Testing and Validation

### Component Testing
- Test with empty data arrays
- Test with missing optional props
- Test with maximum content length
- Test responsive behavior on different screen sizes

### Data Validation
- Validate JSON structure with TypeScript
- Ensure all required fields are present
- Verify image paths exist in the public directory
- Check for consistent data formats

### Accessibility Testing
- Ensure all images have meaningful alt text
- Verify color contrast meets accessibility standards
- Test keyboard navigation for interactive elements
- Use semantic HTML elements

### Performance Testing
- Measure component render time
- Check image loading performance
- Verify no unnecessary re-renders
- Test with large data sets

## Performance Considerations

### Image Optimization
- Use Next.js Image component for automatic optimization
- Set appropriate `loading` attributes (`lazy` for below-the-fold images)
- Use `priority` for hero images
- Specify image dimensions to prevent layout shift

### Component Optimization
- Use memoization for expensive calculations
- Implement proper loading states
- Avoid unnecessary re-renders
- Use virtualization for long lists

### Bundle Size
- Import only necessary components
- Use tree-shaking friendly imports
- Avoid large dependencies when possible
- Optimize image and asset sizes

### Code Splitting
- Use dynamic imports for heavy components
- Implement lazy loading for below-the-fold content
- Split components by route when possible

## Common Patterns and Examples

### Hero Section Pattern
```tsx
export default function MLHero({
  title,
  subtitle,
  heroImage,
  heroVideo,
  metrics = []
}: MLHeroProps) {
  return (
    <section className="bg-bg-dark rounded-bl-[32px] rounded-br-[32px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-display-2xl text-text-white">
              {title}
            </h1>
            <p className="text-text-xl-regular text-text-white">
              {subtitle}
            </p>
          </div>
          <div className="flex-1">
            {heroVideo ? (
              <VideoPlayer>
                <VideoPlayerContent src={heroVideo} />
              </VideoPlayer>
            ) : (
              <Image src={heroImage} alt={title} />
            )}
          </div>
        </div>
        
        {metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

### Metric Card Pattern
```tsx
export function MetricCard({ value, label, icon, iconBg }: Metric) {
  return (
    <div className="border border-strokeDark rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className={`${iconBg} rounded-full p-2`}>
          <Image src={icon || '/info-square.svg'} alt={label} />
        </div>
        <div>
          <p className="text-text-xl-semibold text-text-white">
            {value}
          </p>
          <p className="text-text-md-regular text-text-light-gray">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Responsive Layout Pattern
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
  <div className="order-2 lg:order-1">
    {/* Content */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Image or Video */}
  </div>
</div>
```

### Content Section Pattern
```tsx
export default function MLContentSection({
  title,
  description,
  content,
  layout = 'text-left-image-right'
}: MLContentSectionProps) {
  const isImageLeft = layout === 'image-left-text-right';
  
  return (
    <section className="bg-bg-light py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${isImageLeft ? 'lg:flex-row-reverse' : ''}`}>
          <div>
            <h2 className="text-display-md text-text-primary mb-6">
              {title}
            </h2>
            <p className="text-text-lg-regular text-text-primary mb-6">
              {description}
            </p>
            <ul className="space-y-3">
              {content?.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-text-orange mt-2 flex-shrink-0" />
                  <span className="text-text-lg-regular text-text-primary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {/* Image or content */}
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Breaking Changes Prevention

### Design System Consistency
- Never hardcode colors, fonts, or spacing
- Always reference design tokens from `tailwind.config.ts`
- Use semantic class names
- Maintain consistent component APIs

### Data Structure Stability
- When adding new fields, make them optional
- Provide default values for new props
- Maintain backward compatibility with existing data
- Update type definitions incrementally

### Component API Stability
- Don't change required prop names
- When removing props, provide migration path
- Maintain consistent component naming
- Keep component interfaces stable

### Migration Strategy
When changes are necessary:

1. **Deprecation Phase:**
   - Add new props alongside existing ones
   - Update documentation
   - Provide examples of new usage

2. **Transition Phase:**
   - Support both old and new APIs
   - Add console warnings for deprecated usage
   - Update all existing components

3. **Removal Phase:**
   - Remove deprecated code
   - Update tests
   - Clean up documentation

## Conclusion

This guide ensures that all ML section development follows consistent patterns and maintains the integrity of the application architecture. Always refer to this document when creating new sections or modifying existing ones.

For questions or clarifications, consult the existing codebase and follow the patterns established in working components.