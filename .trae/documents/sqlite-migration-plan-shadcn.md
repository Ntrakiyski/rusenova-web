# SQLite Migration Plan for Portfolio Homepage with shadcn/ui Components

## Executive Summary

This document outlines a comprehensive plan to migrate the portfolio website's homepage content from JSON/TS files to SQLite database with a protected admin interface, using shadcn/ui components for the admin interface. The migration will focus initially on homepage content (text, images, colors) while maintaining the existing design system and building a modern admin interface using shadcn components.

## Current State Analysis

### Data Structure
- **Homepage content**: Stored in `app/data/homeContent.json` (285 lines)
- **Design system**: Colors defined in JSON but also available in Tailwind config and globals.css
- **Existing shadcn components**: 13 components available in `components/ui/`
- **Required additional components**: 15+ components needed for comprehensive admin interface

### Homepage Sections Breakdown
1. **Hero Section**: Badge, title, subtitle, buttons (2), image
2. **Services Section**: Title, service items array (3 items)
3. **Features Section**: Background color, title, subtitle, feature items with icons (4 items)
4. **ML Preview**: Title, subtitle, project previews with metrics (2 projects, 3 metrics each)
5. **PD Preview**: Title, subtitle, work experience previews (4 experiences, 1 metric each)
6. **About Section**: Badge, title, paragraphs (2), stats (3), image
7. **Contact Section**: Title, subtitle, email, LinkedIn, opportunities (3 groups)
8. **Footer**: Brand info, social links (3), sections (3), legal

## shadcn/ui Components Architecture

### Required Components for Admin Interface

#### Layout & Navigation Components
```
┌─────────────────────────────────────────────────────────────┐
│                    Admin Dashboard                         │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌───────────────────────────────────────┐ │
│ │   Sidebar   │ │            Main Content               │ │
│ │             │ │                                       │ │
│ │ • Dashboard │ │    [Card] Homepage Editor             │ │
│ │ • Homepage  │ │    [Tabs] Section Management        │ │
│ │ • Projects  │ │    [Form] Content Forms             │ │
│ │ • Settings  │ │    [Button] Save/Update Actions      │ │
│ │ • Logout    │ │                                       │ │
│ └─────────────┘ └───────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Component Requirements by Section

**Hero Section Editor:**
- `Card` - Main container for hero section editor
- `Input` - Title, subtitle, badge text fields
- `Button` - Primary/secondary button configuration
- `Select` - Button style selection (primary/secondary)
- `Label` - Form field labels
- `Textarea` - Longer description fields
- `Sheet` - Image upload and preview

**Services Section Editor:**
- `Card` - Service item containers
- `Input` - Service title inputs
- `Button` - Add/remove service items
- `Badge` - Service count indicator
- `Collapsible` - Expandable service item editors

**Features Section Editor:**
- `Card` - Feature item containers  
- `Input` - Feature title and description
- `Textarea` - Feature description (longer text)
- `Button` - Add/remove features
- `Badge` - Feature count
- `Select` - Icon selection dropdown
- `Collapsible` - Expandable feature editors

**Project Preview Editors (ML & PD):**
- `Card` - Project preview containers
- `Input` - Project title, company, role fields
- `Textarea` - Project description
- `Button` - Add/remove projects
- `Badge` - Project count
- `Table` - Metrics management (value/label pairs)
- `Sheet` - Image upload and gradient color selection
- `Select` - Project category and slug selection

**About Section Editor:**
- `Card` - About section container
- `Input` - Badge, title fields
- `Textarea` - Paragraph content (multiple)
- `Button` - Add/remove paragraphs
- `Badge` - Paragraph count
- `Table` - Stats management (value/label pairs)
- `Sheet` - Image upload and preview

**Contact Section Editor:**
- `Card` - Contact section container
- `Input` - Title, subtitle, email, LinkedIn URL
- `Textarea` - Opportunity descriptions
- `Button` - Add/remove opportunity groups
- `Badge` - Opportunity count

**Footer Section Editor:**
- `Card` - Footer section containers
- `Input` - Section titles, link labels, URLs
- `Button` - Add/remove sections and links
- `Table` - Link management within sections
- `Badge` - Section and link counts

**Settings & Configuration:**
- `Tabs` - Color settings, general settings, appearance
- `Card` - Setting group containers
- `Input` - Color hex values, text settings
- `Select` - Theme selection, layout options
- `Button` - Save settings, reset to defaults
- `Badge` - Setting status indicators

### Additional Required shadcn Components

Based on the admin interface requirements, the following components need to be added:

**Form & Input Components:**
- `Form` - Comprehensive form handling with validation
- `Field` - Enhanced form field wrapper
- `Checkbox` - Boolean settings and options
- `Radio Group` - Single selection options
- `Switch` - Toggle settings (on/off)
- `Slider` - Numeric range inputs (for spacing, sizes)
- `Date Picker` - Content scheduling and timestamps

**Data Display Components:**
- `Avatar` - User profile and image previews
- `Progress` - Upload progress and loading states
- `Skeleton` - Loading placeholders
- `Toast` - Success/error notifications
- `Alert` - Important notifications and warnings
- `Alert Dialog` - Confirmation dialogs (delete actions)
- `Hover Card` - Tooltips and additional info

**Navigation & Layout:**
- `Breadcrumb` - Admin navigation path
- `Command` - Quick search and actions
- `Context Menu` - Right-click actions
- `Dialog` - Modal dialogs for complex operations
- `Drawer` - Side panels for mobile admin
- `Dropdown Menu` - Action menus
- `Navigation Menu` - Enhanced navigation
- `Pagination` - For large content lists
- `Popover` - Contextual information
- `Scroll Area` - Scrollable content areas
- `Separator` - Visual content separation

**Advanced Components:**
- `Data Table` - For managing large datasets (projects, settings)
- `Resizable` - Adjustable panel sizes
- `Toggle` - View mode switches
- `Toggle Group` - Button groups for actions

## Database Schema Design

### Core Tables for Homepage Content

```sql
-- Site settings for colors and general configuration
create table site_settings (
  id integer primary key,
  key text unique not null,
  value text not null,
  type text default 'string',
  group text default 'general', -- 'colors', 'general', 'appearance'
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);

