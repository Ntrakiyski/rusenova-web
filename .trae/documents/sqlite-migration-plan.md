# SQLite Migration Plan for Portfolio Homepage

## Executive Summary

This document outlines a comprehensive plan to migrate the portfolio website's homepage content from JSON/TS files to SQLite database with a protected admin interface. The migration will focus initially on homepage content (text, images, colors) while maintaining the existing design system from Tailwind config and globals.css.

## Current State Analysis

### Data Structure
- **Homepage content**: Stored in `app/data/homeContent.json` (285 lines)
- **Project data**: Stored in `app/data/mlProjects.ts` and `app/data/productDesignProjects.ts`
- **Design system**: Colors defined in JSON but also available in Tailwind config and globals.css
- **Type safety**: Strong TypeScript interfaces in `types/project.ts`

### Key Content Sections
1. **Meta Information**: Version, last updated
2. **Colors**: Primary, secondary, background, text variants, border
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
  type text default 'string', -- 'string', 'json', 'color'
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);

create table homepage_sections (
  id integer primary key,
  section_type text not null, -- 'hero', 'services', 'features', 'about', 'contact'
  content_json text not null, -- JSON string for flexible content
  background_color text,
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
  gradient_colors text, -- JSON array
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
  gradient_colors text,
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
```

#### Initial Data Migration Script
```typescript
// scripts/migrate-homepage-data.ts
import { db } from '@/lib/db';
import homeContent from '@/app/data/homeContent.json';

async function migrateHomepageData() {
  // Migrate colors to site_settings
  await db.run(`
    INSERT INTO site_settings (key, value, type) VALUES 
    ('color_primary', '${homeContent.colors.primary}', 'color'),
    ('color_secondary', '${homeContent.colors.secondary}', 'color'),
    ('color_background', '${homeContent.colors.background}', 'color'),
    ('color_text_primary', '${homeContent.colors.text.primary}', 'color'),
    ('color_text_secondary', '${homeContent.colors.text.secondary}', 'color'),
    ('color_text_accent', '${homeContent.colors.text.accent}', 'color'),
    ('color_text_muted', '${homeContent.colors.text.muted}', 'color'),
    ('color_border', '${homeContent.colors.border}', 'color')
  `);

  // Migrate hero section
  await db.run(`
    INSERT INTO homepage_sections (section_type, content_json, background_color, order_index)
    VALUES ('hero', '${JSON.stringify(homeContent.hero)}', '${homeContent.hero.backgroundColor}', 0)
  `);

  // Migrate services section
  await db.run(`
    INSERT INTO homepage_sections (section_type, content_json, order_index)
    VALUES ('services', '${JSON.stringify(homeContent.services)}', 1)
  `);

  // Continue for other sections...
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
│   └── colors/route.ts         # GET color settings
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
│   ├── colors/page.tsx         # Color scheme editor
│   ├── general/page.tsx        # General settings
│   └── appearance/page.tsx     # Appearance settings
└── components/
    ├── AdminLayout.tsx         # Admin layout wrapper
    ├── Sidebar.tsx             # Admin navigation
    ├── ContentEditor.tsx       # Rich text editor
    ├── ImageUpload.tsx         # Image upload component
    ├── ColorPicker.tsx         # Color picker component
    └── SectionForm.tsx         # Reusable section form
```

#### Key Admin Components

**AdminLayout Component:**
```typescript
// app/admin/components/AdminLayout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/admin/auth/check');
      const data = await response.json();
      
      if (!data.authenticated) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
```

**Homepage Editor Component:**
```typescript
// app/admin/homepage/page.tsx
'use client';

import { useState, useEffect } from 'react';
import SectionForm from '../components/SectionForm';
import { Button } from '@/components/ui/button';

export default function HomepageEditor() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  async function fetchSections() {
    try {
      const response = await fetch('/api/homepage');
      const data = await response.json();
      setSections(data.sections);
    } catch (error) {
      console.error('Failed to fetch sections:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateSection(id: number, content: any) {
    try {
      const response = await fetch(`/api/homepage/sections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      
      if (response.ok) {
        fetchSections(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to update section:', error);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Homepage Editor</h1>
        <Button onClick={() => window.open('/', '_blank')}>
          View Site
        </Button>
      </div>

      {sections.map((section) => (
        <SectionForm
          key={section.id}
          section={section}
          onSave={(content) => updateSection(section.id, content)}
        />
      ))}
    </div>
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
  
  // Build colors object from settings
  const colors = {
    primary: getSetting(settings, 'color_primary', '#f0633f'),
    secondary: getSetting(settings, 'color_secondary', '#191818'),
    background: getSetting(settings, 'color_background', '#f7f4ed'),
    text: {
      primary: getSetting(settings, 'color_text_primary', '#191818'),
      secondary: getSetting(settings, 'color_text_secondary', '#494848'),
      accent: getSetting(settings, 'color_text_accent', '#f0633f'),
      muted: getSetting(settings, 'color_text_muted', '#babcc0')
    },
    border: getSetting(settings, 'color_border', '#e5e7eb')
  };

  // Build sections
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
    hero: heroSection ? JSON.parse(heroSection.content_json) : getDefaultHero(),
    services: servicesSection ? JSON.parse(servicesSection.content_json) : getDefaultServices(),
    features: featuresSection ? JSON.parse(featuresSection.content_json) : getDefaultFeatures(),
    mlPreview: {
      title: getSetting(settings, 'ml_preview_title', 'Machine Learning & AI'),
      subtitle: getSetting(settings, 'ml_preview_subtitle', 'Hands-on experimentation...'),
      projects: transformProjects(projects, 'ml')
    },
    pdPreview: {
      title: getSetting(settings, 'pd_preview_title', 'Product Design'),
      subtitle: getSetting(settings, 'pd_preview_subtitle', 'This is my working experience...'),
      projects: transformWorkExperience(workExperience)
    },
    about: aboutSection ? JSON.parse(aboutSection.content_json) : getDefaultAbout(),
    contact: getDefaultContact(),
    footer: getDefaultFooter()
  };
}
```

### Phase 5: Implementation Timeline & Dependencies

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

#### Implementation Steps

**Week 1: Database & Backend Setup**
1. Set up SQLite database with schema
2. Create data migration scripts
3. Build API routes for homepage content
4. Implement authentication system
5. Test data migration and API endpoints

**Week 2: Admin Interface Development**
1. Create admin layout and navigation
2. Build login system
3. Develop homepage editor interface
4. Implement section forms and validation
5. Add image upload functionality

**Week 3: Frontend Integration & Testing**
1. Update HomePageContent component
2. Implement data transformation utilities
3. Add real-time updates from admin changes
4. Test full integration
5. Performance optimization

**Week 4: Polish & Deployment**
1. Add error handling and fallbacks
2. Implement data validation
3. Add backup/restore functionality
4. Documentation and training
5. Production deployment

### Phase 6: Security & Validation

#### Security Measures
- **Authentication**: Secure admin login with environment variables
- **CSRF Protection**: Implement CSRF tokens for admin operations
- **Input Validation**: Zod schemas for all API inputs
- **File Upload Security**: Validate file types and sizes
- **SQL Injection Prevention**: Use parameterized queries
- **Rate Limiting**: Implement rate limiting on API routes

#### Data Validation Schemas
```typescript
// lib/validation.ts
import { z } from 'zod';

export const heroSectionSchema = z.object({
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  badge: z.string().max(50),
  title: z.string().max(200),
  subtitle: z.string().max(500),
  buttons: z.array(z.object({
    text: z.string().max(50),
    link: z.string().url().or(z.string().regex(/^mailto:/)),
    style: z.enum(['primary', 'secondary'])
  })).max(5),
  image: z.object({
    src: z.string().max(500),
    alt: z.string().max(200)
  })
});

export const colorSettingSchema = z.object({
  key: z.string().regex(/^color_/),
  value: z.string().regex(/^#[0-9a-fA-F]{6}$/)
});
```

### Phase 7: Backup & Maintenance

#### Backup Strategy
- **Automated Backups**: Daily database backups
- **Manual Export**: Admin can export all data as JSON
- **Version Control**: Track content changes over time
- **Rollback Capability**: Ability to restore previous versions

#### Maintenance Tools
- **Database Migration**: Scripts for schema updates
- **Content Audit**: Track who changed what and when
- **Performance Monitoring**: Query performance tracking
- **Health Checks**: Database integrity verification

## Risk Assessment & Mitigation

### Technical Risks
1. **Database Performance**: SQLite may slow with large datasets
   - *Mitigation*: Implement pagination, indexing, and consider PostgreSQL for scale

2. **Data Loss**: Risk of losing content during migration
   - *Mitigation*: Full backup before migration, rollback procedures

3. **Authentication Security**: Admin interface security vulnerabilities
   - *Mitigation*: Environment-based credentials, secure session management

### Operational Risks
1. **Content Freeze**: Need to freeze content updates during migration
   - *Mitigation*: Coordinate with stakeholders, implement content freeze period

2. **Learning Curve**: Admin interface adoption
   - *Mitigation*: User training, intuitive interface design, documentation

## Success Metrics

- **Migration Success**: All homepage content successfully migrated to SQLite
- **Admin Usability**: Admin can update content within 2 minutes
- **Performance**: Page load times remain under 3 seconds
- **Reliability**: 99.9% uptime with new system
- **Security**: Zero security breaches in first 30 days

## Next Steps

1. **Review & Approve**: Stakeholder review of this migration plan
2. **Environment Setup**: Set up development environment with SQLite
3. **Schema Implementation**: Create database schema and migration scripts
4. **Prototype Development**: Build MVP of admin interface
5. **Testing & Validation**: Comprehensive testing of all components
6. **Production Deployment**: Deploy to production with monitoring

This plan provides a comprehensive roadmap for successfully migrating your portfolio homepage to SQLite while maintaining all existing functionality and adding powerful content management capabilities.