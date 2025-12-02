# AI-Agent Implementation Plan for Portfolio SQLite Migration

## Executive Summary

This document provides a comprehensive implementation plan for migrating the portfolio website's homepage content from JSON/TS files to SQLite database with a protected admin interface. The migration enforces design system constraints - using only Tailwind config and globals.css for styling, with admin UI restricted to predefined design tokens.

## Current State Analysis

### Data Structure
- **Homepage content**: Stored in `app/data/homeContent.json` (285 lines)
- **Project data**: Stored in `app/data/mlProjects.ts` and `app/data/productDesignProjects.ts`
- **Design system**: Colors, fonts, and styles defined exclusively in Tailwind config and globals.css
- **Type safety**: Strong TypeScript interfaces in `types/project.ts`

### Key Content Sections
1. **Meta Information**: Version, last updated
2. **Colors**: Primary, secondary, background, text variants, border (predefined in Tailwind)
3. **Hero Section**: Badge, title, subtitle, buttons, image
4. **Services Section**: Title, service items array
5. **Features Section**: Background color, title, subtitle, feature items with icons
6. **ML Preview**: Title, subtitle, project previews with metrics
7. **PD Preview**: Title, subtitle, work experience previews
8. **About Section**: Badge, title, paragraphs, stats, image
9. **Contact Section**: Title, subtitle, email, LinkedIn, opportunities
10. **Footer**: Brand info, social links, sections, legal

## Migration Strategy

### Phase 1: Database Schema Design & Setup

#### SQLite Database Schema
```sql
-- Core homepage content tables
create table site_settings (
  id integer primary key,
  key text unique not null,
  value text not null,
  type text default 'string', -- 'string', 'json', 'color_preset'
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);

create table homepage_sections (
  id integer primary key,
  section_type text not null, -- 'hero', 'services', 'features', 'about', 'contact'
  content_json text not null, -- JSON string for flexible content
  color_preset text, -- References predefined Tailwind color classes
  order_index integer default 0,
  is_active boolean default true,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);

create table projects (
  id integer primary key,
  title text not null,
  slug text unique not null,
  category text not null, -- 'ml' or 'pd'
  short_description text,
  preview_image text,
  gradient_preset text, -- References predefined gradient classes
  is_featured boolean default false,
  order_index integer default 0,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);

create table project_metrics (
  id integer primary key,
  project_id integer references projects(id) on delete cascade,
  value text not null,
  label text not null,
  order_index integer default 0
);

create table work_experience (
  id integer primary key,
  title text not null,
  role text not null,
  company text not null,
  short_description text,
  preview_image text,
  gradient_preset text, -- References predefined gradient classes
  slug text unique not null,
  order_index integer default 0,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);

create table footer_sections (
  id integer primary key,
  title text not null,
  section_type text not null, -- 'services', 'projects', 'company', 'legal'
  order_index integer default 0,
  is_active boolean default true
);

create table footer_links (
  id integer primary key,
  section_id integer references footer_sections(id) on delete cascade,
  label text not null,
  href text not null,
  order_index integer default 0
);

create table social_links (
  id integer primary key,
  platform text not null,
  url text not null,
  aria_label text not null,
  order_index integer default 0
);

create table design_tokens (
  id integer primary key,
  token_type text not null, -- 'color', 'font', 'size', 'spacing'
  token_name text not null,
  tailwind_class text not null,
  description text,
  is_active boolean default true
);
```

