# PD Sections Development Guidelines

## Overview

This document serves as a comprehensive guide for developing and maintaining Product Design project sections. It ensures consistency, maintainability, and adherence to the established design system and architecture patterns.

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
<div className="bg-bg-light text-text-primary border-stroke">

// ❌ INCORRECT - Hardcoded colors
<div className="bg-[#F7F4ED] text-[#191818] border-[#DDDDDD]">
```

**Available Colors:**
- Background: `bg-bg-light`, `bg-bg-dark`, `bg-bg-light-dark`, `bg-bg-white`, `bg-bg-dark/95`
- Text: `text-text-primary`, `text-text-secondary`, `text-text-white`, `text-text-light-gray`, `text-text-orange`
- Borders: `border-stroke`, `border-strokeDark`

### Typography Scale
Use predefined font sizes from `tailwind.config.ts`:

```tsx
// ✅ CORRECT - Using design system typography
<h1 className="text-display-2xl font-bricolage">
<p className="text-text-lg-regular font-bricolage">

// ❌ INCORRECT - Arbitrary font sizes
<h1 className="text-[36px] font-bricolage">
<p className="text-[14px] font-bricolage">
```

**Available Font Sizes:**
- Display: `text-display-2xl`, `text-display-md`, `text-display-xs`
- Text Regular: `text-text-xl-regular`, `text-text-md-regular`, `text-text-lg-regular`
- Text Semibold: `text-text-xl-semibold`, `text-text-md-semibold`, `text-text-lg-semibold`

### Spacing Scale
Use consistent spacing from the design system:

```tsx
// ✅ CORRECT - Using design system spacing
<div className="p-4 sm:p-6 lg:p-8 py-12">

// ❌ INCORRECT - Arbitrary spacing
<div className="p-[16px] sm:p-[24px] lg:p-[32px] py-[48px]">
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
All Product Design projects are defined in `app/data/productDesignProjects.ts` with the following structure:

```typescript
interface Project {
  id: string;
  slug: string;
  sections: ProjectSection[];
  heroTitle?: string;
  heroDescription?: string;
  heroDescriptionHighlight?: string;
  titleHighlight?: string;
  heroBackground?: string;
  metrics?: Metric[];
  gradientColors?: string[];
  previewImage?: string;
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

2. **PD-Specific Sections:**
   - `telenor-intro` - Telenor project introduction
   - `pd-nutshell` - Project summary
   - `pd-keep-in-mind` - Important considerations

3. **Layout Sections:**
   - `pd-section-left` - Left-aligned text layout
   - `pd-section-right` - Right-aligned text layout
   - `pd-selected-work` - Selected work showcase

### Adding New Data
When adding a new Product Design project:

1. **Define the Project Structure:**
```typescript
{
  "id": "new-pd-project-id",
  "slug": "new-pd-project-slug",
  "heroTitle": "Project Role Title",
  "heroDescription": "Project description with company context",
  "heroDescriptionHighlight": "Key phrase to highlight",
  "titleHighlight": "Important title phrase",
  "heroBackground": "bg-bg-dark/95",
  "sections": [
    {
      "type": "intro",
      "title": "Project Overview",
      "description": "Detailed description",
      "content": [
        {
          "type": "feature",
          "title": "Feature Title",
          "description": "Feature description"
        }
      ],
      "layout": "text-only"
    }
  ],
  "metrics": [
    {
      "value": "23%",
      "label": "User Engagement Increase",
      "icon": "/icon.svg",
      "iconBg": "bg-[#E0EAFF]"
    }
  ],
  "gradientColors": ["#color1", "#color2"],
  "previewImage": "/preview-image.png"
}
```

2. **Image Requirements:**
   - Store hero images in `public/` directory
   - Use descriptive filenames (e.g., `tide-coms.png`)
   - Optimize images for web (WebP format preferred)
   - Maintain consistent aspect ratios where possible

3. **Data Validation:**
   - Always provide `id` and `slug` (required for routing)
   - Use consistent date formats if dates are included
   - Validate that all referenced images exist in the public directory
   - Ensure highlight phrases match the actual text content

## Component Architecture

### Component Structure
Each PD section should follow this pattern:

```tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface PDSectionProps {
  title: string;
  description: string;
  // Add specific props for the section
  achievements?: string[];
  images?: string[];
  layout?: 'text-left' | 'text-right' | 'text-only' | 'centered';
  background?: string;
}

