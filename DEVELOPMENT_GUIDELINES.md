# Project Development Guidelines - Overview

This document provides an overview of the development guidelines created for the ML and PD sections of the project.

## Documents Created

### 1. ML Sections Development Guidelines
**Location**: `app/components/projects/ml-sections/development-guidelines.md`

**Focus Areas**:
- Design system compliance for ML projects
- Data structure guidelines for `mlProjects.ts`
- Component architecture patterns
- Image management for ML content
- Testing strategies for ML sections

**Key Features**:
- Comprehensive color usage guidelines
- Typography scale documentation
- Component patterns for different ML section types
- Performance optimization guidelines
- Troubleshooting common issues

### 2. PD Sections Development Guidelines  
**Location**: `app/components/projects/pd-sections/development-guidelines.md`

**Focus Areas**:
- Design system compliance for Product Design projects
- Data structure guidelines for `productDesignProjects.ts`
- Component architecture patterns specific to PD
- Image management for PD content
- Highlighting system documentation

**Key Features**:
- PD-specific color schemes and layouts
- Text highlighting functionality guidelines
- Content array handling patterns
- Project-specific vs generic component strategies
- Accessibility and typography best practices

## Common Principles Across Both Sections

### Design System Compliance
- **Always use colors from `tailwind.config.ts`**
- **Never hardcode hex values or use arbitrary values**
- **Follow typography scale strictly**
- **Use consistent spacing with predefined scale**

### Data-Driven Architecture
- **All content comes from JSON/TS files in `app/data/`**
- **Type-safe interfaces in `types/project.ts`**
- **Consistent data structure patterns**
- **Backward compatibility requirements**

### File Organization
- **Components in respective section directories**
- **Images in `public/` folder only**
- **Descriptive, lowercase filenames with hyphens**
- **Consistent naming conventions (PascalCase for components)**

### Performance & Quality
- **Image optimization with Next.js Image component**
- **TypeScript for type safety**
- **Responsive design testing**
- **Accessibility compliance**
- **Performance monitoring**

## Usage Instructions

### For ML Sections
1. **Before making changes**: Review `ml-sections/development-guidelines.md`
2. **Check design system**: Refer to `tailwind.config.ts` for colors, fonts, spacing
3. **Update data**: Modify `app/data/mlProjects.ts` for content changes
4. **Follow patterns**: Use established component patterns
5. **Test thoroughly**: Check responsiveness, accessibility, performance

### For PD Sections
1. **Before making changes**: Review `pd-sections/development-guidelines.md`
2. **Check design system**: Refer to `tailwind.config.ts` for colors, fonts, spacing
3. **Update data**: Modify `app/data/productDesignProjects.ts` for content changes
4. **Handle highlighting**: Use built-in highlighting system for emphasis
5. **Test thoroughly**: Check responsiveness, highlighting, accessibility

## Change Management Process

### 1. Before Making Changes
- [ ] Review relevant development guidelines
- [ ] Check design system compliance requirements
- [ ] Update data structures if needed
- [ ] Plan component changes following established patterns
- [ ] Define test strategy

### 2. During Implementation
- [ ] Follow established patterns and conventions
- [ ] Use TypeScript interfaces for all props
- [ ] Test incrementally as you build
- [ ] Document complex logic and decisions
- [ ] Verify design system compliance

### 3. After Implementation
- [ ] Test all breakpoints and devices
- [ ] Verify data loading and display
- [ ] Check performance impact
- [ ] Ensure accessibility compliance
- [ ] Update documentation if needed
- [ ] Run TypeScript compilation checks

## Breaking Changes Protocol

If changes break existing functionality:
1. **Identify impact** on projects and components
2. **Plan migration** steps and update affected files
3. **Test thoroughly** all edge cases
4. **Communicate changes** in documentation and comments

## Troubleshooting

### Common Issues
- **Layout breaks**: Check responsive classes and fixed widths
- **Images not loading**: Verify public folder and paths
- **TypeScript errors**: Check type definitions and interfaces
- **Performance issues**: Review image optimization and code splitting
- **Design violations**: Verify tailwind.config usage

### Getting Help
- Review the relevant development guidelines
- Check existing component implementations
- Test with sample data
- Consult design system documentation

## Summary

These guidelines ensure:
- **Consistency** across all ML and PD sections
- **Maintainability** through standardized patterns
- **Performance** via optimization best practices
- **Accessibility** for all users
- **Design system compliance** in all implementations
- **Type safety** through TypeScript
- **Data-driven architecture** for content management

Always refer to the specific guidelines document before making changes to ensure your modifications align with the project's architecture and design principles.