#### Design Token Population Script
```typescript
// scripts/populate-design-tokens.ts
import { db } from '@/lib/db';

async function populateDesignTokens() {
  // Color presets from Tailwind config
  const colorPresets = [
    { token_name: 'primary', tailwind_class: 'text-primary', description: 'Primary brand color' },
    { token_name: 'secondary', tailwind_class: 'text-secondary', description: 'Secondary brand color' },
    { token_name: 'background', tailwind_class: 'bg-background', description: 'Background color' },
    { token_name: 'text-primary', tailwind_class: 'text-primary-foreground', description: 'Primary text color' },
    { token_name: 'text-secondary', tailwind_class: 'text-secondary-foreground', description: 'Secondary text color' },
    { token_name: 'accent', tailwind_class: 'text-accent', description: 'Accent color' },
    { token_name: 'muted', tailwind_class: 'text-muted-foreground', description: 'Muted text color' },
    { token_name: 'border', tailwind_class: 'border-border', description: 'Border color' }
  ];

  // Font size presets
  const fontSizePresets = [
    { token_name: 'xs', tailwind_class: 'text-xs', description: 'Extra small text' },
    { token_name: 'sm', tailwind_class: 'text-sm', description: 'Small text' },
    { token_name: 'base', tailwind_class: 'text-base', description: 'Base text size' },
    { token_name: 'lg', tailwind_class: 'text-lg', description: 'Large text' },
    { token_name: 'xl', tailwind_class: 'text-xl', description: 'Extra large text' },
    { token_name: '2xl', tailwind_class: 'text-2xl', description: '2x large text' },
    { token_name: '3xl', tailwind_class: 'text-3xl', description: '3x large text' },
    { token_name: '4xl', tailwind_class: 'text-4xl', description: '4x large text' }
  ];

  // Spacing presets
  const spacingPresets = [
    { token_name: 'xs', tailwind_class: 'p-1', description: 'Extra small padding' },
    { token_name: 'sm', tailwind_class: 'p-2', description: 'Small padding' },
    { token_name: 'md', tailwind_class: 'p-4', description: 'Medium padding' },
    { token_name: 'lg', tailwind_class: 'p-6', description: 'Large padding' },
    { token_name: 'xl', tailwind_class: 'p-8', description: 'Extra large padding' }
  ];

  // Insert all presets
  for (const preset of [...colorPresets, ...fontSizePresets, ...spacingPresets]) {
    await db.run(`
      INSERT INTO design_tokens (token_type, token_name, tailwind_class, description)
      VALUES ('${preset.token_name.includes('-') ? 'color' : preset.token_name}', '${preset.token_name}', '${preset.tailwind_class}', '${preset.description}')
    `);
  }
}
```

### Phase 2: Backend Infrastructure

#### Database Connection & Utilities
```typescript
// lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.NODE_ENV === 'development' 
  ? './portfolio.db' 
  : path.join(process.cwd(), 'portfolio.db');

export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database
db.exec(`
  -- All CREATE TABLE statements from schema above
`);

// Design token utilities
export function getDesignTokens(type: string) {
  return db.prepare('SELECT * FROM design_tokens WHERE token_type = ? AND is_active = true').all(type);
}

export function getColorPresets() {
  return getDesignTokens('color');
}

export function getFontSizePresets() {
  return getDesignTokens('font');
}

export function getSpacingPresets() {
  return getDesignTokens('spacing');
}
```

#### API Routes Structure
```
app/api/
├── admin/
│   ├── login/route.ts          # Admin authentication
│   ├── logout/route.ts         # Admin logout
│   ├── auth/check/route.ts     # Check auth status
│   └── dashboard/route.ts      # Admin dashboard data
├── homepage/
│   ├── route.ts                # GET homepage data
│   ├── sections/[id]/route.ts  # GET/PUT/DELETE specific section
│   └── sections/route.ts       # POST new section
├── projects/
│   ├── route.ts                # GET all projects
│   ├── [id]/route.ts           # GET/PUT/DELETE specific project
│   └── featured/route.ts       # GET featured projects
├── settings/
│   ├── route.ts                # GET all settings
│   ├── [key]/route.ts          # GET/PUT specific setting
│   └── colors/route.ts         # GET available color presets
├── design-tokens/
│   ├── route.ts                # GET all design tokens
│   ├── colors/route.ts         # GET color presets only
│   ├── fonts/route.ts          # GET font size presets only
│   └── spacing/route.ts        # GET spacing presets only
└── upload/
    ├── image/route.ts          # POST image upload
    └── delete/route.ts         # DELETE image file
```

#### Authentication System
```typescript
// lib/auth.ts
import crypto from 'crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 'hash_here';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string): boolean {
  return hashPassword(password) === ADMIN_PASSWORD_HASH;
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
```

### Phase 3: Frontend Admin Interface