export default function PDSectionName({
  title,
  description,
  achievements = [],
  images = [],
  layout = 'text-left',
  background = 'bg-bg-light'
}: PDSectionProps) {
  return (
    <section className={`${background} w-full py-8`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section content */}
      </div>
    </section>
  );
}
```

### Component Patterns

1. **Hero Sections:**
   - Always include `title`, `subtitle`, and background props
   - Support text highlighting for key phrases
   - Include proper fallbacks for missing data
   - Use responsive design with Tailwind's responsive classes

2. **Content Sections:**
   - Support multiple layout variations (`text-left`, `text-right`, `text-only`)
   - Include proper fallbacks for missing data
   - Use consistent spacing and typography
   - Support achievement lists with bullet points

3. **Highlight Components:**
   - Use `dangerouslySetInnerHTML` for HTML content in highlights
   - Support word highlighting in descriptions
   - Use consistent highlight styling with `font-bold` and `text-text-orange`

### Component Naming
- Use PascalCase for component names (e.g., `PDHero`, `PDSectionLeft`)
- Use descriptive, specific names that indicate the section's purpose
- Follow the pattern: `PD + SectionPurpose` (e.g., `PDHero`, `PDSectionLeft`)

## File Organization

### Directory Structure
```
app/components/projects/pd-sections/
├── PDHero.tsx                    # Hero section component
├── PDSectionLeft.tsx             # Left-aligned content section
├── PDSectionRight.tsx            # Right-aligned content section
├── PDIntro.tsx                   # Project introduction
├── PDKeepInMind.tsx              # Important considerations
├── PDTelenorIntro.tsx            # Telenor-specific intro
├── development-guidelines.md     # This document
└── [new-section].tsx            # New sections
```

### File Naming Conventions
- Use descriptive, specific names
- Prefix with `PD` to indicate Product Design project sections
- Use PascalCase for component files
- Keep file names under 30 characters when possible

### Import Organization
Organize imports in the following order:

```tsx
// 1. React and Next.js imports
import React from 'react';
import Image from 'next/image';

// 2. Third-party library imports (if any)

// 3. Local component imports
import { MetricCard } from './MetricCard';

// 4. Type imports
import type { ProjectSection } from '@/types/project';
```

## Image and Asset Management

### Image Storage
- Store all images in the `public/` directory
- Use descriptive, lowercase filenames with hyphens
- Organize images by project when possible (e.g., `tide-coms.png`)
- Use consistent naming conventions for related images

### Image Optimization
- Use Next.js `Image` component for all images
- Always specify width and height or use responsive sizing
- Provide meaningful `alt` text for accessibility
- Use WebP format when possible for better compression

### Image Usage Patterns
```tsx
// ✅ CORRECT - Using Next.js Image component with responsive sizing
<Image
  src={images[0] || "/default-image.png"}
  alt="Project visualization"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-contain"
/>

// ❌ INCORRECT - Using regular img tag or hardcoded dimensions
<img src="/image.png" alt="Project visualization" />
<Image src="/image.png" alt="Project visualization" width={800} height={600} />
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
  PDHeroProps,
  PDSectionLeftProps 
} from '@/types/project';
```

### Custom Type Definitions
When creating new section types:

1. **Define the Interface:**
```typescript
export interface PDNewSectionProps {
  title: string;
  description: string;
  contentBlocks: Array<{
    heading: string;
    text: string;
    image?: string;
  }>;
  layout?: 'grid' | 'list' | 'carousel';
  highlightWords?: string[];
}
```

2. **Add to ProjectSection Union:**
```typescript
export type ProjectSection =
  | IntroSection
  | ApproachSection
  | PDNewSection
  | GenericSection;
