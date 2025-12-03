'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ImagePicker from './ImagePicker';
import { Plus, Trash2 } from 'lucide-react';

interface MLPreviewEditorProps {
  mlPreview: {
    title: string;
    subtitle: string;
    projects: Array<{
      title: string;
      shortDescription: string;
      metrics: Array<{
        value: string;
        label: string;
      }>;
      previewImage?: string;
      gradientColors?: string[];
      slug: string;
    }>;
  };
  onChange: (mlPreview: any) => void;
}

export default function MLPreviewEditor({ mlPreview, onChange }: MLPreviewEditorProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({ ...mlPreview, [field]: value });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...mlPreview.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange({ ...mlPreview, projects: newProjects });
  };

  const handleMetricChange = (projectIndex: number, metricIndex: number, field: string, value: string) => {
    const newProjects = [...mlPreview.projects];
    const newMetrics = [...newProjects[projectIndex].metrics];
    newMetrics[metricIndex] = { ...newMetrics[metricIndex], [field]: value };
    newProjects[projectIndex] = { ...newProjects[projectIndex], metrics: newMetrics };
    onChange({ ...mlPreview, projects: newProjects });
  };

  const addMetric = (projectIndex: number) => {
    const newProjects = [...mlPreview.projects];
    const newMetric = { value: '0%', label: 'New Metric' };
    newProjects[projectIndex] = {
      ...newProjects[projectIndex],
      metrics: [...newProjects[projectIndex].metrics, newMetric]
    };
    onChange({ ...mlPreview, projects: newProjects });
  };

  const removeMetric = (projectIndex: number, metricIndex: number) => {
    const newProjects = [...mlPreview.projects];
    const newMetrics = newProjects[projectIndex].metrics.filter((_, i) => i !== metricIndex);
    newProjects[projectIndex] = { ...newProjects[projectIndex], metrics: newMetrics };
    onChange({ ...mlPreview, projects: newProjects });
  };

  const addProject = () => {
    const newProject = {
      title: 'New ML Project',
      shortDescription: 'Project description',
      metrics: [{ value: '0%', label: 'Metric' }],
      previewImage: '/gradient-orange-blue.png',
      slug: 'new-ml-project'
    };
    onChange({ ...mlPreview, projects: [...mlPreview.projects, newProject] });
  };

  const removeProject = (index: number) => {
    const newProjects = mlPreview.projects.filter((_, i) => i !== index);
    onChange({ ...mlPreview, projects: newProjects });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={mlPreview.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Machine Learning & AI"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Section Subtitle</Label>
        <Textarea
          id="subtitle"
          value={mlPreview.subtitle}
          onChange={(e) => handleInputChange('subtitle', e.target.value)}
          placeholder="Hands-on experimentation with fraud detection, retrieval systems, and autonomous agents."
          rows={3}
        />
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">ML Projects</h4>
          <Button onClick={addProject} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </Button>
        </div>

        <div className="space-y-6">
          {mlPreview.projects.map((project, projectIndex) => (
            <div key={projectIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Project {projectIndex + 1}</h5>
                <Button
                  onClick={() => removeProject(projectIndex)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    value={project.title}
                    onChange={(e) => handleProjectChange(projectIndex, 'title', e.target.value)}
                    placeholder="Project title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={project.slug}
                    onChange={(e) => handleProjectChange(projectIndex, 'slug', e.target.value)}
                    placeholder="project-slug"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Short Description</Label>
                <Textarea
                  value={project.shortDescription}
                  onChange={(e) => handleProjectChange(projectIndex, 'shortDescription', e.target.value)}
                  placeholder="Brief description of the project"
                  rows={2}
                />
              </div>

              <ImagePicker
                label="Preview Image"
                value={project.previewImage || ''}
                onChange={(val) => handleProjectChange(projectIndex, 'previewImage', val)}
              />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Metrics</Label>
                  <Button
                    onClick={() => addMetric(projectIndex)}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Metric
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex gap-2">
                      <Input
                        value={metric.value}
                        onChange={(e) => handleMetricChange(projectIndex, metricIndex, 'value', e.target.value)}
                        placeholder="92%"
                        className="flex-1"
                      />
                      <Input
                        value={metric.label}
                        onChange={(e) => handleMetricChange(projectIndex, metricIndex, 'label', e.target.value)}
                        placeholder="Precision"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeMetric(projectIndex, metricIndex)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {project.metrics.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <p>No metrics added yet. Click "Add Metric" to create your first metric.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {mlPreview.projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No projects added yet. Click "Add Project" to create your first ML project.</p>
          </div>
        )}
      </Card>

      
    </div>
  );
}