#### Admin Route Structure
```
app/admin/
├── login/page.tsx              # Admin login page
├── dashboard/page.tsx          # Main admin dashboard
├── homepage/
│   ├── page.tsx                # Homepage content editor
│   ├── sections/
│   │   ├── [id]/page.tsx       # Edit specific section
│   │   └── new/page.tsx        # Create new section
│   └── projects/page.tsx       # Project management
├── settings/
│   ├── general/page.tsx        # General settings
│   └── appearance/page.tsx     # Appearance settings (view-only)
└── components/
    ├── AdminLayout.tsx         # Admin layout wrapper
    ├── Sidebar.tsx             # Admin navigation
    ├── ContentEditor.tsx       # Rich text editor
    ├── ImageUpload.tsx         # Image upload component
    ├── DesignTokenSelector.tsx # Predefined style selector
    ├── SectionForm.tsx         # Reusable section form
    └── ColorPresetViewer.tsx   # View available color presets
```

#### Key Admin Components

**DesignTokenSelector Component:**
```typescript
// app/admin/components/DesignTokenSelector.tsx
'use client';

import { useState, useEffect } from 'react';

interface DesignToken {
  token_name: string;
  tailwind_class: string;
  description: string;
}

interface DesignTokenSelectorProps {
  tokenType: 'color' | 'font' | 'spacing';
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function DesignTokenSelector({ tokenType, value, onChange, label }: DesignTokenSelectorProps) {
  const [tokens, setTokens] = useState<DesignToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokens();
  }, [tokenType]);

  async function fetchTokens() {
    try {
      const response = await fetch(`/api/design-tokens/${tokenType}s`);
      const data = await response.json();
      setTokens(data.tokens);
    } catch (error) {
      console.error('Failed to fetch design tokens:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading {tokenType} presets...</div>;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select {tokenType} preset</option>
        {tokens.map((token) => (
          <option key={token.token_name} value={token.tailwind_class}>
            {token.token_name} - {token.description}
          </option>
        ))}
      </select>
      {value && (
        <div className={`p-2 border rounded ${value} bg-background`}>
          Preview: This is how your selection looks
        </div>
      )}
    </div>
  );
}
```

**SectionForm Component (Updated):**
```typescript
// app/admin/components/SectionForm.tsx
'use client';

import { useState } from 'react';
import DesignTokenSelector from './DesignTokenSelector';
import ImageUpload from './ImageUpload';

export default function SectionForm({ section, onSave }) {
  const [formData, setFormData] = useState(section.content_json ? JSON.parse(section.content_json) : {});
  const [colorPreset, setColorPreset] = useState(section.color_preset || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      ...formData,
      color_preset: colorPreset
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <div className="space-y-4">
        {/* Basic content fields */}
        <input
          type="text"
          placeholder="Section Title"
          value={formData.title || ''}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-2 border rounded"
        />
        
        <textarea
          placeholder="Section Content"
          value={formData.content || ''}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="w-full p-2 border rounded h-32"
        />

        {/* Design token selectors - no custom colors allowed */}
        <DesignTokenSelector
          tokenType="color"
          value={colorPreset}
          onChange={setColorPreset}
          label="Color Preset (from Tailwind config)"
        />

        {/* Image upload */}
        <ImageUpload
          onImageUpload={(url) => setFormData({...formData, image: url})}
          currentImage={formData.image}
        />

        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
          Save Section
        </button>
      </div>
    </form>
  );
}
```

### Phase 4: Frontend Integration

#### Updated HomePageContent Component
```typescript
// app/components/HomePageContent.tsx (updated)
'use client';

import { useState, useEffect } from 'react';
import { HomeContent } from '@/types/project';

// Import section components
import HeroSection from './home/HeroSection';
import ServicesSection from './home/ServicesSection';
import FeaturesSection from './home/FeaturesSection';
import MLPreviewSection from './home/MLPreviewSection';
import PDPreviewSection from './home/PDPreviewSection';
import AboutSection from './home/AboutSection';

export default function HomePageContent() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHomepageContent();
    
    // Listen for admin updates
    const handleUpdate = () => fetchHomepageContent();
    window.addEventListener('homepage-updated', handleUpdate);
    
    return () => window.removeEventListener('homepage-updated', handleUpdate);
  }, []);

  async function fetchHomepageContent() {
    try {
      const response = await fetch('/api/homepage');
      const data = await response.json();
      
      // Transform database data to match existing component props
      const transformedContent = transformDbDataToHomeContent(data);
      setContent(transformedContent);
    } catch (error) {
      console.error('Failed to fetch homepage content:', error);
      // Fallback to JSON data or show error
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (!content) return <div>Failed to load content</div>;

  return (
    <>
      <HeroSection content={content.hero} colors={content.colors} />
      <ServicesSection content={content.services} colors={content.colors} />
      <FeaturesSection content={content.features} colors={content.colors} />
      
      <section id="projects">
        <MLPreviewSection
          content={content.mlPreview}
          mlData={content.mlPreview?.projects || []}
          colors={content.colors}
        />
      </section>

      <section id="about">
        <AboutSection content={content.about} colors={content.colors} />
      </section>

      <section id="experience">
        <PDPreviewSection
          content={content.pdPreview}
          pdData={content.pdPreview?.projects || []}
          colors={content.colors}
        />
      </section>
    </>
  );
}
```

