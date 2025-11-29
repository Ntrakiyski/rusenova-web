'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HomeContent, ProjectSection } from '@/types/project';
import homeContentData from '@/app/data/homeContent.json';
import { mlProjects } from '@/app/data/mlProjects';
import { productDesignProjects } from '@/app/data/productDesignProjects';

// shadcn components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function AdminPage() {
  const [homeContent, setHomeContent] = useState<HomeContent>(homeContentData as HomeContent);
  const [mlProjectsData, setMlProjectsData] = useState(mlProjects);
  const [productDesignProjectsData, setProductDesignProjectsData] = useState(productDesignProjects);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [projectSaveMessage, setProjectSaveMessage] = useState('');
  const [isSavingProjects, setIsSavingProjects] = useState(false);
  
  // Image management state
  const [images, setImages] = useState<Array<{
    name: string;
    url: string;
    size: number;
    created: string;
    modified: string;
    type: string;
  }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Load images on component mount
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await fetch('/api/admin/list-images');
      const data = await response.json();
      if (response.ok) {
        setImages(data.images);
      }
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadMessage(`Successfully uploaded ${data.filename}`);
        event.target.value = ''; // Clear the input
        await loadImages(); // Refresh the image list
      } else {
        setUploadMessage(`Error: ${data.error}`);
      }
    } catch {
      setUploadMessage('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/admin/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(homeContent),
      });

      if (response.ok) {
        setSaveMessage('Content saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Error saving content');
      }
    } catch {
      setSaveMessage('Error saving content');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (section: string, field: string, value: string | number | boolean) => {
    setHomeContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof HomeContent],
        ...(field.includes('.') 
          ? updateNestedField(prev[section as keyof HomeContent], field, value)
          : { [field]: value }
        )
      }
    }));
  };

  const updateNestedField = (obj: Record<string, unknown>, field: string, value: string | number | boolean): Record<string, unknown> => {
    const keys = field.split('.');
    const result = { ...obj };
    let current: Record<string, unknown> = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      current[key] = { ...(current[key] as Record<string, unknown>) };
      current = current[key] as Record<string, unknown>;
    }
    
    current[keys[keys.length - 1]] = value;
    return result;
  };

  const handleInputChange = (section: string, field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateField(section, field, e.target.value);
  };

  // Project editing functions
  const updateProjectField = (projectType: 'ml' | 'pd', projectIndex: number, field: string, value: string | string[] | undefined) => {
    if (projectType === 'ml') {
      setMlProjectsData(prev => {
        const updated = [...prev];
        updated[projectIndex] = { ...updated[projectIndex], [field]: value };
        return updated;
      });
    } else {
      setProductDesignProjectsData(prev => {
        const updated = [...prev];
        updated[projectIndex] = { ...updated[projectIndex], [field]: value };
        return updated;
      });
    }
  };

  const updateProjectMetric = (projectType: 'ml' | 'pd', projectIndex: number, metricIndex: number, field: 'value' | 'label', value: string) => {
    if (projectType === 'ml') {
      setMlProjectsData(prev => {
        const updated = [...prev];
        const updatedProject = { ...updated[projectIndex] };
        const updatedMetrics = [...updatedProject.metrics];
        updatedMetrics[metricIndex] = { ...updatedMetrics[metricIndex], [field]: value };
        updatedProject.metrics = updatedMetrics;
        updated[projectIndex] = updatedProject;
        return updated;
      });
    } else {
      setProductDesignProjectsData(prev => {
        const updated = [...prev];
        const updatedProject = { ...updated[projectIndex] };
        const updatedMetrics = [...updatedProject.metrics];
        updatedMetrics[metricIndex] = { ...updatedMetrics[metricIndex], [field]: value };
        updatedProject.metrics = updatedMetrics;
        updated[projectIndex] = updatedProject;
        return updated;
      });
    }
  };

  const addProjectMetric = (projectType: 'ml' | 'pd', projectIndex: number) => {
    if (projectType === 'ml') {
      setMlProjectsData(prev => {
        const updated = [...prev];
        const updatedProject = { ...updated[projectIndex] };
        const updatedMetrics = [...updatedProject.metrics, { value: '', label: '' }];
        updatedProject.metrics = updatedMetrics;
        updated[projectIndex] = updatedProject;
        return updated;
      });
    } else {
      setProductDesignProjectsData(prev => {
        const updated = [...prev];
        const updatedProject = { ...updated[projectIndex] };
        const updatedMetrics = [...updatedProject.metrics, { value: '', label: '' }];
        updatedProject.metrics = updatedMetrics;
        updated[projectIndex] = updatedProject;
        return updated;
      });
    }
  };

  const removeProjectMetric = (projectType: 'ml' | 'pd', projectIndex: number, metricIndex: number) => {
    if (projectType === 'ml') {
      setMlProjectsData(prev => {
        const updated = [...prev];
        const updatedProject = { ...updated[projectIndex] };
        const updatedMetrics = updatedProject.metrics.filter((_, index) => index !== metricIndex);
        updatedProject.metrics = updatedMetrics;
        updated[projectIndex] = updatedProject;
        return updated;
      });
    } else {
      setProductDesignProjectsData(prev => {
        const updated = [...prev];
        const updatedProject = { ...updated[projectIndex] };
        const updatedMetrics = updatedProject.metrics.filter((_, index) => index !== metricIndex);
        updatedProject.metrics = updatedMetrics;
        updated[projectIndex] = updatedProject;
        return updated;
      });
    }
  };

  const handleSaveProjects = async () => {
    setIsSavingProjects(true);
    setProjectSaveMessage('');

    try {
      // Save ML projects
      const mlResponse = await fetch('/api/admin/save-ml-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mlProjectsData),
      });

      // Save PD projects
      const pdResponse = await fetch('/api/admin/save-pd-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDesignProjectsData),
      });

      if (mlResponse.ok && pdResponse.ok) {
        setProjectSaveMessage('Projects saved successfully!');
        setTimeout(() => setProjectSaveMessage(''), 3000);
      } else {
        setProjectSaveMessage('Error saving projects');
      }
    } catch {
      setProjectSaveMessage('Error saving projects');
    } finally {
      setIsSavingProjects(false);
    }
  };

  // Section editing functions
  const updateProjectSection = (projectType: 'ml' | 'pd', projectIndex: number, sectionIndex: number, field: string, value: string) => {
    if (projectType === 'ml') {
      setMlProjectsData(prev => {
        const updated = [...prev];
        const updatedProject = { ...updated[projectIndex] };
        const updatedSections = [...updatedProject.sections];
        updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], [field]: value };
        updatedProject.sections = updatedSections;
        updated[projectIndex] = updatedProject;
        return updated;
      });
    } else {
      setProductDesignProjectsData(prev => {
        const updated = [...prev];
        const updatedProject = { ...updated[projectIndex] };
        const updatedSections = [...updatedProject.sections];
        updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], [field]: value };
        updatedProject.sections = updatedSections;
        updated[projectIndex] = updatedProject;
        return updated;
      });
    }
  };

  const updateProjectSectionJSON = (projectType: 'ml' | 'pd', projectIndex: number, sectionIndex: number, jsonString: string) => {
    try {
      const parsedSection = JSON.parse(jsonString);
      if (projectType === 'ml') {
        setMlProjectsData(prev => {
          const updated = [...prev];
          const updatedProject = { ...updated[projectIndex] };
          const updatedSections = [...updatedProject.sections];
          updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], ...parsedSection };
          updatedProject.sections = updatedSections;
          updated[projectIndex] = updatedProject;
          return updated;
        });
      } else {
        setProductDesignProjectsData(prev => {
          const updated = [...prev];
          const updatedProject = { ...updated[projectIndex] };
          const updatedSections = [...updatedProject.sections];
          updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], ...parsedSection };
          updatedProject.sections = updatedSections;
          updated[projectIndex] = updatedProject;
          return updated;
        });
      }
    } catch (error) {
      console.error('Invalid JSON format:', error);
    }
  };

  // Dynamic section content editor
  // NOTE: Using 'any' types here is intentional for dynamic property access across 18+ different section types.
  // This pragmatic approach avoids excessive type guards while maintaining runtime safety through the switch statement.
  const SectionContentEditor = ({ 
    projectType, 
    projectIndex, 
    sectionIndex, 
    section 
  }: { 
    projectType: 'ml' | 'pd', 
    projectIndex: number, 
    sectionIndex: number, 
    section: ProjectSection 
  }) => {
    const updateSectionField = (fieldPath: string, value: string | number | boolean | string[] | Record<string, unknown>) => {
      if (projectType === 'ml') {
        setMlProjectsData(prev => {
          const updated = [...prev];
          const updatedProject = { ...updated[projectIndex] };
          const updatedSections = [...updatedProject.sections];
          const updatedSection = { ...updatedSections[sectionIndex] };
          
          // Handle nested field updates with type assertion
          // Using 'any' here allows dynamic property access across different section types
          const keys = fieldPath.split('.');
          let current: any = updatedSection;
          for (let i = 0; i < keys.length - 1; i++) {
            current[keys[i]] = { ...current[keys[i]] };
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
          
          updatedSections[sectionIndex] = updatedSection;
          updatedProject.sections = updatedSections;
          updated[projectIndex] = updatedProject;
          return updated;
        });
      } else {
        setProductDesignProjectsData(prev => {
          const updated = [...prev];
          const updatedProject = { ...updated[projectIndex] };
          const updatedSections = [...updatedProject.sections];
          const updatedSection = { ...updatedSections[sectionIndex] };
          
          // Handle nested field updates with type assertion
          const keys = fieldPath.split('.');
          let current: any = updatedSection;
          for (let i = 0; i < keys.length - 1; i++) {
            current[keys[i]] = { ...current[keys[i]] };
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
          
          updatedSections[sectionIndex] = updatedSection;
          updatedProject.sections = updatedSections;
          updated[projectIndex] = updatedProject;
          return updated;
        });
      }
    };

    const addArrayItem = (fieldPath: string, defaultItem: Record<string, unknown> | string) => {
      if (projectType === 'ml') {
        setMlProjectsData(prev => {
          const updated = [...prev];
          const updatedProject = { ...updated[projectIndex] };
          const updatedSections = [...updatedProject.sections];
          const updatedSection = { ...updatedSections[sectionIndex] };
          
          const keys = fieldPath.split('.');
          let current: Record<string, unknown> = updatedSection;
          for (const key of keys) {
            if (!current[key]) current[key] = [];
            current = current[key] as Record<string, unknown>;
          }
          (current as unknown[]).push(defaultItem);
          
          updatedSections[sectionIndex] = updatedSection;
          updatedProject.sections = updatedSections;
          updated[projectIndex] = updatedProject;
          return updated;
        });
      } else {
        setProductDesignProjectsData(prev => {
          const updated = [...prev];
          const updatedProject = { ...updated[projectIndex] };
          const updatedSections = [...updatedProject.sections];
          const updatedSection = { ...updatedSections[sectionIndex] };
          
          const keys = fieldPath.split('.');
          let current: Record<string, unknown> = updatedSection;
          for (const key of keys) {
            if (!current[key]) current[key] = [];
            current = current[key] as Record<string, unknown>;
          }
          (current as unknown[]).push(defaultItem);
          
          updatedSections[sectionIndex] = updatedSection;
          updatedProject.sections = updatedSections;
          updated[projectIndex] = updatedProject;
          return updated;
        });
      }
    };

    const removeArrayItem = (fieldPath: string, index: number) => {
      if (projectType === 'ml') {
        setMlProjectsData(prev => {
          const updated = [...prev];
          const updatedProject = { ...updated[projectIndex] };
          const updatedSections = [...updatedProject.sections];
          const updatedSection = { ...updatedSections[sectionIndex] };
          
          const keys = fieldPath.split('.');
          let current: Record<string, unknown> = updatedSection;
          for (const key of keys.slice(0, -1)) {
            current = current[key] as Record<string, unknown>;
          }
          (current as unknown[]).splice(index, 1);
          
          updatedSections[sectionIndex] = updatedSection;
          updatedProject.sections = updatedSections;
          updated[projectIndex] = updatedProject;
          return updated;
        });
      } else {
        setProductDesignProjectsData(prev => {
          const updated = [...prev];
          const updatedProject = { ...updated[projectIndex] };
          const updatedSections = [...updatedProject.sections];
          const updatedSection = { ...updatedSections[sectionIndex] };
          
          const keys = fieldPath.split('.');
          let current: Record<string, unknown> = updatedSection;
          for (const key of keys.slice(0, -1)) {
            current = current[key] as Record<string, unknown>;
          }
          (current as unknown[]).splice(index, 1);
          
          updatedSections[sectionIndex] = updatedSection;
          updatedProject.sections = updatedSections;
          updated[projectIndex] = updatedProject;
          return updated;
        });
      }
    };

    // Render different editors based on section type
    switch (section.type) {
      case 'intro':
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Content Items</Label>
              {(section as any).content?.map((item: string | { type: string; title: string; description: string }, itemIndex: number) => (
                <Card key={itemIndex} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Content Item {itemIndex + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeArrayItem('content', itemIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                    {typeof item === 'string' ? (
                      <div className="space-y-2">
                        <Label>Content</Label>
                        <Textarea
                          value={item}
                          onChange={(e) => updateSectionField(`content.${itemIndex}`, e.target.value)}
                          placeholder="Content item"
                          rows={3}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Input
                            value={item.type || ''}
                            onChange={(e) => updateSectionField(`content.${itemIndex}.type`, e.target.value)}
                            placeholder="Type (e.g., feature)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={item.title || ''}
                            onChange={(e) => updateSectionField(`content.${itemIndex}.title`, e.target.value)}
                            placeholder="Title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={item.description || ''}
                            onChange={(e) => updateSectionField(`content.${itemIndex}.description`, e.target.value)}
                            placeholder="Description"
                            rows={3}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('content', '')}
              >
                Add Content Item
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Layout</Label>
              <Input
                value={(section as any).layout || ''}
                onChange={(e) => updateSectionField('layout', e.target.value)}
                placeholder="Layout type (e.g., text-left-image-right)"
              />
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Architecture Image</Label>
              <Input
                value={section.image || ''}
                onChange={(e) => updateSectionField('image', e.target.value)}
                placeholder="/path/to/architecture-image.png"
              />
            </div>
          </div>
        );
      case 'approach':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Cards</Label>
            {section.cards?.map((card: { title: string; description: string }, cardIndex: number) => (
              <Card key={cardIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Card {cardIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('cards', cardIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <Label>Card Title</Label>
                      <Input
                        value={card.title}
                        onChange={(e) => updateSectionField(`cards.${cardIndex}.title`, e.target.value)}
                        placeholder="Card title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Card Description</Label>
                      <Textarea
                        value={card.description}
                        onChange={(e) => updateSectionField(`cards.${cardIndex}.description`, e.target.value)}
                        placeholder="Card description"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('cards', { title: '', description: '' })}
            >
              Add Card
            </Button>
          </div>
        );

      case 'section-with-cards':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Cards</Label>
            {section.cards?.map((card: { title: string; description: string }, cardIndex: number) => (
              <Card key={cardIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Card {cardIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('cards', cardIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <Label>Card Title</Label>
                      <Input
                        value={card.title}
                        onChange={(e) => updateSectionField(`cards.${cardIndex}.title`, e.target.value)}
                        placeholder="Card title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Card Description</Label>
                      <Textarea
                        value={card.description}
                        onChange={(e) => updateSectionField(`cards.${cardIndex}.description`, e.target.value)}
                        placeholder="Card description"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('cards', { title: '', description: '' })}
            >
              Add Card
            </Button>
          </div>
        );

      case 'section-with-cards-and-bullets':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Cards with Bullets</Label>
            {section.cards?.map((card: { title: string; items: string[] }, cardIndex: number) => (
              <Card key={cardIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Card {cardIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('cards', cardIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <Label>Card Title</Label>
                      <Input
                        value={card.title}
                        onChange={(e) => updateSectionField(`cards.${cardIndex}.title`, e.target.value)}
                        placeholder="Card title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bullet Points</Label>
                      {card.items?.map((item: string, itemIndex: number) => (
                        <div key={itemIndex} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateSectionField(`cards.${cardIndex}.items.${itemIndex}`, e.target.value)}
                            placeholder="Bullet point"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeArrayItem(`cards.${cardIndex}.items`, itemIndex)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => addArrayItem(`cards.${cardIndex}.items`, '')}
                      >
                        Add Bullet Point
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('cards', { title: '', items: [''] })}
            >
              Add Card
            </Button>
          </div>
        );

      case 'what-i-build':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Metrics</Label>
            {section.metrics?.map((metric: { value: string; label: string }, metricIndex: number) => (
              <Card key={metricIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Metric {metricIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('metrics', metricIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        value={metric.value}
                        onChange={(e) => updateSectionField(`metrics.${metricIndex}.value`, e.target.value)}
                        placeholder="Metric value"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input
                        value={metric.label}
                        onChange={(e) => updateSectionField(`metrics.${metricIndex}.label`, e.target.value)}
                        placeholder="Metric label"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('metrics', { value: '', label: '' })}
            >
              Add Metric
            </Button>
          </div>
        );

      case 'section-with-table':
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Table Columns</Label>
              {(section as any).columns?.map((column: string, columnIndex: number) => (
                <div key={columnIndex} className="flex gap-2">
                  <Input
                    value={column}
                    onChange={(e) => updateSectionField(`columns.${columnIndex}`, e.target.value)}
                    placeholder="Column name"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('columns', columnIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('columns', '')}
              >
                Add Column
              </Button>
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-medium">Table Rows</Label>
              {(section as any).rows?.map((row: Record<string, string>, rowIndex: number) => (
                <Card key={rowIndex} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Row {rowIndex + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeArrayItem('rows', rowIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(section as any).columns?.map((column: string, columnIndex: number) => (
                        <div key={columnIndex} className="space-y-2">
                          <Label>{column}</Label>
                          <Input
                            value={row[column] || ''}
                            onChange={(e) => updateSectionField(`rows.${rowIndex}.${column}`, e.target.value)}
                            placeholder={`Value for ${column}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  const newRow: Record<string, string> = {};
                  (section as any).columns?.forEach((column: string) => {
                    newRow[column] = '';
                  });
                  addArrayItem('rows', newRow);
                }}
              >
                Add Row
              </Button>
            </div>
          </div>
        );

      case 'key-results-only':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Results Image</Label>
              <Input
                value={section.image || ''}
                onChange={(e) => updateSectionField('image', e.target.value)}
                placeholder="/path/to/results-image.png"
              />
            </div>
          </div>
        );

      case 'technical-performance':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Performance Metrics</Label>
            {(section as any).metrics?.map((metric: { name: string; value: string; description: string; details?: string }, metricIndex: number) => (
              <Card key={metricIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Metric {metricIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('metrics', metricIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Metric Name</Label>
                      <Input
                        value={metric.name}
                        onChange={(e) => updateSectionField(`metrics.${metricIndex}.name`, e.target.value)}
                        placeholder="Metric name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Metric Value</Label>
                      <Input
                        value={metric.value}
                        onChange={(e) => updateSectionField(`metrics.${metricIndex}.value`, e.target.value)}
                        placeholder="Metric value"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={metric.description}
                        onChange={(e) => updateSectionField(`metrics.${metricIndex}.description`, e.target.value)}
                        placeholder="Metric description"
                        rows={2}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Details (Optional)</Label>
                      <Textarea
                        value={metric.details || ''}
                        onChange={(e) => updateSectionField(`metrics.${metricIndex}.details`, e.target.value)}
                        placeholder="Additional details"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('metrics', { name: '', value: '', description: '', details: '' })}
            >
              Add Metric
            </Button>
          </div>
        );

      case 'tech-stack':
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Technologies</Label>
              {(section as any).technologies?.map((tech: string, techIndex: number) => (
                <div key={techIndex} className="flex gap-2">
                  <Input
                    value={tech}
                    onChange={(e) => updateSectionField(`technologies.${techIndex}`, e.target.value)}
                    placeholder="Technology name"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('technologies', techIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('technologies', '')}
              >
                Add Technology
              </Button>
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-medium">Categories</Label>
              {(section as any).categories?.map((category: string, catIndex: number) => (
                <div key={catIndex} className="flex gap-2">
                  <Input
                    value={category}
                    onChange={(e) => updateSectionField(`categories.${catIndex}`, e.target.value)}
                    placeholder="Category name"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('categories', catIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('categories', '')}
              >
                Add Category
              </Button>
            </div>
          </div>
        );

      case 'cost-benefit':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Cost-Benefit Items</Label>
            {section.items?.map((item: { title: string; content: string | string[] }, itemIndex: number) => (
              <Card key={itemIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Item {itemIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('items', itemIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <Label>Item Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateSectionField(`items.${itemIndex}.title`, e.target.value)}
                        placeholder="Item title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      {Array.isArray(item.content) ? (
                        <div className="space-y-2">
                          {item.content.map((contentItem: string, contentIndex: number) => (
                            <div key={contentIndex} className="flex gap-2">
                              <Input
                                value={contentItem}
                                onChange={(e) => updateSectionField(`items.${itemIndex}.content.${contentIndex}`, e.target.value)}
                                placeholder="Content item"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeArrayItem(`items.${itemIndex}.content`, contentIndex)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={() => addArrayItem(`items.${itemIndex}.content`, '')}
                          >
                            Add Content Item
                          </Button>
                        </div>
                      ) : (
                        <Textarea
                          value={item.content}
                          onChange={(e) => updateSectionField(`items.${itemIndex}.content`, e.target.value)}
                          placeholder="Item content"
                          rows={3}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('items', { title: '', content: '' })}
            >
              Add Cost-Benefit Item
            </Button>
          </div>
        );

      case 'segment-analysis':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Segments</Label>
            {section.segments?.map((segment: { name: string; metrics: Array<{ name: string; value: string }> }, segmentIndex: number) => (
              <Card key={segmentIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Segment {segmentIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('segments', segmentIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <Label>Segment Name</Label>
                      <Input
                        value={segment.name}
                        onChange={(e) => updateSectionField(`segments.${segmentIndex}.name`, e.target.value)}
                        placeholder="Segment name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Segment Metrics</Label>
                      {segment.metrics?.map((metric: { name: string; value: string }, metricIndex: number) => (
                        <div key={metricIndex} className="flex gap-2">
                          <Input
                            value={metric.name}
                            onChange={(e) => updateSectionField(`segments.${segmentIndex}.metrics.${metricIndex}.name`, e.target.value)}
                            placeholder="Metric name"
                          />
                          <Input
                            value={metric.value}
                            onChange={(e) => updateSectionField(`segments.${segmentIndex}.metrics.${metricIndex}.value`, e.target.value)}
                            placeholder="Metric value"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeArrayItem(`segments.${segmentIndex}.metrics`, metricIndex)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => addArrayItem(`segments.${segmentIndex}.metrics`, { name: '', value: '' })}
                      >
                        Add Metric
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('segments', { name: '', metrics: [] })}
            >
              Add Segment
            </Button>
          </div>
        );

      case 'key-learning':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Learnings</Label>
            {section.learnings?.map((learning: { title: string; description: string }, learningIndex: number) => (
              <Card key={learningIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Learning {learningIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('learnings', learningIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <Label>Learning Title</Label>
                      <Input
                        value={learning.title}
                        onChange={(e) => updateSectionField(`learnings.${learningIndex}.title`, e.target.value)}
                        placeholder="Learning title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Learning Description</Label>
                      <Textarea
                        value={learning.description}
                        onChange={(e) => updateSectionField(`learnings.${learningIndex}.description`, e.target.value)}
                        placeholder="Learning description"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('learnings', { title: '', description: '' })}
            >
              Add Learning
            </Button>
          </div>
        );

      case 'production-deployment':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Deployment Cards</Label>
            {section.cards?.map((card: { title: string; icon?: string; bullets: string[] }, cardIndex: number) => (
              <Card key={cardIndex} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Card {cardIndex + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('cards', cardIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <Label>Card Title</Label>
                      <Input
                        value={card.title}
                        onChange={(e) => updateSectionField(`cards.${cardIndex}.title`, e.target.value)}
                        placeholder="Card title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Card Icon (Optional)</Label>
                      <Textarea
                        value={card.icon || ''}
                        onChange={(e) => updateSectionField(`cards.${cardIndex}.icon`, e.target.value)}
                        placeholder="SVG icon content"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bullet Points</Label>
                      {card.bullets?.map((bullet: string, bulletIndex: number) => (
                        <div key={bulletIndex} className="flex gap-2">
                          <Input
                            value={bullet}
                            onChange={(e) => updateSectionField(`cards.${cardIndex}.bullets.${bulletIndex}`, e.target.value)}
                            placeholder="Bullet point"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeArrayItem(`cards.${cardIndex}.bullets`, bulletIndex)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => addArrayItem(`cards.${cardIndex}.bullets`, '')}
                      >
                        Add Bullet Point
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('cards', { title: '', icon: '', bullets: [''] })}
            >
              Add Card
            </Button>
          </div>
        );
      case 'evaluation':
      case 'production':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Items</Label>
            {section.items?.map((item: string, itemIndex: number) => (
              <div key={itemIndex} className="flex gap-2">
                <Textarea
                  value={item}
                  onChange={(e) => updateSectionField(`items.${itemIndex}`, e.target.value)}
                  placeholder="Item content"
                  rows={2}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('items', itemIndex)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('items', '')}
            >
              Add Item
            </Button>
          </div>
        );

      case 'results':
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Outcomes</Label>
              {section.outcomes?.map((outcome: string, outcomeIndex: number) => (
                <div key={outcomeIndex} className="flex gap-2">
                  <Textarea
                    value={outcome}
                    onChange={(e) => updateSectionField(`outcomes.${outcomeIndex}`, e.target.value)}
                    placeholder="Outcome description"
                    rows={2}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('outcomes', outcomeIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('outcomes', '')}
              >
                Add Outcome
              </Button>
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-medium">Business Value</Label>
              {section.businessValue?.map((value: string, valueIndex: number) => (
                <div key={valueIndex} className="flex gap-2">
                  <Textarea
                    value={value}
                    onChange={(e) => updateSectionField(`businessValue.${valueIndex}`, e.target.value)}
                    placeholder="Business value description"
                    rows={2}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('businessValue', valueIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('businessValue', '')}
              >
                Add Business Value
              </Button>
            </div>
          </div>
        );

      case 'smart-retrieval':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Smart Retrieval Items</Label>
            {section.items?.map((item: string, itemIndex: number) => (
              <div key={itemIndex} className="flex gap-2">
                <Textarea
                  value={item}
                  onChange={(e) => updateSectionField(`items.${itemIndex}`, e.target.value)}
                  placeholder="Smart retrieval item"
                  rows={2}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('items', itemIndex)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('items', '')}
            >
              Add Item
            </Button>
          </div>
        );

      case 'communication-framework':
      case 'admin':
      case 'home-redesign':
      case 'homepage-redesign':
      case 'travel-insurance':
      case 'gamification':
      case 'golf-ecommerce':
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Content Items</Label>
              {(section.content as string[])?.map((item: string, itemIndex: number) => (
                <div key={itemIndex} className="flex gap-2">
                  <Textarea
                    value={item}
                    onChange={(e) => updateSectionField(`content.${itemIndex}`, e.target.value)}
                    placeholder="Content item"
                    rows={2}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('content', itemIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('content', '')}
              >
                Add Content Item
              </Button>
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-medium">Achievements</Label>
              {section.achievements?.map((achievement: string, achievementIndex: number) => (
                <div key={achievementIndex} className="flex gap-2">
                  <Textarea
                    value={achievement}
                    onChange={(e) => updateSectionField(`achievements.${achievementIndex}`, e.target.value)}
                    placeholder="Achievement description"
                    rows={2}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('achievements', achievementIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('achievements', '')}
              >
                Add Achievement
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Section Image</Label>
              <Input
                value={section.image || ''}
                onChange={(e) => updateSectionField('image', e.target.value)}
                placeholder="/path/to/image.png"
              />
            </div>
            <div className="space-y-2">
              <Label>Layout</Label>
              <Input
                value={section.layout || ''}
                onChange={(e) => updateSectionField('layout', e.target.value)}
                placeholder="Layout type (e.g., text-left-image-right)"
              />
            </div>
          </div>
        );

      case 'methodology':
      case 'case-studies':
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Content Items</Label>
              {(section.content as string[])?.map((item: string, itemIndex: number) => (
                <div key={itemIndex} className="flex gap-2">
                  <Textarea
                    value={item}
                    onChange={(e) => updateSectionField(`content.${itemIndex}`, e.target.value)}
                    placeholder="Content item"
                    rows={2}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('content', itemIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('content', '')}
              >
                Add Content Item
              </Button>
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-medium">Achievements</Label>
              {section.achievements?.map((achievement: string, achievementIndex: number) => (
                <div key={achievementIndex} className="flex gap-2">
                  <Textarea
                    value={achievement}
                    onChange={(e) => updateSectionField(`achievements.${achievementIndex}`, e.target.value)}
                    placeholder="Achievement description"
                    rows={2}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('achievements', achievementIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('achievements', '')}
              >
                Add Achievement
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Section Image</Label>
              <Input
                value={section.image || ''}
                onChange={(e) => updateSectionField('image', e.target.value)}
                placeholder="/path/to/image.png"
              />
            </div>
            <div className="space-y-2">
              <Label>Layout</Label>
              <Input
                value={section.layout || ''}
                onChange={(e) => updateSectionField('layout', e.target.value)}
                placeholder="Layout type (e.g., text-left-image-right)"
              />
            </div>
          </div>
        );

      default:
        // Fallback to JSON editor for unknown or complex types
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Section Content (JSON format)</Label>
            <Textarea
              value={JSON.stringify(section, null, 2)}
              onChange={(e) => {
                try {
                  const updated = JSON.parse(e.target.value);
                  if (projectType === 'ml') {
                    setMlProjectsData(prev => {
                      const updatedProjects = [...prev];
                      updatedProjects[projectIndex].sections[sectionIndex] = updated;
                      return updatedProjects;
                    });
                  } else {
                    setProductDesignProjectsData(prev => {
                      const updatedProjects = [...prev];
                      updatedProjects[projectIndex].sections[sectionIndex] = updated;
                      return updatedProjects;
                    });
                  }
                } catch (error) {
                  console.error('Invalid JSON:', error);
                }
              }}
              placeholder="Section content in JSON format"
              rows={8}
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Edit the JSON above to modify section-specific content.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Home Page Admin</h1>
              <p className="text-sm text-muted-foreground">Manage your home page content</p>
            </div>
            <div className="flex items-center gap-4">
              {saveMessage && (
                <Badge variant={saveMessage.includes('Error') ? 'destructive' : 'default'}>
                  {saveMessage}
                </Badge>
              )}
              <Button
                onClick={handleSave}
                disabled={isSaving}
                size="lg"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="home">Home Page</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          {/* Home Page Content */}
          <TabsContent value="home">
            <div className="space-y-6">
              {/* Colors Section */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Colors</CardTitle>
                          <CardDescription>Manage your website color scheme</CardDescription>
                        </div>
                        <Badge variant="outline">Colors</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent>
                <div className="max-w-6xl mx-auto space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primary"
                          type="color"
                          value={homeContent.colors.primary}
                          onChange={handleInputChange('colors', 'primary')}
                          className="w-16 h-10"
                        />
                        <Input
                          value={homeContent.colors.primary}
                          onChange={handleInputChange('colors', 'primary')}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondary"
                          type="color"
                          value={homeContent.colors.secondary}
                          onChange={handleInputChange('colors', 'secondary')}
                          className="w-16 h-10"
                        />
                        <Input
                          value={homeContent.colors.secondary}
                          onChange={handleInputChange('colors', 'secondary')}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="background">Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="background"
                          type="color"
                          value={homeContent.colors.background}
                          onChange={handleInputChange('colors', 'background')}
                          className="w-16 h-10"
                        />
                        <Input
                          value={homeContent.colors.background}
                          onChange={handleInputChange('colors', 'background')}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-primary">Primary Text</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text-primary"
                          type="color"
                          value={homeContent.colors.text.primary}
                          onChange={handleInputChange('colors', 'text.primary')}
                          className="w-16 h-10"
                        />
                        <Input
                          value={homeContent.colors.text.primary}
                          onChange={handleInputChange('colors', 'text.primary')}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-secondary">Secondary Text</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text-secondary"
                          type="color"
                          value={homeContent.colors.text.secondary}
                          onChange={handleInputChange('colors', 'text.secondary')}
                          className="w-16 h-10"
                        />
                        <Input
                          value={homeContent.colors.text.secondary}
                          onChange={handleInputChange('colors', 'text.secondary')}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-accent">Accent Text</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text-accent"
                          type="color"
                          value={homeContent.colors.text.accent}
                          onChange={handleInputChange('colors', 'text.accent')}
                          className="w-16 h-10"
                        />
                        <Input
                          value={homeContent.colors.text.accent}
                          onChange={handleInputChange('colors', 'text.accent')}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Hero Section */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Hero Section</CardTitle>
                          <CardDescription>Manage your hero section content</CardDescription>
                        </div>
                        <Badge variant="outline">Hero</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent>
                <div className="max-w-6xl mx-auto space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="hero-bg">Background Color</Label>
                      <Input
                        id="hero-bg"
                        value={homeContent.hero.backgroundColor}
                        onChange={(e) => updateField('hero', 'backgroundColor', e.target.value)}
                        placeholder="#f7f4ed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-badge">Badge Text</Label>
                      <Input
                        id="hero-badge"
                        value={homeContent.hero.badge}
                        onChange={(e) => updateField('hero', 'badge', e.target.value)}
                        placeholder="HUMAN & AI"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="hero-title">Title</Label>
                      <Input
                        id="hero-title"
                        value={homeContent.hero.title}
                        onChange={(e) => updateField('hero', 'title', e.target.value)}
                        placeholder="Your hero title"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="hero-subtitle">Subtitle</Label>
                      <Textarea
                        id="hero-subtitle"
                        value={homeContent.hero.subtitle}
                        onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                        placeholder="Your hero subtitle"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-image-src">Image Source</Label>
                      <Input
                        id="hero-image-src"
                        value={homeContent.hero.image.src}
                        onChange={(e) => updateField('hero', 'image.src', e.target.value)}
                        placeholder="/path/to/image.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-image-alt">Image Alt Text</Label>
                      <Input
                        id="hero-image-alt"
                        value={homeContent.hero.image.alt}
                        onChange={(e) => updateField('hero', 'image.alt', e.target.value)}
                        placeholder="Description of the image"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Buttons</Label>
                    <div className="space-y-4 mt-2">
                      {homeContent.hero.buttons.map((button, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`button-text-${index}`}>Button Text</Label>
                              <Input
                                id={`button-text-${index}`}
                                value={button.text}
                                onChange={(e) => updateField('hero', `buttons.${index}.text`, e.target.value)}
                                placeholder="Button text"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`button-link-${index}`}>Button Link</Label>
                              <Input
                                id={`button-link-${index}`}
                                value={button.link}
                                onChange={(e) => updateField('hero', `buttons.${index}.link`, e.target.value)}
                                placeholder="https://example.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`button-style-${index}`}>Button Style</Label>
                              <Select
                                value={button.style}
                                onValueChange={(value) => updateField('hero', `buttons.${index}.style`, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="primary">Primary</SelectItem>
                                  <SelectItem value="secondary">Secondary</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Services Section */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Services Section</CardTitle>
                          <CardDescription>Manage your services content</CardDescription>
                        </div>
                        <Badge variant="outline">Services</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent>
                <div className="max-w-6xl mx-auto space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="services-title">Section Title</Label>
                    <Input
                      id="services-title"
                      value={homeContent.services.title}
                      onChange={(e) => updateField('services', 'title', e.target.value)}
                      placeholder="I can help with"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Service Items</Label>
                    <div className="space-y-2 mt-2">
                      {homeContent.services.items.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateField('services', `items.${index}`, e.target.value)}
                            placeholder="Service item"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newItems = homeContent.services.items.filter((_, i) => i !== index);
                              setHomeContent(prev => ({
                                ...prev,
                                services: { ...prev.services, items: newItems }
                              }));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newItems = [...homeContent.services.items, ''];
                          setHomeContent(prev => ({
                            ...prev,
                            services: { ...prev.services, items: newItems }
                          }));
                        }}
                      >
                        Add Service Item
                      </Button>
                    </div>
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Features Section */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Features Section</CardTitle>
                          <CardDescription>Manage your features content</CardDescription>
                        </div>
                        <Badge variant="outline">Features</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent>
                <div className="max-w-6xl mx-auto space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="features-bg">Background Color</Label>
                      <Input
                        id="features-bg"
                        value={homeContent.features.backgroundColor}
                        onChange={(e) => updateField('features', 'backgroundColor', e.target.value)}
                        placeholder="black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="features-title">Section Title</Label>
                      <Input
                        id="features-title"
                        value={homeContent.features.title}
                        onChange={(e) => updateField('features', 'title', e.target.value)}
                        placeholder="Building intelligence into your product"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="features-subtitle">Subtitle</Label>
                      <Textarea
                        id="features-subtitle"
                        value={homeContent.features.subtitle}
                        onChange={(e) => updateField('features', 'subtitle', e.target.value)}
                        placeholder="Features subtitle"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Feature Items</Label>
                    <div className="space-y-4 mt-2">
                      {homeContent.features.items.map((item, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`feature-title-${index}`}>Title</Label>
                              <Input
                                id={`feature-title-${index}`}
                                value={item.title}
                                onChange={(e) => updateField('features', `items.${index}.title`, e.target.value)}
                                placeholder="Feature title"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`feature-desc-${index}`}>Description</Label>
                              <Input
                                id={`feature-desc-${index}`}
                                value={item.description}
                                onChange={(e) => updateField('features', `items.${index}.description`, e.target.value)}
                                placeholder="Feature description"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`feature-icon-${index}`}>Icon Path</Label>
                              <Input
                                id={`feature-icon-${index}`}
                                value={item.icon}
                                onChange={(e) => updateField('features', `items.${index}.icon`, e.target.value)}
                                placeholder="/path/to/icon.png"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* About Section */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>About Section</CardTitle>
                          <CardDescription>Manage your about section content</CardDescription>
                        </div>
                        <Badge variant="outline">About</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent>
                <div className="max-w-6xl mx-auto space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="about-bg">Background Color</Label>
                      <Input
                        id="about-bg"
                        value={homeContent.about.backgroundColor}
                        onChange={(e) => updateField('about', 'backgroundColor', e.target.value)}
                        placeholder="#f7f4ed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="about-badge">Badge Text</Label>
                      <Input
                        id="about-badge"
                        value={homeContent.about.badge}
                        onChange={(e) => updateField('about', 'badge', e.target.value)}
                        placeholder="ONE PERSON TEAM"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="about-title">Title</Label>
                      <Input
                        id="about-title"
                        value={homeContent.about.title}
                        onChange={(e) => updateField('about', 'title', e.target.value)}
                        placeholder="I'm Gloria"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="about-image-src">Image Source</Label>
                      <Input
                        id="about-image-src"
                        value={homeContent.about.image.src}
                        onChange={(e) => updateField('about', 'image.src', e.target.value)}
                        placeholder="/path/to/image.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="about-image-alt">Image Alt Text</Label>
                      <Input
                        id="about-image-alt"
                        value={homeContent.about.image.alt}
                        onChange={(e) => updateField('about', 'image.alt', e.target.value)}
                        placeholder="Description of the image"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Paragraphs</Label>
                    <div className="space-y-2 mt-2">
                      {homeContent.about.paragraphs.map((paragraph, index) => (
                        <div key={index} className="flex gap-2">
                          <Textarea
                            value={paragraph}
                            onChange={(e) => updateField('about', `paragraphs.${index}`, e.target.value)}
                            placeholder="About paragraph"
                            rows={3}
                            className="flex-1"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newParagraphs = homeContent.about.paragraphs.filter((_, i) => i !== index);
                              setHomeContent(prev => ({
                                ...prev,
                                about: { ...prev.about, paragraphs: newParagraphs }
                              }));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newParagraphs = [...homeContent.about.paragraphs, ''];
                          setHomeContent(prev => ({
                            ...prev,
                            about: { ...prev.about, paragraphs: newParagraphs }
                          }));
                        }}
                      >
                        Add Paragraph
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Stats</Label>
                    <div className="space-y-4 mt-2">
                      {homeContent.about.stats.map((stat, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`stat-value-${index}`}>Value</Label>
                              <Input
                                id={`stat-value-${index}`}
                                value={stat.value}
                                onChange={(e) => updateField('about', `stats.${index}.value`, e.target.value)}
                                placeholder="8+"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`stat-label-${index}`}>Label</Label>
                              <Input
                                id={`stat-label-${index}`}
                                value={stat.label}
                                onChange={(e) => updateField('about', `stats.${index}.label`, e.target.value)}
                                placeholder="Years of Experience"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Footer Section */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Footer Section</CardTitle>
                          <CardDescription>Manage your footer content</CardDescription>
                        </div>
                        <Badge variant="outline">Footer</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent>
                      <div className="max-w-6xl mx-auto space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="footer-bg">Background Color</Label>
                      <Input
                        id="footer-bg"
                        value={homeContent.footer.backgroundColor}
                        onChange={(e) => updateField('footer', 'backgroundColor', e.target.value)}
                        placeholder="#191818"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="footer-brand-name">Brand Name</Label>
                      <Input
                        id="footer-brand-name"
                        value={homeContent.footer.brand.name}
                        onChange={(e) => updateField('footer', 'brand.name', e.target.value)}
                        placeholder="Gloria"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="footer-brand-desc">Brand Description</Label>
                      <Textarea
                        id="footer-brand-desc"
                        value={homeContent.footer.brand.description}
                        onChange={(e) => updateField('footer', 'brand.description', e.target.value)}
                        placeholder="Brand description"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Social Links</Label>
                    <div className="space-y-4 mt-2">
                      {homeContent.footer.social.map((social, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`social-platform-${index}`}>Platform</Label>
                              <Input
                                id={`social-platform-${index}`}
                                value={social.platform}
                                onChange={(e) => updateField('footer', `social.${index}.platform`, e.target.value)}
                                placeholder="github"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`social-url-${index}`}>URL</Label>
                              <Input
                                id={`social-url-${index}`}
                                value={social.url}
                                onChange={(e) => updateField('footer', `social.${index}.url`, e.target.value)}
                                placeholder="https://github.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`social-aria-${index}`}>Aria Label</Label>
                              <Input
                                id={`social-aria-${index}`}
                                value={social.ariaLabel}
                                onChange={(e) => updateField('footer', `social.${index}.ariaLabel`, e.target.value)}
                                placeholder="GitHub"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="footer-copyright">Copyright Text</Label>
                    <Input
                      id="footer-copyright"
                      value={homeContent.footer.legal.copyright}
                      onChange={(e) => updateField('footer', 'legal.copyright', e.target.value)}
                      placeholder="© 2025 Gloria. All rights reserved."
                    />
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TabsContent>

          {/* Projects Content */}
          <TabsContent value="projects">
            <div className="space-y-6">
              {/* Project Type Tabs */}
              <Tabs defaultValue="ml-projects" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ml-projects">ML Projects</TabsTrigger>
                  <TabsTrigger value="pd-projects">PD Projects</TabsTrigger>
                </TabsList>

                {/* ML Projects Tab */}
                <TabsContent value="ml-projects">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Machine Learning Projects</h3>
                        <p className="text-sm text-muted-foreground">Edit ML project data</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {projectSaveMessage && (
                          <Badge variant={projectSaveMessage.includes('Error') ? 'destructive' : 'default'}>
                            {projectSaveMessage}
                          </Badge>
                        )}
                        <Button
                          onClick={handleSaveProjects}
                          disabled={isSavingProjects}
                          size="lg"
                        >
                          {isSavingProjects ? 'Saving...' : 'Save Projects'}
                        </Button>
                      </div>
                    </div>

                    {/* ML Projects List */}
                    <div className="space-y-4">
                      {mlProjectsData.map((project, projectIndex) => (
                        <Collapsible key={project.id} defaultOpen={projectIndex === 0}>
                          <CollapsibleTrigger asChild>
                            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                              <CardHeader>
                                <div className="flex justify-between items-center w-full">
                                  <div>
                                    <CardTitle className="flex items-center gap-2">
                                      {project.title}
                                      <Badge variant="outline">ML</Badge>
                                    </CardTitle>
                                    <CardDescription>{project.shortDescription}</CardDescription>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <Card className="mt-2">
                              <CardContent>
                                <div className="space-y-6">
                                  {/* Basic Info */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor={`ml-${projectIndex}-title`}>Title</Label>
                                      <Input
                                        id={`ml-${projectIndex}-title`}
                                        value={project.title}
                                        onChange={(e) => updateProjectField('ml', projectIndex, 'title', e.target.value)}
                                        placeholder="Project title"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`ml-${projectIndex}-slug`}>Slug</Label>
                                      <Input
                                        id={`ml-${projectIndex}-slug`}
                                        value={project.slug}
                                        onChange={(e) => updateProjectField('ml', projectIndex, 'slug', e.target.value)}
                                        placeholder="project-slug"
                                      />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                      <Label htmlFor={`ml-${projectIndex}-shortDesc`}>Short Description</Label>
                                      <Textarea
                                        id={`ml-${projectIndex}-shortDesc`}
                                        value={project.shortDescription}
                                        onChange={(e) => updateProjectField('ml', projectIndex, 'shortDescription', e.target.value)}
                                        placeholder="Brief project description"
                                        rows={2}
                                      />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                      <Label htmlFor={`ml-${projectIndex}-description`}>Description</Label>
                                      <Textarea
                                        id={`ml-${projectIndex}-description`}
                                        value={project.description || ''}
                                        onChange={(e) => updateProjectField('ml', projectIndex, 'description', e.target.value)}
                                        placeholder="Detailed project description"
                                        rows={3}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`ml-${projectIndex}-heroImage`}>Hero Image</Label>
                                      <Input
                                        id={`ml-${projectIndex}-heroImage`}
                                        value={project.heroImage}
                                        onChange={(e) => updateProjectField('ml', projectIndex, 'heroImage', e.target.value)}
                                        placeholder="/path/to/image.png"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`ml-${projectIndex}-gradientColors`}>Gradient Colors (comma-separated)</Label>
                                      <Input
                                        id={`ml-${projectIndex}-gradientColors`}
                                        value={project.gradientColors.join(', ')}
                                        onChange={(e) => updateProjectField('ml', projectIndex, 'gradientColors', e.target.value.split(', ').map(c => c.trim()))}
                                        placeholder="#F38301, #8EB2F2"
                                      />
                                    </div>
                                  </div>

                                  {/* Metrics */}
                                  <div>
                                    <Label className="text-base font-medium">Metrics</Label>
                                    <div className="space-y-2 mt-2">
                                      {project.metrics.map((metric, metricIndex) => (
                                        <div key={metricIndex} className="flex gap-2">
                                          <Input
                                            value={metric.value}
                                            onChange={(e) => updateProjectMetric('ml', projectIndex, metricIndex, 'value', e.target.value)}
                                            placeholder="Value"
                                            className="flex-1"
                                          />
                                          <Input
                                            value={metric.label}
                                            onChange={(e) => updateProjectMetric('ml', projectIndex, metricIndex, 'label', e.target.value)}
                                            placeholder="Label"
                                            className="flex-1"
                                          />
                                          <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeProjectMetric('ml', projectIndex, metricIndex)}
                                          >
                                            Remove
                                          </Button>
                                        </div>
                                      ))}
                                      <Button
                                        variant="outline"
                                        onClick={() => addProjectMetric('ml', projectIndex)}
                                      >
                                        Add Metric
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Sections Editing */}
                                  <div>
                                    <Label className="text-base font-medium">Sections ({project.sections.length})</Label>
                                    <div className="space-y-4 mt-2">
                                      {project.sections.map((section, sectionIndex) => (
                                        <Collapsible key={sectionIndex} defaultOpen={false}>
                                          <CollapsibleTrigger asChild>
                                            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                                              <CardHeader>
                                                <div className="flex justify-between items-center w-full">
                                                  <div>
                                                    <CardTitle className="text-base">{section.title}</CardTitle>
                                                    <CardDescription>Type: {section.type}</CardDescription>
                                                  </div>
                                                  <Badge variant="outline">{section.type}</Badge>
                                                </div>
                                              </CardHeader>
                                            </Card>
                                          </CollapsibleTrigger>
                                          <CollapsibleContent>
                                            <Card className="mt-2">
                                              <CardContent>
                                                <div className="space-y-4">
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                      <Label htmlFor={`ml-${projectIndex}-section-${sectionIndex}-title`}>Section Title</Label>
                                                      <Input
                                                        id={`ml-${projectIndex}-section-${sectionIndex}-title`}
                                                        value={section.title}
                                                        onChange={(e) => updateProjectSection('ml', projectIndex, sectionIndex, 'title', e.target.value)}
                                                        placeholder="Section title"
                                                      />
                                                    </div>
                                                    <div className="space-y-2">
                                                      <Label htmlFor={`ml-${projectIndex}-section-${sectionIndex}-type`}>Section Type</Label>
                                                      <Input
                                                        id={`ml-${projectIndex}-section-${sectionIndex}-type`}
                                                        value={section.type}
                                                        onChange={(e) => updateProjectSection('ml', projectIndex, sectionIndex, 'type', e.target.value)}
                                                        placeholder="Section type"
                                                      />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-2">
                                                      <Label htmlFor={`ml-${projectIndex}-section-${sectionIndex}-description`}>Description</Label>
                                                      <Textarea
                                                        id={`ml-${projectIndex}-section-${sectionIndex}-description`}
                                                        value={section.description}
                                                        onChange={(e) => updateProjectSection('ml', projectIndex, sectionIndex, 'description', e.target.value)}
                                                        placeholder="Section description"
                                                        rows={2}
                                                      />
                                                    </div>
                                                    {section.image && (
                                                      <div className="space-y-2">
                                                        <Label htmlFor={`ml-${projectIndex}-section-${sectionIndex}-image`}>Image</Label>
                                                        <Input
                                                          id={`ml-${projectIndex}-section-${sectionIndex}-image`}
                                                          value={section.image}
                                                          onChange={(e) => updateProjectSection('ml', projectIndex, sectionIndex, 'image', e.target.value)}
                                                          placeholder="/path/to/image.png"
                                                        />
                                                      </div>
                                                    )}
                                                    {section.layout && (
                                                      <div className="space-y-2">
                                                        <Label htmlFor={`ml-${projectIndex}-section-${sectionIndex}-layout`}>Layout</Label>
                                                        <Input
                                                          id={`ml-${projectIndex}-section-${sectionIndex}-layout`}
                                                          value={section.layout}
                                                          onChange={(e) => updateProjectSection('ml', projectIndex, sectionIndex, 'layout', e.target.value)}
                                                          placeholder="text-left-image-right"
                                                        />
                                                      </div>
                                                    )}
                                                  </div>

                                                  {/* Section-specific content editing */}
                                                  <div className="space-y-2">
                                                    <Label className="text-sm font-medium">Section Content</Label>
                                                    <SectionContentEditor
                                                      projectType="ml"
                                                      projectIndex={projectIndex}
                                                      sectionIndex={sectionIndex}
                                                      section={section}
                                                    />
                                                  </div>
                                                </div>
                                              </CardContent>
                                            </Card>
                                          </CollapsibleContent>
                                        </Collapsible>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* PD Projects Tab */}
                <TabsContent value="pd-projects">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Product Design Projects</h3>
                        <p className="text-sm text-muted-foreground">Edit Product Design project data</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {projectSaveMessage && (
                          <Badge variant={projectSaveMessage.includes('Error') ? 'destructive' : 'default'}>
                            {projectSaveMessage}
                          </Badge>
                        )}
                        <Button
                          onClick={handleSaveProjects}
                          disabled={isSavingProjects}
                          size="lg"
                        >
                          {isSavingProjects ? 'Saving...' : 'Save Projects'}
                        </Button>
                      </div>
                    </div>

                    {/* PD Projects List */}
                    <div className="space-y-4">
                      {productDesignProjectsData.map((project, projectIndex) => (
                        <Collapsible key={project.id} defaultOpen={projectIndex === 0}>
                          <CollapsibleTrigger asChild>
                            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                              <CardHeader>
                                <div className="flex justify-between items-center w-full">
                                  <div>
                                    <CardTitle className="flex items-center gap-2">
                                      {project.title}
                                      <Badge variant="outline">PD</Badge>
                                    </CardTitle>
                                    <CardDescription>{project.shortDescription}</CardDescription>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <Card className="mt-2">
                              <CardContent>
                                <div className="space-y-6">
                                  {/* Basic Info */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor={`pd-${projectIndex}-title`}>Title</Label>
                                      <Input
                                        id={`pd-${projectIndex}-title`}
                                        value={project.title}
                                        onChange={(e) => updateProjectField('pd', projectIndex, 'title', e.target.value)}
                                        placeholder="Project title"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`pd-${projectIndex}-slug`}>Slug</Label>
                                      <Input
                                        id={`pd-${projectIndex}-slug`}
                                        value={project.slug}
                                        onChange={(e) => updateProjectField('pd', projectIndex, 'slug', e.target.value)}
                                        placeholder="project-slug"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`pd-${projectIndex}-company`}>Company</Label>
                                      <Input
                                        id={`pd-${projectIndex}-company`}
                                        value={project.company || ''}
                                        onChange={(e) => updateProjectField('pd', projectIndex, 'company', e.target.value)}
                                        placeholder="Company name"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`pd-${projectIndex}-role`}>Role</Label>
                                      <Input
                                        id={`pd-${projectIndex}-role`}
                                        value={project.role || ''}
                                        onChange={(e) => updateProjectField('pd', projectIndex, 'role', e.target.value)}
                                        placeholder="Role"
                                      />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                      <Label htmlFor={`pd-${projectIndex}-shortDesc`}>Short Description</Label>
                                      <Textarea
                                        id={`pd-${projectIndex}-shortDesc`}
                                        value={project.shortDescription}
                                        onChange={(e) => updateProjectField('pd', projectIndex, 'shortDescription', e.target.value)}
                                        placeholder="Brief project description"
                                        rows={2}
                                      />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                      <Label htmlFor={`pd-${projectIndex}-description`}>Description</Label>
                                      <Textarea
                                        id={`pd-${projectIndex}-description`}
                                        value={project.description || ''}
                                        onChange={(e) => updateProjectField('pd', projectIndex, 'description', e.target.value)}
                                        placeholder="Detailed project description"
                                        rows={3}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`pd-${projectIndex}-heroImage`}>Hero Image</Label>
                                      <Input
                                        id={`pd-${projectIndex}-heroImage`}
                                        value={project.heroImage}
                                        onChange={(e) => updateProjectField('pd', projectIndex, 'heroImage', e.target.value)}
                                        placeholder="/path/to/image.png"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`pd-${projectIndex}-gradientColors`}>Gradient Colors (comma-separated)</Label>
                                      <Input
                                        id={`pd-${projectIndex}-gradientColors`}
                                        value={project.gradientColors.join(', ')}
                                        onChange={(e) => updateProjectField('pd', projectIndex, 'gradientColors', e.target.value.split(', ').map(c => c.trim()))}
                                        placeholder="#D29C81, #C7B8DA"
                                      />
                                    </div>
                                  </div>

                                  {/* Metrics */}
                                  <div>
                                    <Label className="text-base font-medium">Metrics</Label>
                                    <div className="space-y-2 mt-2">
                                      {project.metrics.map((metric, metricIndex) => (
                                        <div key={metricIndex} className="flex gap-2">
                                          <Input
                                            value={metric.value}
                                            onChange={(e) => updateProjectMetric('pd', projectIndex, metricIndex, 'value', e.target.value)}
                                            placeholder="Value"
                                            className="flex-1"
                                          />
                                          <Input
                                            value={metric.label}
                                            onChange={(e) => updateProjectMetric('pd', projectIndex, metricIndex, 'label', e.target.value)}
                                            placeholder="Label"
                                            className="flex-1"
                                          />
                                          <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeProjectMetric('pd', projectIndex, metricIndex)}
                                          >
                                            Remove
                                          </Button>
                                        </div>
                                      ))}
                                      <Button
                                        variant="outline"
                                        onClick={() => addProjectMetric('pd', projectIndex)}
                                      >
                                        Add Metric
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Sections Editing */}
                                  <div>
                                    <Label className="text-base font-medium">Sections ({project.sections.length})</Label>
                                    <div className="space-y-4 mt-2">
                                      {project.sections.map((section, sectionIndex) => (
                                        <Collapsible key={sectionIndex} defaultOpen={false}>
                                          <CollapsibleTrigger asChild>
                                            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                                              <CardHeader>
                                                <div className="flex justify-between items-center w-full">
                                                  <div>
                                                    <CardTitle className="text-base">{section.title}</CardTitle>
                                                    <CardDescription>Type: {section.type}</CardDescription>
                                                  </div>
                                                  <Badge variant="outline">{section.type}</Badge>
                                                </div>
                                              </CardHeader>
                                            </Card>
                                          </CollapsibleTrigger>
                                          <CollapsibleContent>
                                            <Card className="mt-2">
                                              <CardContent>
                                                <div className="space-y-4">
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                      <Label htmlFor={`pd-${projectIndex}-section-${sectionIndex}-title`}>Section Title</Label>
                                                      <Input
                                                        id={`pd-${projectIndex}-section-${sectionIndex}-title`}
                                                        value={section.title}
                                                        onChange={(e) => updateProjectSection('pd', projectIndex, sectionIndex, 'title', e.target.value)}
                                                        placeholder="Section title"
                                                      />
                                                    </div>
                                                    <div className="space-y-2">
                                                      <Label htmlFor={`pd-${projectIndex}-section-${sectionIndex}-type`}>Section Type</Label>
                                                      <Input
                                                        id={`pd-${projectIndex}-section-${sectionIndex}-type`}
                                                        value={section.type}
                                                        onChange={(e) => updateProjectSection('pd', projectIndex, sectionIndex, 'type', e.target.value)}
                                                        placeholder="Section type"
                                                      />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-2">
                                                      <Label htmlFor={`pd-${projectIndex}-section-${sectionIndex}-description`}>Description</Label>
                                                      <Textarea
                                                        id={`pd-${projectIndex}-section-${sectionIndex}-description`}
                                                        value={section.description}
                                                        onChange={(e) => updateProjectSection('pd', projectIndex, sectionIndex, 'description', e.target.value)}
                                                        placeholder="Section description"
                                                        rows={2}
                                                      />
                                                    </div>
                                                    {section.image && (
                                                      <div className="space-y-2">
                                                        <Label htmlFor={`pd-${projectIndex}-section-${sectionIndex}-image`}>Image</Label>
                                                        <Input
                                                          id={`pd-${projectIndex}-section-${sectionIndex}-image`}
                                                          value={section.image}
                                                          onChange={(e) => updateProjectSection('pd', projectIndex, sectionIndex, 'image', e.target.value)}
                                                          placeholder="/path/to/image.png"
                                                        />
                                                      </div>
                                                    )}
                                                    {section.layout && (
                                                      <div className="space-y-2">
                                                        <Label htmlFor={`pd-${projectIndex}-section-${sectionIndex}-layout`}>Layout</Label>
                                                        <Input
                                                          id={`pd-${projectIndex}-section-${sectionIndex}-layout`}
                                                          value={section.layout}
                                                          onChange={(e) => updateProjectSection('pd', projectIndex, sectionIndex, 'layout', e.target.value)}
                                                          placeholder="text-left-image-right"
                                                        />
                                                      </div>
                                                    )}
                                                  </div>

                                                  {/* Section-specific content editing */}
                                                  <div className="space-y-2">
                                                    <Label className="text-sm font-medium">Section Content</Label>
                                                    <SectionContentEditor
                                                      projectType="pd"
                                                      projectIndex={projectIndex}
                                                      sectionIndex={sectionIndex}
                                                      section={section}
                                                    />
                                                  </div>
                                                </div>
                                              </CardContent>
                                            </Card>
                                          </CollapsibleContent>
                                        </Collapsible>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Images Content */}
          <TabsContent value="images">
            <div className="space-y-6">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Images</CardTitle>
                  <CardDescription>Upload new images to your public folder</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image-upload">Choose Image File</Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Supported formats: JPG, PNG, GIF, WebP, SVG. Max size: 5MB
                      </p>
                    </div>
                    
                    {isUploading && (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span>Uploading...</span>
                      </div>
                    )}
                    
                    {uploadMessage && (
                      <div className={`p-3 rounded-md ${
                        uploadMessage.includes('Error') || uploadMessage.includes('failed')
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-green-50 text-green-700'
                      }`}>
                        {uploadMessage}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Image Gallery */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Image Gallery</CardTitle>
                      <CardDescription>
                        {images.length} image{images.length !== 1 ? 's' : ''} in public folder
                      </CardDescription>
                    </div>
                    <Button variant="outline" onClick={loadImages} size="sm">
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {images.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No images found in the public folder. Upload some images to get started.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {images.map((image) => (
                        <Card key={image.name} className="overflow-hidden">
                          <div className="aspect-square relative bg-muted">
                            <Image
                              src={image.url}
                              alt={image.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              onError={(e) => {
                                // Fallback for non-image files or broken images
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <div class="text-center">
                                      <div class="text-2xl mb-1">📄</div>
                                      <div class="text-xs">${image.type.toUpperCase()}</div>
                                    </div>
                                  </div>
                                `;
                              }}
                            />
                          </div>
                          <CardContent className="p-3">
                            <div className="space-y-1">
                              <h4 className="font-medium text-sm truncate" title={image.name}>
                                {image.name}
                              </h4>
                              <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>{(image.size / 1024).toFixed(1)} KB</span>
                                <Badge variant="outline" className="text-xs">
                                  {image.type}
                                </Badge>
                              </div>
                              <div className="flex gap-1 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-xs"
                                  onClick={() => {
                                    navigator.clipboard.writeText(image.url);
                                  }}
                                >
                                  Copy URL
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-xs"
                                  onClick={() => {
                                    window.open(image.url, '_blank');
                                  }}
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
