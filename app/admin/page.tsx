'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HomeContent, ProjectSection } from '@/types/project';
import homeContentData from '@/app/data/homeContent.json';
import { mlProjects } from '@/app/data/mlProjects';
import { productDesignProjects } from '@/app/data/productDesignProjects';
import stylesData from '@/app/data/styles.json';

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
import { ImageSelector } from '../components/admin/ImageSelector';

export default function AdminPage() {
  const [homeContent, setHomeContent] = useState<HomeContent>(homeContentData as HomeContent);
  const [mlProjectsData, setMlProjectsData] = useState(mlProjects);
  const [productDesignProjectsData, setProductDesignProjectsData] = useState(productDesignProjects);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [projectSaveMessage, setProjectSaveMessage] = useState('');
  const [isSavingProjects, setIsSavingProjects] = useState(false);
  
  // Styles management state
  const [stylesDataState, setStylesDataState] = useState(stylesData);
  const [isSavingStyles, setIsSavingStyles] = useState(false);
  const [stylesSaveMessage, setStylesSaveMessage] = useState('');
  
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
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadMessage('');

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        
        if (response.ok) {
          return { success: true, filename: data.filename, file: file.name };
        } else {
          return { success: false, error: data.error, file: file.name };
        }
      });

      const results = await Promise.all(uploadPromises);
      
      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);

      if (successful.length > 0) {
        setUploadMessage(
          `Successfully uploaded ${successful.length} file${successful.length > 1 ? 's' : ''}: ${successful.map(r => r.filename).join(', ')}`
        );
      }
      
      if (failed.length > 0) {
        setUploadMessage(prev => 
          prev + (prev ? '\n' : '') + `Failed to upload ${failed.length} file${failed.length > 1 ? 's' : ''}: ${failed.map(r => `${r.file}: ${r.error}`).join('; ')}`
        );
      }

      event.target.value = ''; // Clear the input
      await loadImages(); // Refresh the image list
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
    setHomeContent(prev => {
      const newPrev = JSON.parse(JSON.stringify(prev)); // Deep clone
      const keys = field.split('.');
      let current: unknown = newPrev[section];
      
      // Navigate to the parent of the target field
      for (let i = 0; i < keys.length - 1; i++) {
        if (current && typeof current === 'object') {
          current = (current as Record<string, unknown>)[keys[i]];
        }
      }
      
      // Set the final value
      if (current && typeof current === 'object') {
        (current as Record<string, unknown>)[keys[keys.length - 1]] = value;
      }
      
      return newPrev;
    });
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

  // Styles management functions
  const updateStylesField = (fieldPath: string, value: string) => {
    setStylesDataState(prev => {
      const keys = fieldPath.split('.');
      let current: Record<string, unknown> = { ...prev };
      
      // Navigate to the parent of the target field
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
        current = current[keys[i]] as Record<string, unknown>;
      }
      
      // Set the final value
      current[keys[keys.length - 1]] = value;
      
      return { ...prev };
    });
  };

  const handleSaveStyles = async () => {
    setIsSavingStyles(true);
    setStylesSaveMessage('');

    try {
      const response = await fetch('/api/admin/save-styles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stylesDataState),
      });

      if (response.ok) {
        setStylesSaveMessage('Styles saved successfully!');
        setTimeout(() => setStylesSaveMessage(''), 3000);
      } else {
        setStylesSaveMessage('Error saving styles');
      }
    } catch {
      setStylesSaveMessage('Error saving styles');
    } finally {
      setIsSavingStyles(false);
    }
  };

  const addGradientColor = () => {
    setStylesDataState(prev => ({
      ...prev,
      gradients: {
        ...prev.gradients,
        projects: [...(prev.gradients.projects as string[]), '#000000']
      }
    }));
  };

  const removeGradientColor = (index: number) => {
    setStylesDataState(prev => ({
      ...prev,
      gradients: {
        ...prev.gradients,
        projects: (prev.gradients.projects as string[]).filter((_, i) => i !== index)
      }
    }));
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
          (current as unknown as unknown[]).push(defaultItem);
          
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
          (current as unknown as unknown[]).push(defaultItem);
          
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
          (current as unknown as unknown[]).splice(index, 1);
          
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
          (current as unknown as unknown[]).splice(index, 1);
          
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
            <ImageSelector
              value={section.image || ''}
              onChange={(value) => updateSectionField('image', value)}
              label="Architecture Image"
            />
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
            <ImageSelector
              value={section.image || ''}
              onChange={(value) => updateSectionField('image', value)}
              label="Section Image"
            />
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
            <ImageSelector
              value={section.image || ''}
              onChange={(value) => updateSectionField('image', value)}
              label="Section Image"
            />
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

      case 'generic':
      case undefined:
        // Handle generic sections that might have images arrays
        return (
          <div className="space-y-4">
            {/* Handle single image field */}
            {(section as any).image && (
              <div className="space-y-2">
                <Label>Section Image</Label>
                <ImageSelector
                  value={(section as any).image || ''}
                  onChange={(value) => updateSectionField('image', value)}
                  label="Section Image"
                />
              </div>
            )}
            
            {/* Handle images array */}
            {(section as any).images && (
              <div className="space-y-4">
                <Label className="text-sm font-medium">Section Images</Label>
                {(section as any).images?.map((image: string, imageIndex: number) => (
                  <div key={imageIndex} className="flex gap-2 items-center">
                    <div className="flex-1">
                      <ImageSelector
                        value={image}
                        onChange={(value) => updateSectionField(`images.${imageIndex}`, value)}
                        label={`Image ${imageIndex + 1}`}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('images', imageIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('images', '')}
                >
                  Add Image
                </Button>
              </div>
            )}
            
            {/* Fallback to JSON editor for other fields */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Other Content (JSON format)</Label>
              <Textarea
                value={JSON.stringify({
                  ...section,
                  image: undefined,
                  images: undefined
                }, null, 2)}
                onChange={(e) => {
                  try {
                    const updated = JSON.parse(e.target.value);
                    if (projectType === 'ml') {
                      setMlProjectsData(prev => {
                        const updatedProjects = [...prev];
                        updatedProjects[projectIndex].sections[sectionIndex] = {
                          ...updatedProjects[projectIndex].sections[sectionIndex],
                          ...updated,
                          image: (section as any).image,
                          images: (section as any).images
                        };
                        return updatedProjects;
                      });
                    } else {
                      setProductDesignProjectsData(prev => {
                        const updatedProjects = [...prev];
                        updatedProjects[projectIndex].sections[sectionIndex] = {
                          ...updatedProjects[projectIndex].sections[sectionIndex],
                          ...updated,
                          image: (section as any).image,
                          images: (section as any).images
                        };
                        return updatedProjects;
                      });
                    }
                  } catch {
                    // Invalid JSON, ignore
                  }
                }}
                placeholder="Edit other section properties as JSON"
                rows={8}
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
          <div className="py-4">
            <div>
              <h1 className="text-2xl font-bold">Home Page Admin</h1>
              <p className="text-sm text-muted-foreground">Manage your home page content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Save Button Section */}
        <div className="flex justify-end mb-6">
          {saveMessage && (
            <Badge variant={saveMessage.includes('Error') ? 'destructive' : 'default'} className="mr-4">
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

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="home">Home Page</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="styles">Styles</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          {/* Home Page Content */}
          <TabsContent value="home">
            <div className="space-y-6">
              {/* Hero Section */}
              <Collapsible defaultOpen={false}>
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
                    <ImageSelector
                      id="hero-image-src"
                      value={homeContent.hero.image.src}
                      onChange={(value) => updateField('hero', 'image.src', value)}
                      label="Image Source"
                    />
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
              <Collapsible defaultOpen={false}>
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
              <Collapsible defaultOpen={false}>
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
              <Collapsible defaultOpen={false}>
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
                    <ImageSelector
                      id="about-image-src"
                      value={homeContent.about.image.src}
                      onChange={(value) => updateField('about', 'image.src', value)}
                      label="Image Source"
                    />
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

              {/* Contact Section */}
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Contact Section</CardTitle>
                          <CardDescription>Manage your contact section content</CardDescription>
                        </div>
                        <Badge variant="outline">Contact</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent>
                      <div className="max-w-6xl mx-auto space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="contact-title">Section Title</Label>
                          <Input
                            id="contact-title"
                            value={homeContent.contact.title}
                            onChange={(e) => updateField('contact', 'title', e.target.value)}
                            placeholder="Want to talk about your project?"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-subtitle">Section Subtitle</Label>
                          <Textarea
                            id="contact-subtitle"
                            value={homeContent.contact.subtitle}
                            onChange={(e) => updateField('contact', 'subtitle', e.target.value)}
                            placeholder="Message me on LinkedIn or send me an email"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="contact-email">Email Link</Label>
                            <Input
                              id="contact-email"
                              value={homeContent.contact.email}
                              onChange={(e) => updateField('contact', 'email', e.target.value)}
                              placeholder="mailto:gloria@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contact-linkedin">LinkedIn URL</Label>
                            <Input
                              id="contact-linkedin"
                              value={homeContent.contact.linkedin}
                              onChange={(e) => updateField('contact', 'linkedin', e.target.value)}
                              placeholder="https://linkedin.com/in/yourprofile"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label className="text-sm font-medium">Opportunities (First Row)</Label>
                          <div className="space-y-2">
                            {homeContent.contact.opportunities[0]?.map((opportunity: string, index: number) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={opportunity}
                                  onChange={(e) => updateField(`contact.opportunities.0.${index}`, e.target.value)}
                                  placeholder="Opportunity name"
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    const updated = [...homeContent.contact.opportunities[0]];
                                    updated.splice(index, 1);
                                    updateField('contact', 'opportunities.0', updated);
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={() => {
                                const updated = [...(homeContent.contact.opportunities[0] || []), ''];
                                updateField('contact', 'opportunities.0', updated);
                              }}
                            >
                              Add Opportunity
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label className="text-sm font-medium">Opportunities (Second Row)</Label>
                          <div className="space-y-2">
                            {homeContent.contact.opportunities[1]?.map((opportunity: string, index: number) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={opportunity}
                                  onChange={(e) => updateField(`contact.opportunities.1.${index}`, e.target.value)}
                                  placeholder="Opportunity name"
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    const updated = [...homeContent.contact.opportunities[1]];
                                    updated.splice(index, 1);
                                    updateField('contact', 'opportunities.1', updated);
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={() => {
                                const updated = [...(homeContent.contact.opportunities[1] || []), ''];
                                updateField('contact', 'opportunities.1', updated);
                              }}
                            >
                              Add Opportunity
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Footer Section */}
              <Collapsible defaultOpen={false}>
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
                                    <ImageSelector
                                      id={`ml-${projectIndex}-heroImage`}
                                      value={project.heroImage}
                                      onChange={(value) => updateProjectField('ml', projectIndex, 'heroImage', value)}
                                      label="Hero Image"
                                    />
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
                                    <ImageSelector
                                      id={`pd-${projectIndex}-heroImage`}
                                      value={project.heroImage}
                                      onChange={(value) => updateProjectField('pd', projectIndex, 'heroImage', value)}
                                      label="Hero Image"
                                    />
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
                  <CardDescription>Upload one or more new images to your public folder</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image-upload">Choose Image Files</Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Supported formats: JPG, PNG, GIF, WebP, SVG. Max size: 5MB per file. You can select multiple files.
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

          {/* Styles Content */}
          <TabsContent value="styles">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Global Styles Management</h3>
                  <p className="text-sm text-muted-foreground">Manage colors, typography, layout, and animations</p>
                </div>
                <div className="flex items-center gap-4">
                  {stylesSaveMessage && (
                    <Badge variant={stylesSaveMessage.includes('Error') ? 'destructive' : 'default'}>
                      {stylesSaveMessage}
                    </Badge>
                  )}
                  <Button
                    onClick={handleSaveStyles}
                    disabled={isSavingStyles}
                    size="lg"
                  >
                    {isSavingStyles ? 'Saving...' : 'Save Styles'}
                  </Button>
                </div>
              </div>

              {/* Color Theme Management */}
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Color Theme</CardTitle>
                          <CardDescription>Manage your website color scheme</CardDescription>
                        </div>
                        <Badge variant="outline">Colors</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent className="space-y-6">
                      {/* Primary Colors */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Primary Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={stylesData.colors.primary}
                              onChange={(e) => updateStylesField('colors.primary', e.target.value)}
                              className="w-16 h-10"
                            />
                            <Input
                              value={stylesData.colors.primary}
                              onChange={(e) => updateStylesField('colors.primary', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Secondary Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={stylesData.colors.secondary}
                              onChange={(e) => updateStylesField('colors.secondary', e.target.value)}
                              className="w-16 h-10"
                            />
                            <Input
                              value={stylesData.colors.secondary}
                              onChange={(e) => updateStylesField('colors.secondary', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Background Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={stylesData.colors.background}
                              onChange={(e) => updateStylesField('colors.background', e.target.value)}
                              className="w-16 h-10"
                            />
                            <Input
                              value={stylesData.colors.background}
                              onChange={(e) => updateStylesField('colors.background', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Text Colors */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>Primary Text</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={stylesData.colors.text.primary}
                              onChange={(e) => updateStylesField('colors.text.primary', e.target.value)}
                              className="w-16 h-10"
                            />
                            <Input
                              value={stylesData.colors.text.primary}
                              onChange={(e) => updateStylesField('colors.text.primary', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Secondary Text</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={stylesData.colors.text.secondary}
                              onChange={(e) => updateStylesField('colors.text.secondary', e.target.value)}
                              className="w-16 h-10"
                            />
                            <Input
                              value={stylesData.colors.text.secondary}
                              onChange={(e) => updateStylesField('colors.text.secondary', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Accent Text</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={stylesData.colors.text.accent}
                              onChange={(e) => updateStylesField('colors.text.accent', e.target.value)}
                              className="w-16 h-10"
                            />
                            <Input
                              value={stylesData.colors.text.accent}
                              onChange={(e) => updateStylesField('colors.text.accent', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Muted Text</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={stylesData.colors.text.muted}
                              onChange={(e) => updateStylesField('colors.text.muted', e.target.value)}
                              className="w-16 h-10"
                            />
                            <Input
                              value={stylesData.colors.text.muted}
                              onChange={(e) => updateStylesField('colors.text.muted', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hover States */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Hover States</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Primary Hover</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={stylesData.colors.hover.primary}
                                onChange={(e) => updateStylesField('colors.hover.primary', e.target.value)}
                                className="w-16 h-10"
                              />
                              <Input
                                value={stylesData.colors.hover.primary}
                                onChange={(e) => updateStylesField('colors.hover.primary', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Secondary Hover</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={stylesData.colors.hover.secondary}
                                onChange={(e) => updateStylesField('colors.hover.secondary', e.target.value)}
                                className="w-16 h-10"
                              />
                              <Input
                                value={stylesData.colors.hover.secondary}
                                onChange={(e) => updateStylesField('colors.hover.secondary', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Background Hover</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={stylesData.colors.hover.background}
                                onChange={(e) => updateStylesField('colors.hover.background', e.target.value)}
                                className="w-16 h-10"
                              />
                              <Input
                                value={stylesData.colors.hover.background}
                                onChange={(e) => updateStylesField('colors.hover.background', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Colors */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Interactive Colors</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label>Success</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={stylesData.colors.interactive.success}
                                onChange={(e) => updateStylesField('colors.interactive.success', e.target.value)}
                                className="w-16 h-10"
                              />
                              <Input
                                value={stylesData.colors.interactive.success}
                                onChange={(e) => updateStylesField('colors.interactive.success', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Warning</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={stylesData.colors.interactive.warning}
                                onChange={(e) => updateStylesField('colors.interactive.warning', e.target.value)}
                                className="w-16 h-10"
                              />
                              <Input
                                value={stylesData.colors.interactive.warning}
                                onChange={(e) => updateStylesField('colors.interactive.warning', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Error</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={stylesData.colors.interactive.error}
                                onChange={(e) => updateStylesField('colors.interactive.error', e.target.value)}
                                className="w-16 h-10"
                              />
                              <Input
                                value={stylesData.colors.interactive.error}
                                onChange={(e) => updateStylesField('colors.interactive.error', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Info</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={stylesData.colors.interactive.info}
                                onChange={(e) => updateStylesField('colors.interactive.info', e.target.value)}
                                className="w-16 h-10"
                              />
                              <Input
                                value={stylesData.colors.interactive.info}
                                onChange={(e) => updateStylesField('colors.interactive.info', e.target.value)}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project Gradients */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Project Gradients</h4>
                        <div className="space-y-2">
                          {stylesData.gradients.projects.map((color, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <Input
                                type="color"
                                value={color}
                                onChange={(e) => updateStylesField(`gradients.projects.${index}`, e.target.value)}
                                className="w-16 h-10"
                              />
                              <Input
                                value={color}
                                onChange={(e) => updateStylesField(`gradients.projects.${index}`, e.target.value)}
                                placeholder="#000000"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeGradientColor(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={addGradientColor}
                          >
                            Add Gradient Color
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Typography Settings */}
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Typography</CardTitle>
                          <CardDescription>Manage fonts, sizes, and text styles</CardDescription>
                        </div>
                        <Badge variant="outline">Typography</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent className="space-y-6">
                      {/* Font Families */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Font Families</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Primary Font</Label>
                            <Select value={stylesData.typography.fontFamily.primary} onValueChange={(value) => updateStylesField('typography.fontFamily.primary', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select font" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="'Bricolage_Grotesque', sans-serif">Bricolage Grotesque</SelectItem>
                                <SelectItem value="system-ui, sans-serif">System UI</SelectItem>
                                <SelectItem value="'Inter', sans-serif">Inter</SelectItem>
                                <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                                <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Secondary Font</Label>
                            <Select value={stylesData.typography.fontFamily.secondary} onValueChange={(value) => updateStylesField('typography.fontFamily.secondary', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select font" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="system-ui, sans-serif">System UI</SelectItem>
                                <SelectItem value="'Inter', sans-serif">Inter</SelectItem>
                                <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                                <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Monospace Font</Label>
                            <Select value={stylesData.typography.fontFamily.monospace} onValueChange={(value) => updateStylesField('typography.fontFamily.monospace', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select font" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="'JetBrains Mono', monospace">JetBrains Mono</SelectItem>
                                <SelectItem value="'Fira Code', monospace">Fira Code</SelectItem>
                                <SelectItem value="'Source Code Pro', monospace">Source Code Pro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      
                      {/* Font Weights */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Font Weights</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          {Object.entries(stylesData.typography.fontWeights).map(([weight, value]) => (
                            <div key={weight} className="space-y-2">
                              <Label className="capitalize">{weight}</Label>
                              <Select value={value} onValueChange={(newValue) => updateStylesField(`typography.fontWeights.${weight}`, newValue)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="100">100 (Thin)</SelectItem>
                                  <SelectItem value="200">200 (Extra Light)</SelectItem>
                                  <SelectItem value="300">300 (Light)</SelectItem>
                                  <SelectItem value="400">400 (Normal)</SelectItem>
                                  <SelectItem value="500">500 (Medium)</SelectItem>
                                  <SelectItem value="600">600 (Semi Bold)</SelectItem>
                                  <SelectItem value="700">700 (Bold)</SelectItem>
                                  <SelectItem value="800">800 (Extra Bold)</SelectItem>
                                  <SelectItem value="900">900 (Black)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Line Heights & Letter Spacing */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-4">Line Heights</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(stylesData.typography.lineHeights).map(([height, value]) => (
                              <div key={height} className="space-y-2">
                                <Label className="capitalize">{height}</Label>
                                <Select value={value} onValueChange={(newValue) => updateStylesField(`typography.lineHeights.${height}`, newValue)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1.0</SelectItem>
                                    <SelectItem value="1.25">1.25</SelectItem>
                                    <SelectItem value="1.375">1.375</SelectItem>
                                    <SelectItem value="1.5">1.5</SelectItem>
                                    <SelectItem value="1.625">1.625</SelectItem>
                                    <SelectItem value="2">2.0</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-4">Letter Spacing</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(stylesData.typography.letterSpacing).map(([spacing, value]) => (
                              <div key={spacing} className="space-y-2">
                                <Label className="capitalize">{spacing}</Label>
                                <Select value={value} onValueChange={(newValue) => updateStylesField(`typography.letterSpacing.${spacing}`, newValue)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="-0.1em">-0.1em</SelectItem>
                                    <SelectItem value="-0.05em">-0.05em</SelectItem>
                                    <SelectItem value="-0.025em">-0.025em</SelectItem>
                                    <SelectItem value="0em">0em</SelectItem>
                                    <SelectItem value="0.025em">0.025em</SelectItem>
                                    <SelectItem value="0.05em">0.05em</SelectItem>
                                    <SelectItem value="0.1em">0.1em</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Layout & Spacing */}
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Layout & Spacing</CardTitle>
                          <CardDescription>Manage spacing, containers, and layout settings</CardDescription>
                        </div>
                        <Badge variant="outline">Layout</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent className="space-y-6">
                      {/* Spacing Scale */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Spacing Scale</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {Object.entries(stylesData.layout.spacing).map(([size, value]) => (
                            <div key={size} className="space-y-2">
                              <Label className="capitalize">{size}</Label>
                              <Input
                                value={value}
                                onChange={(e) => updateStylesField(`layout.spacing.${size}`, e.target.value)}
                                placeholder="e.g., 16px"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Responsive Values Table */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Responsive Values (Breakpoints, Containers, Border Radius, Spacing, Font Sizes)</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-200">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">Variant</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">Breakpoints</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">Containers</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">Border Radius</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">Spacing</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">Font Sizes (Mobile/Tablet/Desktop)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].map((variant) => {
                                const hasBreakpoint = stylesData.breakpoints[variant as keyof typeof stylesData.breakpoints];
                                const hasContainer = stylesData.layout.containers[variant as keyof typeof stylesData.layout.containers];
                                const hasBorderRadius = stylesData.layout.borderRadius[variant as keyof typeof stylesData.layout.borderRadius];
                                const hasSpacing = stylesData.layout.spacing[variant as keyof typeof stylesData.layout.spacing];
                                const hasFontSize = stylesData.typography.fontSizes[variant as keyof typeof stylesData.typography.fontSizes];
                                
                                if (!hasBreakpoint && !hasContainer && !hasBorderRadius && !hasSpacing && !hasFontSize) return null;
                                
                                return (
                                  <tr key={variant} className="hover:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2 font-medium text-sm">{variant}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      {hasBreakpoint ? (
                                        <Input
                                          value={stylesData.breakpoints[variant as keyof typeof stylesData.breakpoints]}
                                          onChange={(e) => updateStylesField(`breakpoints.${variant}`, e.target.value)}
                                          placeholder="e.g., 768px"
                                          className="w-full"
                                        />
                                      ) : (
                                        <span className="text-gray-400">-</span>
                                      )}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      {hasContainer ? (
                                        <Input
                                          value={stylesData.layout.containers[variant as keyof typeof stylesData.layout.containers]}
                                          onChange={(e) => updateStylesField(`layout.containers.${variant}`, e.target.value)}
                                          placeholder="e.g., 1280px"
                                          className="w-full"
                                        />
                                      ) : (
                                        <span className="text-gray-400">-</span>
                                      )}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      {hasBorderRadius ? (
                                        <Input
                                          value={stylesData.layout.borderRadius[variant as keyof typeof stylesData.layout.borderRadius]}
                                          onChange={(e) => updateStylesField(`layout.borderRadius.${variant}`, e.target.value)}
                                          placeholder="e.g., 8px"
                                          className="w-full"
                                        />
                                      ) : (
                                        <span className="text-gray-400">-</span>
                                      )}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      {hasSpacing ? (
                                        <Input
                                          value={stylesData.layout.spacing[variant as keyof typeof stylesData.layout.spacing]}
                                          onChange={(e) => updateStylesField(`layout.spacing.${variant}`, e.target.value)}
                                          placeholder="e.g., 16px"
                                          className="w-full"
                                        />
                                      ) : (
                                        <span className="text-gray-400">-</span>
                                      )}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      {hasFontSize ? (
                                        <div className="space-y-1">
                                          {(stylesData.typography.fontSizes[variant as keyof typeof stylesData.typography.fontSizes] as string[]).map((size, index) => (
                                            <Input
                                              key={index}
                                              value={size}
                                              onChange={(e) => updateStylesField(`typography.fontSizes.${variant}.${index}`, e.target.value)}
                                              placeholder={index === 0 ? "Mobile" : index === 1 ? "Tablet" : "Desktop"}
                                              className="w-full text-xs"
                                            />
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-gray-400">-</span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                              {/* Special case for 'none' and 'full' border radius */}
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2 font-medium text-sm">none</td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <span className="text-gray-400">-</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <span className="text-gray-400">-</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <Input
                                    value={stylesData.layout.borderRadius.none}
                                    onChange={(e) => updateStylesField('layout.borderRadius.none', e.target.value)}
                                    placeholder="e.g., 0px"
                                    className="w-full"
                                  />
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <span className="text-gray-400">-</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <span className="text-gray-400">-</span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2 font-medium text-sm">full</td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <span className="text-gray-400">-</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <span className="text-gray-400">-</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <Input
                                    value={stylesData.layout.borderRadius.full}
                                    onChange={(e) => updateStylesField('layout.borderRadius.full', e.target.value)}
                                    placeholder="e.g., 9999px"
                                    className="w-full"
                                  />
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <span className="text-gray-400">-</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                  <span className="text-gray-400">-</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          This table shows all responsive values across different property types. Font sizes show Mobile/Tablet/Desktop values. Edit values directly in the table.
                        </p>
                      </div>

                      {/* Section Padding & Margins */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-4">Section Padding</h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Top Padding</Label>
                              <Input
                                value={stylesData.layout.sections.padding.top}
                                onChange={(e) => updateStylesField('layout.sections.padding.top', e.target.value)}
                                placeholder="e.g., 64px"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Bottom Padding</Label>
                              <Input
                                value={stylesData.layout.sections.padding.bottom}
                                onChange={(e) => updateStylesField('layout.sections.padding.bottom', e.target.value)}
                                placeholder="e.g., 64px"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-4">Section Margins</h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Top Margin</Label>
                              <Input
                                value={stylesData.layout.sections.margin.top}
                                onChange={(e) => updateStylesField('layout.sections.margin.top', e.target.value)}
                                placeholder="e.g., 0px"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Bottom Margin</Label>
                              <Input
                                value={stylesData.layout.sections.margin.bottom}
                                onChange={(e) => updateStylesField('layout.sections.margin.bottom', e.target.value)}
                                placeholder="e.g., 0px"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Animations */}
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <CardTitle>Animations</CardTitle>
                          <CardDescription>Manage animation durations, easing, and transitions</CardDescription>
                        </div>
                        <Badge variant="outline">Animations</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent className="space-y-6">
                      {/* Animation Durations */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Animation Durations</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(stylesData.animations.durations).map(([duration, value]) => (
                            <div key={duration} className="space-y-2">
                              <Label className="capitalize">{duration}</Label>
                              <Select value={value} onValueChange={(newValue) => updateStylesField(`animations.durations.${duration}`, newValue)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="100ms">100ms</SelectItem>
                                  <SelectItem value="150ms">150ms</SelectItem>
                                  <SelectItem value="200ms">200ms</SelectItem>
                                  <SelectItem value="300ms">300ms</SelectItem>
                                  <SelectItem value="500ms">500ms</SelectItem>
                                  <SelectItem value="700ms">700ms</SelectItem>
                                  <SelectItem value="1000ms">1000ms</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Easing Functions */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Easing Functions</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(stylesData.animations.easing).map(([easing, value]) => (
                            <div key={easing} className="space-y-2">
                              <Label className="capitalize">{easing}</Label>
                              <Select value={value} onValueChange={(newValue) => updateStylesField(`animations.easing.${easing}`, newValue)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="linear">Linear</SelectItem>
                                  <SelectItem value="ease">Ease</SelectItem>
                                  <SelectItem value="ease-in">Ease In</SelectItem>
                                  <SelectItem value="ease-out">Ease Out</SelectItem>
                                  <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                                  <SelectItem value="cubic-bezier(0.4, 0, 0.2, 1)">Cubic Bezier (Default)</SelectItem>
                                  <SelectItem value="cubic-bezier(0.25, 0.46, 0.45, 0.94)">Ease Out Quad</SelectItem>
                                  <SelectItem value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">Ease Out Back</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Transitions */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">Transitions</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {Object.entries(stylesData.animations.transitions).map(([transition, value]) => (
                            <div key={transition} className="space-y-2">
                              <Label className="capitalize">{transition}</Label>
                              <Input
                                value={value}
                                onChange={(e) => updateStylesField(`animations.transitions.${transition}`, e.target.value)}
                                placeholder="e.g., 300ms ease-out"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                                          </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