```

3. **Create Type Guards:**
```typescript
export function isNewSection(section: ProjectSection): section is PDNewSection {
  return section.type === 'pd-new-section';
}
```

## Development Workflow

### Creating a New PD Section

1. **Define the Data Structure:**
   - Add the new section type to `types/project.ts`
   - Define the interface for the section data
   - Add type guard function if needed

2. **Create the Component:**
   - Create a new `.tsx` file in `pd-sections/`
   - Follow the component structure pattern
   - Use design system colors and typography
   - Implement responsive design

3. **Add to Data File:**
   - Update `app/data/productDesignProjects.ts` with the new section
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
- Test highlight functionality with various text patterns

### Data Validation
- Validate JSON structure with TypeScript
- Ensure all required fields are present
- Verify image paths exist in the public directory
- Check for consistent data formats
- Validate that highlight phrases exist in the actual text content

### Accessibility Testing
- Ensure all images have meaningful alt text
- Verify color contrast meets accessibility standards
- Test keyboard navigation for interactive elements
- Use semantic HTML elements
- Ensure highlight text is readable and doesn't cause visual confusion

### Performance Testing
- Measure component render time
- Check image loading performance
- Verify no unnecessary re-renders
- Test with large data sets
- Validate that image optimization is working correctly

## Performance Considerations

### Image Optimization
- Use Next.js Image component for automatic optimization
- Set appropriate `loading` attributes (`lazy` for below-the-fold images)
- Use `priority` for hero images
- Specify image dimensions to prevent layout shift
- Use `object-fit` properties appropriately (`object-contain`, `object-cover`)

### Component Optimization
- Use memoization for expensive calculations (e.g., highlight text processing)
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
export default function PDHero({
  title,
  subtitle,
  titleHighlight,
  descriptionHighlight,
  background = 'bg-bg-dark/95'
}: PDHeroProps) {
  // Split subtitle to highlight the titleHighlight part
  const subtitleParts = subtitle.split(titleHighlight || '');

  // Function to highlight multiple words in description
  const highlightDescription = (text: string, highlights: string) => {
    if (!highlights) return text;
    
    const wordsToHighlight = highlights.split(',').map(word => word.trim()).filter(word => word);
    let highlightedText = text;
    
    wordsToHighlight.forEach(word => {
      if (word) {
        const regex = new RegExp(`(${word})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="font-bricolage font-bold text-text-orange">$1</span>');
      }
    });
    
    return highlightedText;
  };

  return (
    <section className={`${background} w-full flex items-center justify-center pt-24 md:pt-32`}>
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-4xl items-center pb-0 pt-8 sm:pt-12 md:pt-16 lg:pt-24 relative w-full z-[1]">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[24px] items-center w-full">
            <h1 className="font-bricolage font-bold text-display-2xl text-center text-white max-w-full md:max-w-[500px] lg:max-w-[800px] mx-auto w-full">
              {title}
            </h1>
            <p className="font-bricolage font-normal text-text-xl-regular max-w-full md:max-w-[512px] lg:max-w-[768px] text-text-light-gray text-center w-full px-2">
              {descriptionHighlight ? (
                <span 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightDescription(subtitle, descriptionHighlight) 
                  }} 
                />
              ) : (
                <React.Fragment>
                  {subtitleParts[0]}
                  {titleHighlight && (
                    <span className="font-bricolage font-bold text-text-orange">
                      {titleHighlight}
                    </span>
                  )}
                  {subtitleParts[1]}
                </React.Fragment>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Section with Achievements Pattern
```tsx
export default function PDSectionLeft({
  title,
  description,
  achievements,
  images,
  background = 'bg-bg-light'
}: PDSectionLeftProps) {
  // Function to highlight specific words in text
  const highlightWords = (text: string, wordsToHighlight: string[]) => {
    return text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi')).map((part, i) => {
      if (wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={i} className="font-bricolage font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Determine which words to highlight based on the project title
  const getWordsToHighlight = (projectTitle: string) => {
    if (projectTitle === 'Communication Framework') {
      return ['no consistent structure', 'company-wide framework'];
    } else if (projectTitle === 'Admin') {
      return ['discoverability', 'findability'];
    } else if (projectTitle === 'Home Page Redesign') {
      return ['daily information'];
    }
    return [];
  };

  const wordsToHighlight = getWordsToHighlight(title);

  return (
    <section className={`${background} w-full py-8 sm:py-12 md:py-16 lg:py-5xl `}>
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">
          <h2 className="font-bricolage font-semibold text-display-md text-text-primary w-full">
            {title}
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[48px] items-start w-full lg:w-1/2">
              <p className="font-bricolage font-normal text-text-lg-regular text-text-primary w-full">
                {highlightWords(description, wordsToHighlight)}
              </p>

              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start w-full">
                <h3 className="font-bricolage font-semibold text-text-xl-semibold text-text-primary w-full">
                  What was achieved
                </h3>

                <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[12px] items-start w-full">
                  {achievements.map((achievement, index) => {
                    const parts = achievement.split(/(managing|every message|decision-tree|company-wide|10-30% increase|intuitive entry point|Increased active usage)/);

                    return (
                      <div key={index} className="flex gap-2 sm:gap-3 md:gap-[10px] items-center w-full">
                        <div className="size-3 sm:size-4 md:size-[12px] flex-shrink-0">
                          <div className="size-2 sm:size-3 md:size-[8px] rounded-full bg-text-orange"></div>
                        </div>
                        <p className="font-bricolage font-normal text-text-lg-regular text-text-primary flex-1">
                          {parts.map((part, i) => {
                            if (i % 2 === 1) {
                              return (
                                <span key={i} className="font-bricolage font-bold">
                                  {part}
                                </span>
                              );
                            }
                            return part;
                          })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 min-h-[200px] lg:min-h-[560px] max-h-[40vh] lg:max-h-[560px] overflow-clip rounded-lg">
              <div className="w-full h-[200px] lg:h-[560px] relative flex items-center justify-center">
                <Image
                  alt="Project visualization"
                  className="object-contain pointer-events-none"
                  src={images[0] || "/default-image.png"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Responsive Layout Pattern
```tsx
// Two-column layout with responsive behavior
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
  <div>
    {/* Text content */}
  </div>
  <div>
    {/* Image or visual content */}
  </div>
</div>

// Centered layout for hero sections
<div className="flex flex-col items-center text-center gap-6 sm:gap-8 md:gap-10 lg:gap-[48px]">
  <h1 className="font-bricolage font-bold text-display-2xl text-white">
    {/* Title */}
  </h1>
  <p className="font-bricolage text-text-xl-regular text-text-light-gray max-w-[768px]">
    {/* Description */}
  </p>
</div>

// Full-width sections with max-width container
<div className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</div>
```

### Highlight and Typography Pattern
```tsx
// Text highlighting with dynamic content
<span 
  dangerouslySetInnerHTML={{ 
    __html: highlightDescription(text, highlightWords) 
  }} 
/>

// Conditional text highlighting
{descriptionHighlight ? (
  <span 
    dangerouslySetInnerHTML={{ 
      __html: highlightDescription(subtitle, descriptionHighlight) 
    }} 
  />
) : (
  <React.Fragment>
    {subtitleParts[0]}
    {titleHighlight && (
      <span className="font-bricolage font-bold text-text-orange">
        {titleHighlight}
      </span>
    )}
    {subtitleParts[1]}
  </React.Fragment>
)}

// Achievement bullet points with text highlighting
{achievements.map((achievement, index) => {
  const parts = achievement.split(/(key phrase|another phrase)/);
  
  return (
    <div key={index} className="flex gap-2 items-center w-full">
      <div className="size-2 rounded-full bg-text-orange mt-1"></div>
      <p className="font-bricolage text-text-lg-regular text-text-primary">
        {parts.map((part, i) => {
          if (i % 2 === 1) {
            return (
              <span key={i} className="font-bricolage font-bold">
                {part}
              </span>
            );
          }
          return part;
        })}
      </p>
    </div>
  );
})}
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

This guide ensures that all Product Design section development follows consistent patterns and maintains the integrity of the application architecture. Always refer to this document when creating new sections or modifying existing ones.

For questions or clarifications, consult the existing codebase and follow the patterns established in working components.

## Additional Notes

- Always test highlight functionality with various text patterns and edge cases
- Ensure that image optimization is properly configured for different screen sizes
- Maintain consistent spacing and typography throughout all PD sections
- Use meaningful alt text for all images to ensure accessibility
- Test the component with different data variations to ensure robustness