#### Data Transformation Utilities
```typescript
// lib/data-transform.ts
export function transformDbDataToHomeContent(dbData: any): HomeContent {
  const { sections, settings, projects, workExperience } = dbData;
  
  // Build colors object from settings (mapped to Tailwind classes)
  const colors = {
    primary: 'text-primary',      // Maps to Tailwind class
    secondary: 'text-secondary',    // Maps to Tailwind class
    background: 'bg-background',    // Maps to Tailwind class
    text: {
      primary: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      accent: 'text-accent',
      muted: 'text-muted-foreground'
    },
    border: 'border-border'
  };

  // Build sections with color presets
  const heroSection = sections.find((s: any) => s.section_type === 'hero');
  const servicesSection = sections.find((s: any) => s.section_type === 'services');
  const featuresSection = sections.find((s: any) => s.section_type === 'features');
  const aboutSection = sections.find((s: any) => s.section_type === 'about');

  return {
    meta: {
      version: '2.0.0',
      lastUpdated: new Date().toISOString().split('T')[0]
    },
    colors,
    hero: heroSection ? {
      ...JSON.parse(heroSection.content_json),
      backgroundColor: heroSection.color_preset || 'bg-background'
    } : getDefaultHero(),
    services: servicesSection ? {
      ...JSON.parse(servicesSection.content_json),
      backgroundColor: servicesSection.color_preset || 'bg-background'
    } : getDefaultServices(),
    features: featuresSection ? {
      ...JSON.parse(featuresSection.content_json),
      backgroundColor: featuresSection.color_preset || 'bg-background'
    } : getDefaultFeatures(),
    mlPreview: {
      title: getSetting(settings, 'ml_preview_title', 'Machine Learning & AI'),
      subtitle: getSetting(settings, 'ml_preview_subtitle', 'Hands-on experimentation...'),
      projects: transformProjects(projects)
    },
    pdPreview: {
      title: getSetting(settings, 'pd_preview_title', 'Product Design'),
      subtitle: getSetting(settings, 'pd_preview_subtitle', 'This is my working experience...'),
      projects: transformWorkExperience(workExperience)
    },
    about: aboutSection ? {
      ...JSON.parse(aboutSection.content_json),
      backgroundColor: aboutSection.color_preset || 'bg-background'
    } : getDefaultAbout(),
    contact: getDefaultContact(),
    footer: getDefaultFooter()
  };
}
```

### Phase 5: Implementation Checklist for AI-Agent

#### Required Dependencies
```json
{
  "dependencies": {
    "better-sqlite3": "^9.2.2",
    "@types/better-sqlite3": "^7.6.8",
    "multer": "^1.4.5-lts.1",
    "@types/multer": "^1.4.11",
    "sharp": "^0.33.2",
    "react-hook-form": "^7.50.1",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4"
  }
}
```

#### Implementation Steps for AI-Agent

**Step 1: Database Setup & Schema**
- [ ] Create SQLite database with complete schema
- [ ] Run design token population script
- [ ] Verify all tables and relationships
- [ ] Test database connection utilities

**Step 2: Backend API Implementation**
- [ ] Implement all API routes for homepage content
- [ ] Create authentication system with environment variables
- [ ] Build design token API endpoints
- [ ] Add data validation with Zod schemas
- [ ] Test all API endpoints with sample data

**Step 3: Admin Interface Components**
- [ ] Build admin layout and navigation
- [ ] Create login system with session management
- [ ] Implement DesignTokenSelector component
- [ ] Build SectionForm with preset-only styling
- [ ] Create image upload functionality
- [ ] Test admin interface functionality

