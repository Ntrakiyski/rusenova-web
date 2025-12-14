'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ImagePicker from './ImagePicker';
import { Plus, Trash2 } from 'lucide-react';

interface AboutEditorProps {
  about: {
    backgroundColor: string;
    badge: string;
    title: string;
    paragraphs: string[];
    stats: Array<{
      value: string;
      label: string;
    }>;
    image: {
      src: string;
      alt: string;
    };
  };
  onChange: (about: any) => void;
}

export default function AboutEditor({ about, onChange }: AboutEditorProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({ ...about, [field]: value });
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...about.paragraphs];
    newParagraphs[index] = value;
    onChange({ ...about, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    onChange({ ...about, paragraphs: [...about.paragraphs, 'New paragraph'] });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = about.paragraphs.filter((_, i) => i !== index);
    onChange({ ...about, paragraphs: newParagraphs });
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...about.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...about, stats: newStats });
  };

  const addStat = () => {
    const newStat = { value: '0', label: 'New Stat' };
    onChange({ ...about, stats: [...about.stats, newStat] });
  };

  const removeStat = (index: number) => {
    const newStats = about.stats.filter((_, i) => i !== index);
    onChange({ ...about, stats: newStats });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex gap-2">
          <Input
            id="backgroundColor"
            type="color"
            value={about.backgroundColor}
            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
            className="w-16 h-10 p-1 border rounded cursor-pointer"
          />
          <Input
            type="text"
            value={about.backgroundColor}
            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
            className="flex-1"
            placeholder="#000000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="badge">Badge Text</Label>
        <Input
          id="badge"
          value={about.badge}
          onChange={(e) => handleInputChange('badge', e.target.value)}
          placeholder="ONE PERSON TEAM"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={about.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="A Quick Hello"
        />
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">About Paragraphs</h4>
          <Button onClick={addParagraph} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Paragraph
          </Button>
        </div>

        <div className="space-y-3">
          {about.paragraphs.map((paragraph, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Paragraph {index + 1}</Label>
                <Button
                  onClick={() => removeParagraph(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                placeholder="About paragraph content"
                rows={3}
              />
            </div>
          ))}
        </div>

        {about.paragraphs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No paragraphs added yet. Click "Add Paragraph" to create your first paragraph.</p>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Stats</h4>
          <Button onClick={addStat} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Stat
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {about.stats.map((stat, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Stat {index + 1}</h5>
                <Button
                  onClick={() => removeStat(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                  placeholder="9+"
                />
                <Input
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  placeholder="Years of Experience"
                />
              </div>
            </div>
          ))}
        </div>

        {about.stats.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No stats added yet. Click "Add Stat" to create your first stat.</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ImagePicker
            label="About Image"
            value={about.image.src}
            onChange={(val) => onChange({ ...about, image: { ...about.image, src: val } })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-alt">About Image Alt Text</Label>
          <Input
            id="image-alt"
            value={about.image.alt}
            onChange={(e) => onChange({
              ...about,
              image: { ...about.image, alt: e.target.value }
            })}
            placeholder="Gloria"
          />
        </div>
      </div>

      
    </div>
  );
}
