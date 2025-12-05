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

      {projects.map((project) => (
        <TabsContent
          key={project.slug}
          value={project.slug}
          className="space-y-6 mt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{project.id}</h2>
              <p className="text-gray-600">
                {project.title || project.shortDescription || 'Product Design Project'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onRefresh}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Refresh
              </button>
              <button
                onClick={() => window.open(`/product-design/${project.slug}`, '_blank')}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Preview
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p><strong>Slug:</strong> {project.slug}</p>
            {project.heroTitle && (
              <p><strong>Role:</strong> {project.heroTitle}</p>
            )}
            {project.heroDescription && (
              <p><strong>Company:</strong> {project.heroDescription}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Project Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>ID:</strong> {project.id}</p>
                  <p><strong>Slug:</strong> {project.slug}</p>
                  {project.title && (
                    <p><strong>Title:</strong> {project.title}</p>
                  )}
                  {project.shortDescription && (
                    <p><strong>Description:</strong> {project.shortDescription}</p>
                  )}
                  {project.previewImage && (
                    <p><strong>Preview Image:</strong> {project.previewImage}</p>
                  )}
                </div>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Metrics</h3>
                  <div className="space-y-2">
                    {project.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-sm text-gray-600">{metric.label}</span>
                        <span className="text-sm font-semibold text-gray-900">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Sections</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {project.sections.length} section(s) in this project
                </p>
                <div className="space-y-3">
                  {project.sections.map((section, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {section.title || `Section ${index + 1}`}
                          </h4>
                          <p className="text-xs text-gray-500 capitalize">{section.type.replace('-', ' ')}</p>
                          {section.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {section.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}