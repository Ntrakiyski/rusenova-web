'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ImagePicker from './ImagePicker';
import { Plus, Trash2 } from 'lucide-react';

interface HeroEditorProps {
  hero: {
    backgroundColor: string;
    badge: string;
    title: string;
    subtitle: string;
    buttons: Array<{
      text: string;
      link: string;
      style: 'primary' | 'secondary';
    }>;
    image: {
      src: string;
      alt: string;
    };
  };
  onChange: (hero: any) => void;
}

export default function HeroEditor({ hero, onChange }: HeroEditorProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({ ...hero, [field]: value });
  };

  const handleButtonChange = (index: number, field: string, value: string) => {
    const newButtons = [...hero.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    onChange({ ...hero, buttons: newButtons });
  };

  const addButton = () => {
    const newButton = {
      text: 'New Button',
      link: '#',
      style: 'secondary' as const
    };
    onChange({ ...hero, buttons: [...hero.buttons, newButton] });
  };

  const removeButton = (index: number) => {
    const newButtons = hero.buttons.filter((_, i) => i !== index);
    onChange({ ...hero, buttons: newButtons });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Background Color</Label>
          <div className="flex gap-2">
            <Input
              id="backgroundColor"
              type="color"
              value={hero.backgroundColor}
              onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
              className="w-16 h-10 p-1 border rounded cursor-pointer"
            />
            <Input
              type="text"
              value={hero.backgroundColor}
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
            value={hero.badge}
            onChange={(e) => handleInputChange('badge', e.target.value)}
            placeholder="HUMAN & AI"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={hero.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Smart systems built for real people"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea
          id="subtitle"
          value={hero.subtitle}
          onChange={(e) => handleInputChange('subtitle', e.target.value)}
          placeholder="Hi, I'm Gloria and I bend Product Design & Machine Learning to create better systems for great user experience"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImagePicker
          label="Hero Image"
          value={hero.image.src}
          onChange={(val) => onChange({ ...hero, image: { ...hero.image, src: val } })}
        />

        <div className="space-y-2">
          <Label htmlFor="image-alt">Hero Image Alt Text</Label>
          <Input
            id="image-alt"
            value={hero.image.alt}
            onChange={(e) => onChange({
              ...hero,
              image: { ...hero.image, alt: e.target.value }
            })}
            placeholder="Description of the hero image"
          />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Call-to-Action Buttons</h4>
          <Button onClick={addButton} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Button
          </Button>
        </div>

        <div className="space-y-4">
          {hero.buttons.map((button, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Button {index + 1}</h5>
                <Button
                  onClick={() => removeButton(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={button.text}
                    onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
                    placeholder="Button text"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Button Link</Label>
                  <Input
                    value={button.link}
                    onChange={(e) => handleButtonChange(index, 'link', e.target.value)}
                    placeholder="https://... or mailto:..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Button Style</Label>
                  <select
                    value={button.style}
                    onChange={(e) => handleButtonChange(index, 'style', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hero.buttons.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No buttons added yet. Click "Add Button" to create your first CTA button.</p>
          </div>
        )}
      </Card>

      
    </div>
  );
}
