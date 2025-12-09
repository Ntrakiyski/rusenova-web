'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Project } from '@/types/project';

interface PDProjectsTabsProps {
  projects: Project[];
  selectedProjectSlug: string;
  onSelectProject: (slug: string) => void;
  onRefresh: () => void;
}

export default function PDProjectsTabs({
  projects,
  selectedProjectSlug,
  onSelectProject,
  onRefresh
}: PDProjectsTabsProps) {
  return (
    <Tabs
      value={selectedProjectSlug}
      onValueChange={onSelectProject}
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white border border-gray-200">
        {projects.map((project) => (
          <TabsTrigger
            key={project.slug}
            value={project.slug}
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            {project.id}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}