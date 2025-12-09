'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';

interface MLProjectsTabsProps {
  projects: Project[];
  selectedProjectSlug: string;
  onSelectProject: (slug: string) => void;
}

export default function MLProjectsTabs({
  projects,
  selectedProjectSlug,
  onSelectProject
}: MLProjectsTabsProps) {
  return (
    <Tabs
      value={selectedProjectSlug}
      onValueChange={onSelectProject}
      className="w-full"
    >
      <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-white border border-gray-200">
        {projects.map((project) => (
          <TabsTrigger
            key={project.slug}
            value={project.slug}
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            {project.title || project.id}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}