-- Homepage sections with flexible JSON content
create table homepage_sections (
  id integer primary key,
  section_type text not null, -- 'hero', 'services', 'features', 'about', 'contact'
  content_json text not null,
  background_color text,
  order_index integer default 0,
  is_active boolean default true,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);

-- Project data for ML and PD previews
create table projects (
  id integer primary key,
  title text not null,
  slug text unique not null,
  category text not null, -- 'ml' or 'pd'
  short_description text,
  preview_image text,
  gradient_colors text, -- JSON array for gradient
  is_featured boolean default false,
  order_index integer default 0,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);

-- Project metrics (for ML and PD projects)
create table project_metrics (
  id integer primary key,
  project_id integer references projects(id) on delete cascade,
  value text not null,
  label text not null,
  order_index integer default 0
);

-- Work experience for PD preview
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
  updated_at datetime current_timestamp
);

-- Footer sections and links
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

-- Social media links
create table social_links (
  id integer primary key,
  platform text not null,
  url text not null,
  aria_label text not null,
  order_index integer default 0
);

-- Content audit trail
create table content_audit (
  id integer primary key,
  table_name text not null,
  record_id integer not null,
  action text not null, -- 'create', 'update', 'delete'
  old_values text, -- JSON of previous values
  new_values text, -- JSON of new values
  user_agent text,
  ip_address text,
  created_at datetime default current_timestamp
);
```

## Admin Interface Architecture

### Route Structure with shadcn Components

```
app/admin/
├── login/page.tsx              # Card, Form, Input, Button, Label
├── dashboard/page.tsx          # Card, Tabs, Button, Badge
├── homepage/
│   ├── page.tsx                # Card, Tabs, Button, Data Table
│   ├── sections/
│   │   ├── [id]/page.tsx       # Card, Form, Input, Textarea, Button
│   │   └── new/page.tsx        # Same as edit but with defaults
│   ├── hero/page.tsx           # Card, Form, Input, Textarea, Sheet
│   ├── services/page.tsx       # Card, Collapsible, Input, Button
│   ├── features/page.tsx       # Card, Collapsible, Input, Textarea, Select
│   ├── about/page.tsx          # Card, Form, Input, Textarea, Table, Sheet
│   └── contact/page.tsx        # Card, Form, Input, Textarea, Button
├── projects/
│   ├── page.tsx                # Card, Data Table, Button, Badge
│   ├── [id]/page.tsx           # Card, Form, Input, Textarea, Table, Sheet
│   └── new/page.tsx            # Same as edit but with defaults
├── settings/
│   ├── colors/page.tsx         # Card, Input, Button, Color Picker
│   ├── general/page.tsx        # Card, Form, Input, Switch, Select
│   └── appearance/page.tsx     # Card, Form, Select, Toggle, Input
└── components/
    ├── AdminLayout.tsx         # Sidebar, Navigation, Card
    ├── Sidebar.tsx             # Navigation Menu, Button, Badge
    ├── ContentEditor.tsx       # Card, Textarea, Button, Toolbar
    ├── ImageUpload.tsx         # Sheet, Button, Input, Progress
    ├── ColorPicker.tsx         # Input, Button, Popover
    ├── SectionForm.tsx         # Card, Form, Input, Button
    ├── DataTable.tsx           # Data Table, Button, Badge, Input
    ├── FormField.tsx           # Form, Input, Label, Textarea
    └── Notification.tsx        # Toast, Alert, Badge
