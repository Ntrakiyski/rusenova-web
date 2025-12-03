'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ImagePicker from './ImagePicker';
import { Plus, Trash2 } from 'lucide-react';

interface PDPreviewEditorProps {
  pdPreview: {
    title: string;
    subtitle: string;
    projects: Array<{
      title: string;
      role: string;
      company: string;
      shortDescription: string;
      previewImage?: string;
      gradientColors?: string[];
      slug: string;
      metrics: Array<{
        value: string;
        label: string;
      }>;
    }>;
  };
  onChange: (pdPreview: any) => void;
}

export default function PDPreviewEditor({ pdPreview, onChange }: PDPreviewEditorProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({ ...pdPreview, [field]: value });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...pdPreview.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange({ ...pdPreview, projects: newProjects });
  };

  const handleMetricChange = (projectIndex: number, metricIndex: number, field: string, value: string) => {
    const newProjects = [...pdPreview.projects];
    const newMetrics = [...newProjects[projectIndex].metrics];
    newMetrics[metricIndex] = { ...newMetrics[metricIndex], [field]: value };
    newProjects[projectIndex] = { ...newProjects[projectIndex], metrics: newMetrics };
    onChange({ ...pdPreview, projects: newProjects });
  };

  const addMetric = (projectIndex: number) => {
    const newProjects = [...pdPreview.projects];
    const newMetric = { value: '', label: 'New Metric' };
    newProjects[projectIndex] = {
      ...newProjects[projectIndex],
      metrics: [...newProjects[projectIndex].metrics, newMetric]
    };
    onChange({ ...pdPreview, projects: newProjects });
  };

  const removeMetric = (projectIndex: number, metricIndex: number) => {
    const newProjects = [...pdPreview.projects];
    const newMetrics = newProjects[projectIndex].metrics.filter((_, i) => i !== metricIndex);
    newProjects[projectIndex] = { ...newProjects[projectIndex], metrics: newMetrics };
    onChange({ ...pdPreview, projects: newProjects });
  };

  const addProject = () => {
    const newProject = {
      title: 'New Company',
      role: 'Role',
      company: 'Company Name',
      shortDescription: 'Company description',
      previewImage: '/gradient-orange-pink.png',
      slug: 'new-company',
      metrics: [{ value: '', label: 'Metric' }]
    };
    onChange({ ...pdPreview, projects: [...pdPreview.projects, newProject] });
  };

  const removeProject = (index: number) => {
    const newProjects = pdPreview.projects.filter((_, i) => i !== index);
    onChange({ ...pdPreview, projects: newProjects });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={pdPreview.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Product Design"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Section Subtitle</Label>
        <Textarea
          id="subtitle"
          value={pdPreview.subtitle}
          onChange={(e) => handleInputChange('subtitle', e.target.value)}
          placeholder="This is my working experience company wide with just a few selected projects"
          rows={3}
        />
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Product Design Projects</h4>
          <Button onClick={addProject} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </Button>
        </div>

        <div className="space-y-6">
          {pdPreview.projects.map((project, projectIndex) => (
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
                    placeholder="Company Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={project.slug}
                    onChange={(e) => handleProjectChange(projectIndex, 'slug', e.target.value)}
                    placeholder="company-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={project.role}
                    onChange={(e) => handleProjectChange(projectIndex, 'role', e.target.value)}
                    placeholder="Senior Product Designer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={project.company}
                    onChange={(e) => handleProjectChange(projectIndex, 'company', e.target.value)}
                    placeholder="Company Name"
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
                        placeholder="Value"
                        className="flex-1"
                      />
                      <Input
                        value={metric.label}
                        onChange={(e) => handleMetricChange(projectIndex, metricIndex, 'label', e.target.value)}
                        placeholder="Label"
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

        {pdPreview.projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No projects added yet. Click "Add Project" to create your first PD project.</p>
          </div>
        )}
      </Card>

      
    </div>
  );
}
