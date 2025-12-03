'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ImagePicker from './ImagePicker';
import { Plus, Trash2 } from 'lucide-react';

interface FeaturesEditorProps {
  features: {
    backgroundColor: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  onChange: (features: any) => void;
}

export default function FeaturesEditor({ features, onChange }: FeaturesEditorProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({ ...features, [field]: value });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...features.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...features, items: newItems });
  };

  const addItem = () => {
    const newItem = {
      title: 'New Feature',
      description: 'Feature description',
      icon: '/triangle.gif'
    };
    onChange({ ...features, items: [...features.items, newItem] });
  };

  const removeItem = (index: number) => {
    const newItems = features.items.filter((_, i) => i !== index);
    onChange({ ...features, items: newItems });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex gap-2">
          <Input
            id="backgroundColor"
            type="color"
            value={features.backgroundColor}
            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
            className="w-16 h-10 p-1 border rounded cursor-pointer"
          />
          <Input
            type="text"
            value={features.backgroundColor}
            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
            className="flex-1"
            placeholder="#000000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={features.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Building intelligence into your product"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Section Subtitle</Label>
        <Textarea
          id="subtitle"
          value={features.subtitle}
          onChange={(e) => handleInputChange('subtitle', e.target.value)}
          placeholder="ML systems that work technically and experiences that work for humans - because you need both."
          rows={3}
        />
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Feature Items</h4>
          <Button onClick={addItem} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Feature
          </Button>
        </div>

        <div className="space-y-4">
          {features.items.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Feature {index + 1}</h5>
                <Button
                  onClick={() => removeItem(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Feature Title</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    placeholder="AI chatbots"
                  />
                </div>

                <ImagePicker
                  label="Icon"
                  value={item.icon}
                  onChange={(val) => handleItemChange(index, 'icon', val)}
                />
              </div>

              <div className="space-y-2">
                <Label>Feature Description</Label>
                <Textarea
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="Issues which resolves themselves 24/7"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>

        {features.items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No features added yet. Click "Add Feature" to create your first feature.</p>
          </div>
        )}
      </Card>

      
    </div>
  );
}