```

### Key Admin Components with shadcn

**AdminLayout Component:**
```typescript
// app/admin/components/AdminLayout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    return (
      <Card className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Loading...</span>
        </div>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <Card className="p-6">
          {children}
        </Card>
      </main>
    </div>
  );
}
```

**Homepage Editor with Tabs:**
```typescript
// app/admin/homepage/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '../components/DataTable';

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

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Loading sections...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Homepage Editor</h1>
          <div className="flex space-x-2">
            <Badge variant="outline">{sections.length} sections</Badge>
            <Button onClick={() => window.open('/', '_blank')}>
              View Site
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sections" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sections" className="space-y-4">
            <DataTable data={sections} columns={sectionColumns} />
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            {/* Content management interface */}
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            {/* Color and appearance settings */}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            {/* General settings */}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
```

## Implementation Strategy

### Phase 1: Component Setup (Week 1)
1. **Install additional shadcn components:**
   ```bash
   npx shadcn-ui@latest add form field checkbox radio-group switch slider date-picker
   npx shadcn-ui@latest add avatar progress skeleton toast alert alert-dialog hover-card
   npx shadcn-ui@latest add breadcrumb command context-menu dialog drawer dropdown-menu
   npx shadcn-ui@latest add navigation-menu pagination popover scroll-area separator
   npx shadcn-ui@latest add data-table resizable toggle toggle-group
   ```

2. **Set up component aliases and imports:**
   ```typescript
   // lib/shadcn-components.ts
   export * from '@/components/ui/card';
   export * from '@/components/ui/button';
   export * from '@/components/ui/input';
   export * from '@/components/ui/label';
   export * from '@/components/ui/form';
   export * from '@/components/ui/field';
   // ... etc
   ```

### Phase 2: Database & Backend (Week 1-2)
1. **Set up SQLite database with comprehensive schema**
2. **Create API routes with proper validation:**
   ```typescript
   // app/api/homepage/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   import { z } from 'zod';
   import { db } from '@/lib/db';
   
   const homepageSchema = z.object({
     sections: z.array(z.object({
       section_type: z.enum(['hero', 'services', 'features', 'about', 'contact']),
       content_json: z.string(),
       background_color: z.string().optional(),
       order_index: z.number().int().min(0),
       is_active: z.boolean().default(true)
     }))
   });
   ```

### Phase 3: Admin Interface Development (Week 2-3)
1. **Build admin layout with Sidebar and Navigation**
2. **Create section-specific editors:**
   - Hero section editor with image upload
   - Services management with drag-and-drop reordering
   - Features editor with icon selection
   - Project preview editors with metrics management
   - About section editor with stats and image
   - Contact section with opportunity management
   - Footer editor with link management

3. **Implement settings panels:**
   - Color scheme editor with live preview
   - General settings with form validation
   - Appearance settings with theme options

### Phase 4: Advanced Features (Week 3-4)
1. **Data Table implementation for large datasets:**
   ```typescript
   // app/admin/components/DataTable.tsx
   import {
     ColumnDef,
     flexRender,
     getCoreRowModel,
     useReactTable,
   } from '@tanstack/react-table';
   import { Card } from '@/components/ui/card';
   import { Button } from '@/components/ui/button';
   import { Input } from '@/components/ui/input';
   import { Badge } from '@/components/ui/badge';
   ```

2. **Real-time preview with live updates:**
   - WebSocket integration for instant updates
   - Preview mode with iframe integration
   - Staging environment for testing changes

3. **Content audit and version control:**
   - Track all changes with user attribution
   - Rollback functionality for previous versions
   - Export/import functionality for backup

### Phase 5: Testing & Optimization (Week 4)
1. **Comprehensive testing:**
   - Unit tests for all components
   - Integration tests for API routes
   - E2E tests for admin workflows
   - Performance testing for large datasets

2. **Security hardening:**
   - CSRF protection on all forms
   - Rate limiting on API endpoints
   - Input sanitization and validation
   - Secure file upload handling

## Component Usage Examples

### Hero Section Form
```typescript
// app/admin/homepage/hero/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const heroFormSchema = z.object({
  badge: z.string().max(50, 'Badge must be 50 characters or less'),
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  subtitle: z.string().min(10, 'Subtitle must be at least 10 characters').max(500),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color'),
  imageSrc: z.string().url().or(z.string().startsWith('/')),
  imageAlt: z.string().max(200),
  buttons: z.array(z.object({
    text: z.string().max(50),
    link: z.string().url().or(z.string().startsWith('mailto:')),
    style: z.enum(['primary', 'secondary'])
  })).max(3, 'Maximum 3 buttons allowed')
});

