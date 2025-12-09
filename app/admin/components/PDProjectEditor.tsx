'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Save, RefreshCw } from 'lucide-react';
import { Project } from '@/types/project';
import ImagePicker from './ImagePicker';

interface PDProjectEditorProps {
  project: Project;
  onSave: (project: Project) => Promise<void>;
  onRefresh: () => void;
}

export default function PDProjectEditor({
  project,
  onSave,
  onRefresh
}: PDProjectEditorProps) {
  const [editedProject, setEditedProject] = useState<Project>(project);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);

  useEffect(() => {
    setEditedProject(project);
    setSelectedSectionIndex(null);
  }, [project]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await onSave(editedProject);
      setMessage({ type: 'success', text: 'Project saved successfully!' });
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save project'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleProjectFieldChange = (field: keyof Project, value: string | string[]) => {
    setEditedProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSectionFieldChange = (sectionIndex: number, field: string, value: string) => {
    setEditedProject(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex
          ? { ...section, [field]: value }
          : section
      )
    }));
  };


  return (
    <div className="space-y-6">
      {/* Save Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Edit Project</h2>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={saving}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Project'}
          </Button>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <Alert className={message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
          {message.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Info Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  value={editedProject.id}
                  onChange={(e) => handleProjectFieldChange('id', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={editedProject.slug}
                  onChange={(e) => handleProjectFieldChange('slug', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="heroTitle">Hero Title (Role)</Label>
                <Input
                  id="heroTitle"
                  value={editedProject.heroTitle || ''}
                  onChange={(e) => handleProjectFieldChange('heroTitle', e.target.value)}
                  placeholder="e.g., Senior Product Designer"
                />
              </div>

              <div>
                <Label htmlFor="heroDescription">Hero Description (Company)</Label>
                <Textarea
                  id="heroDescription"
                  value={editedProject.heroDescription || ''}
                  onChange={(e) => handleProjectFieldChange('heroDescription', e.target.value)}
                  placeholder="e.g., Company description and context"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="titleHighlight">Title Highlight</Label>
                <Input
                  id="titleHighlight"
                  value={editedProject.titleHighlight || ''}
                  onChange={(e) => handleProjectFieldChange('titleHighlight', e.target.value)}
                  placeholder="Text to highlight in title"
                />
              </div>

              <div>
                <Label htmlFor="heroDescriptionHighlight">Description Highlights</Label>
                <Textarea
                  id="heroDescriptionHighlight"
                  value={editedProject.heroDescriptionHighlight || ''}
                  onChange={(e) => handleProjectFieldChange('heroDescriptionHighlight', e.target.value)}
                  placeholder="Comma-separated words to highlight"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="heroBackground">Hero Background</Label>
                <Input
                  id="heroBackground"
                  value={editedProject.heroBackground || ''}
                  onChange={(e) => handleProjectFieldChange('heroBackground', e.target.value)}
                  placeholder="e.g., bg-bg-dark/95"
                />
              </div>

              <div>
                <Label htmlFor="previewImage">Preview Image</Label>
                <ImagePicker
                  label=""
                  value={editedProject.previewImage || ''}
                  onChange={(val) => handleProjectFieldChange('previewImage', val)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sections Panel */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Project Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {editedProject.sections.map((section, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 transition-colors ${
                      selectedSectionIndex === index
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {section.title || `Section ${index + 1}`}
                        </h4>
                        <p className="text-xs text-gray-500 capitalize">
                          {section.type.replace('-', ' ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedSectionIndex(selectedSectionIndex === index ? null : index)}
                          className="p-1 rounded hover:bg-gray-200 transition-colors"
                          aria-label={selectedSectionIndex === index ? "Collapse section" : "Expand section"}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              selectedSectionIndex === index ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {selectedSectionIndex === index && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`section-title-${index}`}>Title</Label>
                            <Input
                              id={`section-title-${index}`}
                              value={section.title}
                              onChange={(e) => handleSectionFieldChange(index, 'title', e.target.value)}
                            />
                          </div>

                          <div>
                            <Label htmlFor={`section-description-${index}`}>Description</Label>
                            <Textarea
                              id={`section-description-${index}`}
                              value={section.description}
                              onChange={(e) => handleSectionFieldChange(index, 'description', e.target.value)}
                              rows={3}
                            />
                          </div>

                          {section.image && (
                            <div>
                              <Label htmlFor={`section-image-${index}`}>Image</Label>
                              <ImagePicker
                                label=""
                                value={section.image}
                                onChange={(val) => handleSectionFieldChange(index, 'image', val)}
                              />
                            </div>
                          )}

                          {section.layout && (
                            <div>
                              <Label htmlFor={`section-layout-${index}`}>Layout</Label>
                              <select
                                id={`section-layout-${index}`}
                                value={section.layout}
                                onChange={(e) => handleSectionFieldChange(index, 'layout', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                              >
                                <option value="text-left-image-right">Text Left, Image Right</option>
                                <option value="image-left-text-right">Image Left, Text Right</option>
                                <option value="text-only">Text Only</option>
                                <option value="centered">Centered</option>
                                <option value="text-left">Text Left</option>
                                <option value="text-right">Text Right</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}