**Step 4: Frontend Integration**
- [ ] Update HomePageContent component for database integration
- [ ] Implement data transformation utilities
- [ ] Add real-time update mechanism
- [ ] Test complete frontend-backend integration
- [ ] Verify design system consistency

**Step 5: Security & Validation**
- [ ] Implement CSRF protection
- [ ] Add input validation for all forms
- [ ] Secure file upload with type validation
- [ ] Add rate limiting to API routes
- [ ] Test security measures

**Step 6: Testing & Verification**
- [ ] Create test data and scenarios
- [ ] Test all CRUD operations
- [ ] Verify design token restrictions
- [ ] Test authentication and authorization
- [ ] Performance testing and optimization

**Step 7: Deployment Preparation**
- [ ] Create environment configuration
- [ ] Set up production database
- [ ] Configure deployment settings
- [ ] Create backup procedures
- [ ] Final integration testing

### Phase 6: Security & Data Validation

#### Security Measures
- **Authentication**: Environment-based admin credentials
- **CSRF Protection**: Token-based protection for all admin operations
- **Input Validation**: Strict Zod schemas for all API inputs
- **File Upload Security**: Type validation, size limits, secure storage
- **SQL Injection Prevention**: Parameterized queries only
- **Rate Limiting**: API route protection against abuse

#### Data Validation Schemas
```typescript
// lib/validation.ts
import { z } from 'zod';

// Section validation with preset-only colors
export const sectionSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().max(5000),
  color_preset: z.string().regex(/^text-|bg-|border-/).optional(),
  image: z.string().url().max(500).optional()
});

// Project validation with gradient presets
export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(['ml', 'pd']),
  short_description: z.string().max(500),
  preview_image: z.string().url().max(500).optional(),
  gradient_preset: z.string().regex(/^from-|to-|via-/).optional(),
  is_featured: z.boolean().default(false)
});

// Admin authentication
export const adminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8)
});
```

### Phase 7: Design System Enforcement

#### Tailwind Config Integration
```javascript
// tailwind.config.js (existing)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#f0633f',
        secondary: '#191818',
        background: '#f7f4ed',
        accent: '#f0633f',
        // ... other predefined colors
      },
      fontFamily: {
        // ... predefined fonts
      },
      spacing: {
        // ... predefined spacing
      }
    }
  }
}
```

#### Admin UI Restrictions
- **Color Selection**: Dropdown of predefined Tailwind color classes only
- **Font Sizes**: Predefined text size classes (text-xs, text-sm, etc.)
- **Spacing**: Predefined spacing classes (p-1, p-2, etc.)
- **Gradients**: Predefined gradient classes (from-red-500, to-blue-600, etc.)
- **No Custom Values**: Absolute prevention of custom CSS values

#### Design Token API
```typescript
// app/api/design-tokens/route.ts
import { getDesignTokens } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  if (!type) {
    return Response.json({ error: 'Token type required' }, { status: 400 });
  }
  
  const tokens = getDesignTokens(type);
  return Response.json({ tokens });
}
```

## Risk Assessment & Mitigation

### Technical Risks
1. **Database Performance**: SQLite limitations with large datasets
   - *Mitigation*: Implement pagination, proper indexing

2. **Design System Consistency**: Risk of breaking Tailwind integration
   - *Mitigation*: Strict validation, preset-only approach

3. **Authentication Security**: Admin interface vulnerabilities
   - *Mitigation*: Environment-based credentials, secure sessions

### Implementation Risks
1. **Data Migration**: Content loss during migration
   - *Mitigation*: Full backup, rollback procedures

2. **Design Token Sync**: Tailwind config changes breaking presets
   - *Mitigation*: Automated sync checks, validation tests

## Verification Checklist

- [ ] All content migrated from JSON to SQLite
- [ ] Admin interface accessible and functional
- [ ] Design tokens properly restricted to presets
- [ ] No custom colors/styles can be created
- [ ] Frontend displays content correctly
- [ ] Authentication working securely
- [ ] All API endpoints responding correctly
- [ ] Data validation preventing invalid inputs
- [ ] Performance within acceptable limits
- [ ] Security measures implemented and tested

This plan provides a complete roadmap for AI-agent implementation, ensuring design system integrity while enabling content management through predefined Tailwind classes only.