export default function HeroEditor() {
  const form = useForm({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      badge: 'HUMAN & AI',
      title: 'Smart systems build for real people',
      subtitle: 'Hi, I\'m Gloria and I bend Product Design & Machine Learning...',
      backgroundColor: '#f7f4ed',
      imageSrc: '/hero-diamond.png',
      imageAlt: '',
      buttons: [
        { text: 'Email', link: 'mailto:gloriarusenovaa@gmail.com', style: 'primary' },
        { text: 'LinkedIn', link: 'https://www.linkedin.com/in/gloriarusenova/', style: 'secondary' }
      ]
    }
  });

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero Section Editor</h1>
        <Badge variant="outline">Live Preview Available</Badge>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="badge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge Text</FormLabel>
                <FormControl>
                  <Input placeholder="Enter badge text..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Title</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter hero title..." 
                    {...field} 
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Additional form fields for subtitle, color, image, buttons */}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => resetForm()}>
              Reset
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
```

### Project Management Data Table
```typescript
// app/admin/components/ProjectDataTable.tsx
'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const columns: ColumnDef[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <Badge variant={row.getValue('category') === 'ml' ? 'default' : 'secondary'}>
        {row.getValue('category')}
      </Badge>
    ),
  },
  {
    accessorKey: 'is_featured',
    header: 'Featured',
    cell: ({ row }) => (
      <Badge variant={row.getValue('is_featured') ? 'default' : 'outline'}>
        {row.getValue('is_featured') ? 'Yes' : 'No'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => viewProject(project.slug)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editProject(project.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteProject(project.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ProjectDataTable({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-lg font-semibold">Projects</h2>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter projects..."
            value={table.getColumn('title')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button onClick={() => createNewProject()}>
            Add Project
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        {/* Data table implementation */}
      </div>
      
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
```

## Color Management System

### Color Settings Interface
```typescript
// app/admin/settings/colors/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from 'react-colorful';

const colorGroups = {
  primary: {
    primary: '#f0633f',
    secondary: '#191818',
    background: '#f7f4ed'
  },
  text: {
    'text-primary': '#191818',
    'text-secondary': '#494848',
    'text-accent': '#f0633f',
    'text-muted': '#babcc0'
  },
  ui: {
    border: '#e5e7eb',
    'border-secondary': '#d1d5db',
    'background-secondary': '#f9fafb'
  }
};

export default function ColorSettings() {
  const [colors, setColors] = useState(colorGroups);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Color Settings</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={resetColors}>
              Reset to Defaults
            </Button>
            <Button onClick={saveColors}>
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {Object.entries(colors).map(([group, groupColors]) => (
            <Card key={group} className="p-4">
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {group.replace('-', ' ')} Colors
              </h3>
              <div className="grid gap-4">
                {Object.entries(groupColors).map(([name, value]) => (
                  <div key={name} className="flex items-center space-x-4">
                    <Label htmlFor={name} className="w-32 capitalize">
                      {name.replace('-', ' ')}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id={name}
                        value={value}
                        onChange={(e) => updateColor(group, name, e.target.value)}
                        className="w-32 font-mono"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-10 h-10 p-0"
                            style={{ backgroundColor: value }}
                          >
                            <span className="sr-only">Pick color</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <HexColorPicker
                            color={value}
                            onChange={(newColor) => updateColor(group, name, newColor)}
                          />
                        </PopoverContent>
                      </Popover>
                      <Badge variant="secondary">{value}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
        <div className="p-6 rounded-lg" style={{ backgroundColor: colors.primary.background }}>
          <div className="space-y-4">
            <Badge style={{ backgroundColor: colors.primary.primary }}>
              Preview Badge
            </Badge>
            <h3 style={{ color: colors.text['text-primary'] }}>
              Sample Heading
            </h3>
            <p style={{ color: colors.text['text-secondary'] }}>
              Sample paragraph text to preview color combinations.
            </p>
            <div className="flex space-x-2">
              <Button style={{ backgroundColor: colors.primary.primary }}>
                Primary Button
              </Button>
              <Button variant="outline" style={{ borderColor: colors.ui.border }}>
                Secondary Button
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

## Security & Validation

### Form Validation with Zod
```typescript
// lib/validation/homepage.ts
import { z } from 'zod';

// Color validation
export const colorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/, {
  message: 'Must be a valid hex color code (e.g., #f0633f)'
});

// Hero section validation
export const heroSectionSchema = z.object({
  badge: z.string().max(50, 'Badge must be 50 characters or less'),
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  subtitle: z.string().min(10, 'Subtitle must be at least 10 characters').max(500),
  backgroundColor: colorSchema,
  image: z.object({
    src: z.string().max(500),
    alt: z.string().max(200)
  }),
  buttons: z.array(z.object({
    text: z.string().max(50),
    link: z.string().url().or(z.string().regex(/^mailto:/)),
    style: z.enum(['primary', 'secondary'])
  })).max(3, 'Maximum 3 buttons allowed')
});

// Services section validation
export const servicesSectionSchema = z.object({
  title: z.string().max(100),
  items: z.array(z.string().max(100)).min(1, 'At least one service required').max(10)
});

// Features section validation
export const featuresSectionSchema = z.object({
  backgroundColor: colorSchema,
  title: z.string().max(100),
  subtitle: z.string().max(300),
  items: z.array(z.object({
    title: z.string().max(100),
    description: z.string().max(300),
    icon: z.string().max(500)
  })).min(1, 'At least one feature required').max(8)
});

// Project validation
export const projectSchema = z.object({
  title: z.string().max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  category: z.enum(['ml', 'pd']),
  shortDescription: z.string().max(500),
  previewImage: z.string().max(500),
  gradientColors: z.array(z.string()).max(5),
  isFeatured: z.boolean(),
  metrics: z.array(z.object({
    value: z.string().max(50),
    label: z.string().max(100)
  })).max(5)
});

// Settings validation
export const settingsSchema = z.object({
  colors: z.object({
    primary: colorSchema,
    secondary: colorSchema,
    background: colorSchema,
    text: z.object({
      primary: colorSchema,
      secondary: colorSchema,
      accent: colorSchema,
      muted: colorSchema
    }),
    border: colorSchema
  }),
  general: z.object({
    siteTitle: z.string().max(100),
    siteDescription: z.string().max(500),
    authorName: z.string().max(100)
  })
});
```

### Security Middleware
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin route protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin-session');
    
    if (!session && !request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // API route protection
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    const session = request.cookies.get('admin-session');
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
```

## Performance Optimization

### Component Lazy Loading
```typescript
// app/admin/components/LazyComponent.tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton className="w-full h-64" />,
  ssr: false
});

const ColorPicker = dynamic(() => import('./ColorPicker'), {
  loading: () => <Button disabled>Loading Color Picker...</Button>
});
```

### Data Caching Strategy
```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache';

export const getHomepageContent = unstable_cache(
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homepage`);
    return response.json();
  },
  ['homepage-content'],
  {
    revalidate: 60, // 1 minute
    tags: ['homepage']
  }
);

export const getProjects = unstable_cache(
  async (category: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?category=${category}`);
    return response.json();
  },
  ['projects'],
  {
    revalidate: 300, // 5 minutes
    tags: ['projects']
  }
);
```

## Deployment & Monitoring

### Environment Variables
```bash
# .env.local
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your_hashed_password_here
DATABASE_URL=./portfolio.db
NEXT_PUBLIC_API_URL=http://localhost:3000
SESSION_SECRET=your_session_secret_here
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=5242880 # 5MB
```

### Health Check Endpoint
```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Check database connection
    const result = db.prepare('SELECT COUNT(*) as count FROM site_settings').get();
    
    // Check disk space (if applicable)
    const stats = fs.statSync('./portfolio.db');
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        settings_count: result.count
      },
      storage: {
        database_size: stats.size
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    }, { status: 500 });
  }
}
```

This comprehensive plan provides a detailed roadmap for migrating the portfolio homepage to SQLite with a modern shadcn/ui-based admin interface, ensuring maintainability, security, and excellent user experience.