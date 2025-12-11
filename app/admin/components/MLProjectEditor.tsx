'use client';

import { useEffect, useMemo, useState } from 'react';
import { Project, ProjectSection, Metric } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { CheckCircle2, AlertCircle, Save, RefreshCw, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ImagePicker from './ImagePicker';

interface MLProjectEditorProps {
  project: Project;
  onSave: (project: Project) => Promise<void>;
  onRefresh: () => void;
}

type SectionError = Record<number, string | null>;

export default function MLProjectEditor({ project, onSave, onRefresh }: MLProjectEditorProps) {
  const [editedProject, setEditedProject] = useState<Project>(project);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [sectionJson, setSectionJson] = useState<string[]>(project.sections.map((section) => JSON.stringify(section, null, 2)));
  const [sectionErrors, setSectionErrors] = useState<SectionError>({});
  const [showRawProject, setShowRawProject] = useState(false);
  const projectJson = useMemo(() => JSON.stringify(editedProject, null, 2), [editedProject]);

  useEffect(() => {
    setEditedProject(project);
    setSelectedSectionIndex(null);
    setSectionJson(project.sections.map((section) => JSON.stringify(section, null, 2)));
    setSectionErrors({});
  }, [project]);

  const syncSectionJson = (sections: ProjectSection[]) => {
    setSectionJson(sections.map((section) => JSON.stringify(section, null, 2)));
  };

  const updateSections = (updater: (sections: ProjectSection[]) => ProjectSection[]) => {
    setEditedProject((prev) => {
      const updatedSections = updater(prev.sections);
      syncSectionJson(updatedSections);
      return { ...prev, sections: updatedSections };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await onSave(editedProject);
      setMessage({ type: 'success', text: 'Project saved successfully!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save project'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleProjectFieldChange = (field: keyof Project, value: string | string[] | Metric[]) => {
    setEditedProject((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMetricChange = (index: number, field: keyof Metric, value: string) => {
    const metrics = editedProject.metrics ? [...editedProject.metrics] : [];
    metrics[index] = { ...metrics[index], [field]: value };
    handleProjectFieldChange('metrics', metrics);
  };

  const addMetric = () => {
    const metrics = editedProject.metrics ? [...editedProject.metrics] : [];
    metrics.push({ value: '', label: '', icon: '', iconBg: '' });
    handleProjectFieldChange('metrics', metrics);
  };

  const removeMetric = (index: number) => {
    if (!editedProject.metrics) return;
    const metrics = editedProject.metrics.filter((_, i) => i !== index);
    handleProjectFieldChange('metrics', metrics);
  };

  const updateGradientColors = (value: string) => {
    const colors = value
      .split(',')
      .map((color) => color.trim())
      .filter(Boolean);
    handleProjectFieldChange('gradientColors', colors);
  };

  const handleSectionBaseChange = (index: number, field: string, value: unknown) => {
    updateSections((sections) =>
      sections.map((section, idx) =>
        idx === index ? { ...section, [field]: value } : section
      )
    );
  };

  const handleStringListChange = (
    index: number,
    field: string,
    values: string[]
  ) => {
    updateSections((sections) =>
      sections.map((section, idx) =>
        idx === index ? { ...section, [field]: values } : section
      )
    );
  };

  const handleCardsChange = (
    index: number,
    field: 'cards',
    cards: Array<Record<string, unknown>>
  ) => {
    updateSections((sections) =>
      sections.map((section, idx) =>
        idx === index ? { ...section, [field]: cards } : section
      ) as ProjectSection[]
    );
  };

  const handleRawSectionChange = (index: number, value: string) => {
    setSectionJson((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    try {
      const parsed = JSON.parse(value) as ProjectSection;
      setSectionErrors((prev) => ({ ...prev, [index]: null }));
      updateSections((sections) =>
        sections.map((section, idx) => (idx === index ? parsed : section))
      );
    } catch (error) {
      setSectionErrors((prev) => ({
        ...prev,
        [index]: 'Invalid JSON. Please fix the syntax.'
      }));
    }
  };

  const addSection = () => {
    const newSection: ProjectSection = {
      type: 'intro',
      title: 'New Section',
      description: '',
      layout: 'text-left-image-right',
      content: []
    } as ProjectSection;
    const nextSections = [...editedProject.sections, newSection];
    setEditedProject((prev) => ({ ...prev, sections: nextSections }));
    syncSectionJson(nextSections);
    setSelectedSectionIndex(nextSections.length - 1);
  };

  const removeSection = (index: number) => {
    updateSections((sections) => sections.filter((_, idx) => idx !== index));
    setSelectedSectionIndex(null);
  };

  const renderStringList = (
    values: string[] = [],
    onChange: (next: string[]) => void,
    emptyLabel = 'Add item'
  ) => {
    const updateValue = (idx: number, value: string) => {
      const next = [...values];
      next[idx] = value;
      onChange(next);
    };

    const addValue = () => onChange([...(values || []), '']);
    const removeValue = (idx: number) => onChange(values.filter((_, i) => i !== idx));

    return (
      <div className="space-y-2">
        {(values || []).map((value, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Input value={value} onChange={(e) => updateValue(idx, e.target.value)} />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeValue(idx)} aria-label="Remove item">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addValue}>
          <Plus className="h-4 w-4 mr-2" />
          {emptyLabel}
        </Button>
      </div>
    );
  };

  const renderCardsEditor = (
    sectionIndex: number,
    cards: Array<{ title: string; description?: string; items?: string[]; icon?: string; bg?: string; }> = [],
    hasItems = false,
    hasIcon = true
  ) => {
    const updateCardField = (cardIndex: number, field: string, value: unknown) => {
      const nextCards = cards.map((card, idx) =>
        idx === cardIndex ? { ...card, [field]: value } : card
      ) as Array<{ title: string; description?: string; items?: string[]; icon?: string; bg?: string; }>;
      handleCardsChange(sectionIndex, 'cards', nextCards);
    };

    const addCard = () => {
      const nextCards = [
        ...cards,
        hasItems ? { title: '', items: [] as string[], icon: '', bg: '' } : { title: '', description: '', icon: '', bg: '' }
      ] as Array<{ title: string; description?: string; items?: string[]; icon?: string; bg?: string; }>;
      handleCardsChange(sectionIndex, 'cards', nextCards);
    };

    const removeCard = (cardIndex: number) => {
      const nextCards = cards.filter((_, idx) => idx !== cardIndex);
      handleCardsChange(sectionIndex, 'cards', nextCards);
    };

    return (
      <div className="space-y-4">
        {cards.map((card, cardIndex) => (
          <Card key={cardIndex} className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Card {cardIndex + 1}</CardTitle>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeCard(cardIndex)} aria-label="Remove card">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Title</Label>
                <Input
                  value={(card as { title?: string }).title ?? ''}
                  onChange={(e) => updateCardField(cardIndex, 'title', e.target.value)}
                />
              </div>

              {hasItems ? (
                <div>
                  <Label>Items</Label>
                  {renderStringList((card as { items?: string[] }).items || [], (next) => updateCardField(cardIndex, 'items', next), 'Add item')}
                </div>
              ) : (
                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={2}
                    value={(card as { description?: string }).description ?? ''}
                    onChange={(e) => updateCardField(cardIndex, 'description', e.target.value)}
                  />
                </div>
              )}

              {hasIcon && (
                <>
                  <div>
                    <Label>Icon</Label>
                    <Input
                      value={(card as { icon?: string }).icon ?? ''}
                      onChange={(e) => updateCardField(cardIndex, 'icon', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Background</Label>
                    <Input
                      value={(card as { bg?: string }).bg ?? ''}
                      onChange={(e) => updateCardField(cardIndex, 'bg', e.target.value)}
                      placeholder="bg-[#E0EAFF]"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
        <Button type="button" variant="outline" onClick={addCard}>
          <Plus className="h-4 w-4 mr-2" />
          Add card
        </Button>
      </div>
    );
  };

  const renderSectionFields = (section: ProjectSection, index: number) => {
    switch (section.type) {
      case 'intro':
        return (
          <div className="space-y-3">
            <div>
              <Label>Content</Label>
              {renderStringList(
                (section as { content?: string[] }).content as string[] || [],
                (next) => handleStringListChange(index, 'content', next),
                'Add content item'
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Row 1 Image</Label>
                <Input
                  value={(section as { row1Image?: string }).row1Image ?? ''}
                  onChange={(e) => handleSectionBaseChange(index, 'row1Image', e.target.value)}
                />
              </div>
              <div>
                <Label>Row 2 Image</Label>
                <Input
                  value={(section as { row2Image?: string }).row2Image ?? ''}
                  onChange={(e) => handleSectionBaseChange(index, 'row2Image', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 'approach':
      case 'section-with-cards':
        return renderCardsEditor(index, (section as { cards?: Array<{ title: string; description?: string; items?: string[]; icon?: string; bg?: string; }> }).cards || []);
      case 'section-with-cards-and-bullets':
        return renderCardsEditor(index, (section as { cards?: Array<{ title: string; description?: string; items?: string[]; icon?: string; bg?: string; }> }).cards || [], true);
      case 'section-with-table':
        return (
          <div className="space-y-3">
            <div>
              <Label>Columns</Label>
              {renderStringList(
                (section as { columns?: string[] }).columns || [],
                (next) => handleStringListChange(index, 'columns', next),
                'Add column'
              )}
            </div>
            <div>
              <Label>Rows (JSON Array)</Label>
              <Textarea
                rows={6}
                value={JSON.stringify((section as { rows?: Array<Record<string, string>> }).rows || [], null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    handleSectionBaseChange(index, 'rows' as keyof ProjectSection, parsed);
                    setSectionErrors((prev) => ({ ...prev, [index]: null }));
                  } catch (error) {
                    setSectionErrors((prev) => ({ ...prev, [index]: 'Invalid rows JSON' }));
                  }
                }}
              />
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Outcomes</Label>
              {renderStringList(
                (section as { outcomes?: string[] }).outcomes || [],
                (next) => handleStringListChange(index, 'outcomes', next),
                'Add outcome'
              )}
            </div>
            <div>
              <Label>Business Value</Label>
              {renderStringList(
                (section as { businessValue?: string[] }).businessValue || [],
                (next) => handleStringListChange(index, 'businessValue', next),
                'Add value'
              )}
            </div>
            <div>
              <Label>Video</Label>
              <Input
                value={(section as { video?: string }).video ?? ''}
                onChange={(e) => handleSectionBaseChange(index, 'video', e.target.value)}
              />
            </div>
          </div>
        );
      case 'what-i-build':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <Label>Bullet Points</Label>
              {renderStringList(
                (section as { bulletPoints?: string[] }).bulletPoints || [],
                (next) => handleStringListChange(index, 'bulletPoints', next),
                'Add bullet'
              )}
            </div>
            <div>
              <Label>Image</Label>
              <ImagePicker
                label=""
                value={(section as { image?: string }).image ?? ''}
                onChange={(val) => handleSectionBaseChange(index, 'image', val)}
              />
            </div>
          </div>
        );
      case 'smart-retrieval':
      case 'evaluation':
      case 'production':
      case 'tech-stack':
      case 'system-approach':
        return (
          <div className="space-y-3">
            <div>
              <Label>{section.type === 'tech-stack' ? 'Technologies / Items' : 'Items'}</Label>
              {renderStringList(
                (section as { items?: string[]; technologies?: string[] }).items || (section as { technologies?: string[] }).technologies || [],
                (next) => handleStringListChange(index, section.type === 'tech-stack' ? 'technologies' : 'items', next),
                'Add item'
              )}
            </div>
            {section.type === 'tech-stack' && (
              <div>
                <Label>Categories</Label>
                {renderStringList(
                  (section as { categories?: string[] }).categories || [],
                  (next) => handleStringListChange(index, 'categories', next),
                  'Add category'
                )}
              </div>
            )}
            {section.type === 'system-approach' && (
              <div>
                <Label>Cards</Label>
                {renderCardsEditor(index, (section as { cards?: Array<{ title: string; description?: string; items?: string[]; icon?: string; bg?: string; }> }).cards || [], false, false)}
              </div>
            )}
          </div>
        );
      case 'key-results-only':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Image</Label>
              <ImagePicker
                label=""
                value={(section as { image?: string }).image ?? ''}
                onChange={(val) => handleSectionBaseChange(index, 'image', val)}
              />
            </div>
            <div>
              <Label>Video</Label>
              <Input
                value={(section as { video?: string }).video ?? ''}
                onChange={(e) => handleSectionBaseChange(index, 'video', e.target.value)}
              />
            </div>
          </div>
        );
      case 'technical-performance':
        return (
          <div className="space-y-3">
            {((section as { metrics?: Array<Record<string, string>> }).metrics || []).map((metric, idx) => (
              <Card key={idx} className="border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">Metric {idx + 1}</CardTitle>
                  <Button type="button" variant="ghost" size="icon" onClick={() => {
                    const nextMetrics = ((section as { metrics?: Array<Record<string, string>> }).metrics || []).filter((_, mIdx) => mIdx !== idx);
                    handleSectionBaseChange(index, 'metrics', nextMetrics as unknown as string);
                  }} aria-label="Remove metric">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={(metric as { name?: string }).name ?? ''}
                      onChange={(e) => {
                        const nextMetrics = ((section as { metrics?: Array<Record<string, string>> }).metrics || []).map((m, mIdx) =>
                          mIdx === idx ? { ...m, name: e.target.value } : m
                        );
                        handleSectionBaseChange(index, 'metrics', nextMetrics as unknown as string);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input
                      value={(metric as { value?: string }).value ?? ''}
                      onChange={(e) => {
                        const nextMetrics = ((section as { metrics?: Array<Record<string, string>> }).metrics || []).map((m, mIdx) =>
                          mIdx === idx ? { ...m, value: e.target.value } : m
                        );
                        handleSectionBaseChange(index, 'metrics', nextMetrics as unknown as string);
                      }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={2}
                      value={(metric as { description?: string }).description ?? ''}
                      onChange={(e) => {
                        const nextMetrics = ((section as { metrics?: Array<Record<string, string>> }).metrics || []).map((m, mIdx) =>
                          mIdx === idx ? { ...m, description: e.target.value } : m
                        );
                        handleSectionBaseChange(index, 'metrics', nextMetrics as unknown as string);
                      }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Details</Label>
                    <Textarea
                      rows={2}
                      value={(metric as { details?: string }).details ?? ''}
                      onChange={(e) => {
                        const nextMetrics = ((section as { metrics?: Array<Record<string, string>> }).metrics || []).map((m, mIdx) =>
                          mIdx === idx ? { ...m, details: e.target.value } : m
                        );
                        handleSectionBaseChange(index, 'metrics', nextMetrics as unknown as string);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const nextMetrics = [
                  ...((section as { metrics?: Array<Record<string, string>> }).metrics || []),
                  { name: '', value: '', description: '' }
                ];
                handleSectionBaseChange(index, 'metrics', nextMetrics as unknown as string);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add metric
            </Button>
          </div>
        );
      case 'cost-benefit':
      case 'segment-analysis':
        return (
          <div className="space-y-3">
            {((section as { items?: Array<Record<string, unknown>> }).items || []).map((item, idx) => (
              <Card key={idx} className="border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">Item {idx + 1}</CardTitle>
                  <Button type="button" variant="ghost" size="icon" onClick={() => {
                    const nextItems = ((section as { items?: Array<Record<string, unknown>> }).items || []).filter((_, i) => i !== idx);
                    handleSectionBaseChange(index, 'items', nextItems as unknown as string);
                  }} aria-label="Remove item">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={(item as { title?: string }).title ?? ''}
                      onChange={(e) => {
                        const nextItems = ((section as { items?: Array<Record<string, unknown>> }).items || []).map((it, i) =>
                          i === idx ? { ...it, title: e.target.value } : it
                        );
                        handleSectionBaseChange(index, 'items', nextItems as unknown as string);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Content (one per line)</Label>
                    <Textarea
                      rows={3}
                      value={
                        Array.isArray((item as { content?: string | string[] }).content)
                          ? ((item as { content?: string[] }).content || []).join('\n')
                          : ((item as { content?: string }).content ?? '')
                      }
                      onChange={(e) => {
                        const value = e.target.value.includes('\n') ? e.target.value.split('\n').filter(Boolean) : e.target.value;
                        const nextItems = ((section as { items?: Array<Record<string, unknown>> }).items || []).map((it, i) =>
                          i === idx ? { ...it, content: value } : it
                        );
                        handleSectionBaseChange(index, 'items', nextItems as unknown as string);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={(item as { icon?: string }).icon ?? ''}
                        onChange={(e) => {
                          const nextItems = ((section as { items?: Array<Record<string, unknown>> }).items || []).map((it, i) =>
                            i === idx ? { ...it, icon: e.target.value } : it
                          );
                          handleSectionBaseChange(index, 'items', nextItems as unknown as string);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Icon Background</Label>
                      <Input
                        value={(item as { iconBg?: string }).iconBg ?? ''}
                        onChange={(e) => {
                          const nextItems = ((section as { items?: Array<Record<string, unknown>> }).items || []).map((it, i) =>
                            i === idx ? { ...it, iconBg: e.target.value } : it
                          );
                          handleSectionBaseChange(index, 'items', nextItems as unknown as string);
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const nextItems = [
                  ...((section as { items?: Array<Record<string, unknown>> }).items || []),
                  { title: '', content: '' }
                ];
                handleSectionBaseChange(index, 'items', nextItems as unknown as string);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add item
            </Button>
          </div>
        );
      case 'key-learning':
        return (
          <div className="space-y-3">
            <div>
              <Label>Image</Label>
              <ImagePicker
                label=""
                value={(section as { image?: string }).image ?? ''}
                onChange={(val) => handleSectionBaseChange(index, 'image', val)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={(section as { description?: string }).description ?? ''}
                onChange={(e) => handleSectionBaseChange(index, 'description', e.target.value)}
              />
            </div>
            <div>
              <Label>Learnings</Label>
              {(((section as { learnings?: Array<Record<string, string>> }).learnings) || []).map((learning, idx) => (
                <Card key={idx} className="border-gray-200 mb-2">
                  <CardContent className="space-y-2 pt-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={(learning as { title?: string }).title ?? ''}
                        onChange={(e) => {
                          const nextLearnings = ((section as { learnings?: Array<Record<string, string>> }).learnings || []).map((l, lIdx) =>
                            lIdx === idx ? { ...l, title: e.target.value } : l
                          );
                          handleSectionBaseChange(index, 'learnings', nextLearnings as unknown as string);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Bold Words</Label>
                      <Input
                        value={(learning as { boldWords?: string }).boldWords ?? ''}
                        onChange={(e) => {
                          const nextLearnings = ((section as { learnings?: Array<Record<string, string>> }).learnings || []).map((l, lIdx) =>
                            lIdx === idx ? { ...l, boldWords: e.target.value } : l
                          );
                          handleSectionBaseChange(index, 'learnings', nextLearnings as unknown as string);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const nextLearnings = [
                    ...((section as { learnings?: Array<Record<string, string>> }).learnings || []),
                    { title: '', boldWords: '' }
                  ];
                  handleSectionBaseChange(index, 'learnings', nextLearnings as unknown as string);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add learning
              </Button>
            </div>
          </div>
        );
      case 'production-deployment':
        return renderCardsEditor(index, (section as { cards?: Array<{ title: string; description?: string; items?: string[]; icon?: string; bg?: string; }> }).cards || [], true);
      default:
        return (
          <div>
            <Label>Content</Label>
            {renderStringList(
              (section as { content?: string[] }).content || [],
              (next) => handleStringListChange(index, 'content', next),
              'Add content'
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-1000">Edit Project</h2>
          <p className="text-sm text-gray-600">{editedProject.title}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onRefresh} disabled={saving}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-orange-600 hover:bg-orange-700">
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Project'}
          </Button>
        </div>
      </div>

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
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id">ID</Label>
                  <Input id="id" value={editedProject.id} onChange={(e) => handleProjectFieldChange('id', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" value={editedProject.slug} onChange={(e) => handleProjectFieldChange('slug', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={editedProject.title || ''} onChange={(e) => handleProjectFieldChange('title', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input id="heroTitle" value={editedProject.heroTitle || ''} onChange={(e) => handleProjectFieldChange('heroTitle', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    rows={2}
                    value={editedProject.shortDescription || ''}
                    onChange={(e) => handleProjectFieldChange('shortDescription', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={editedProject.description || ''}
                    onChange={(e) => handleProjectFieldChange('description', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Hero Image</Label>
                  <ImagePicker
                    label=""
                    value={editedProject.heroImage || ''}
                    onChange={(val) => handleProjectFieldChange('heroImage', val)}
                  />
                </div>
                <div>
                  <Label>Hero Video</Label>
                  <Input
                    value={editedProject.heroVideo || ''}
                    onChange={(e) => handleProjectFieldChange('heroVideo', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Gradient Colors (comma separated)</Label>
                  <Input
                    value={(editedProject.gradientColors || []).join(', ')}
                    onChange={(e) => updateGradientColors(e.target.value)}
                    placeholder="#F7F4ED, #252222"
                  />
                </div>
                <div>
                  <Label>Preview Image</Label>
                  <ImagePicker
                    label=""
                    value={editedProject.previewImage || ''}
                    onChange={(val) => handleProjectFieldChange('previewImage', val)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Metrics</Label>
                    <p className="text-xs text-gray-500">Value, label, icon, and background color.</p>
                  </div>
                  <Button type="button" variant="outline" onClick={addMetric}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add metric
                  </Button>
                </div>
                {(editedProject.metrics || []).length === 0 && (
                  <p className="text-sm text-gray-600">No metrics added yet.</p>
                )}
                <div className="grid grid-cols-1 gap-4">
                  {(editedProject.metrics || []).map((metric, index) => (
                    <Card key={index} className="border-gray-200">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">Metric {index + 1}</CardTitle>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeMetric(index)} aria-label="Remove metric">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label>Value</Label>
                          <Input value={metric.value} onChange={(e) => handleMetricChange(index, 'value', e.target.value)} />
                        </div>
                        <div>
                          <Label>Label</Label>
                          <Input value={metric.label} onChange={(e) => handleMetricChange(index, 'label', e.target.value)} />
                        </div>
                        <div>
                          <Label>Icon</Label>
                          <Input value={metric.icon || ''} onChange={(e) => handleMetricChange(index, 'icon', e.target.value)} />
                        </div>
                        <div>
                          <Label>Icon Background</Label>
                          <Input value={metric.iconBg || ''} onChange={(e) => handleMetricChange(index, 'iconBg', e.target.value)} placeholder="bg-[#E0EAFF]" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <Switch id="raw-json-toggle" checked={showRawProject} onCheckedChange={setShowRawProject} />
                <Label htmlFor="raw-json-toggle" className="text-sm text-gray-700">Show raw project JSON (advanced)</Label>
              </div>
              {showRawProject && (
                <Textarea value={projectJson} readOnly rows={12} className="font-mono text-xs" />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-white border-gray-200 shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Project Sections</CardTitle>
                <p className="text-sm text-gray-600">Edit each section and its content</p>
              </div>
              <Button type="button" variant="outline" onClick={addSection}>
                <Plus className="h-4 w-4 mr-2" />
                Add section
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {editedProject.sections.map((section, index) => (
                <div
                  key={`${section.type}-${index}`}
                  className={`border rounded-lg p-4 transition-colors ${selectedSectionIndex === index ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{section.type}</Badge>
                        <span className="text-xs text-gray-500">#{index + 1}</span>
                      </div>
                      <h4 className="font-medium text-gray-1000 text-sm">
                        {section.title || `Section ${index + 1}`}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{section.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedSectionIndex(selectedSectionIndex === index ? null : index)}
                        aria-label={selectedSectionIndex === index ? 'Collapse section' : 'Expand section'}
                      >
                        {selectedSectionIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSection(index)} aria-label="Remove section">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {selectedSectionIndex === index && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Type</Label>
                          <Input
                            value={section.type}
                            onChange={(e) => handleSectionBaseChange(index, 'type', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Layout</Label>
                          <select
                            value={(section.layout as string) || ''}
                            onChange={(e) => handleSectionBaseChange(index, 'layout', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">None</option>
                            <option value="text-left-image-right">Text Left, Image Right</option>
                            <option value="image-left-text-right">Image Left, Text Right</option>
                            <option value="text-only">Text Only</option>
                            <option value="centered">Centered</option>
                            <option value="text-left">Text Left</option>
                            <option value="text-right">Text Right</option>
                          </select>
                        </div>
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={section.title || ''}
                            onChange={(e) => handleSectionBaseChange(index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Image</Label>
                          <ImagePicker
                            label=""
                            value={section.image || ''}
                            onChange={(val) => handleSectionBaseChange(index, 'image', val)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            rows={2}
                            value={section.description || ''}
                            onChange={(e) => handleSectionBaseChange(index, 'description', e.target.value)}
                          />
                        </div>
                      </div>

                      <Separator />

                      {renderSectionFields(section, index)}

                      <Separator />

                      <div className="space-y-2">
                        <Label>Raw Section JSON (advanced)</Label>
                        <Textarea
                          value={sectionJson[index]}
                          onChange={(e) => handleRawSectionChange(index, e.target.value)}
                          rows={10}
                          className="font-mono text-xs"
                        />
                        {sectionErrors[index] && (
                          <p className="text-sm text-red-600">{sectionErrors[index]}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
