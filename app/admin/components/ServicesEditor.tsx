'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface ServicesEditorProps {
  services: {
    title: string;
    items: string[];
  };
  onChange: (services: any) => void;
}

export default function ServicesEditor({ services, onChange }: ServicesEditorProps) {
  const handleTitleChange = (value: string) => {
    onChange({ ...services, title: value });
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...services.items];
    newItems[index] = value;
    onChange({ ...services, items: newItems });
  };

  const addItem = () => {
    onChange({ ...services, items: [...services.items, 'New Service'] });
  };

  const removeItem = (index: number) => {
    const newItems = services.items.filter((_, i) => i !== index);
    onChange({ ...services, items: newItems });
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...services.items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    onChange({ ...services, items: newItems });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={services.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="I can help with"
        />
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Services List</h4>
          <Button onClick={addItem} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Service
          </Button>
        </div>

        <div className="space-y-3">
          {services.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
              <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
              <Input
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder="Service name"
                className="flex-1"
              />
              <Button
                onClick={() => removeItem(index)}
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {services.items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No services added yet. Click "Add Service" to create your first service.</p>
          </div>
        )}
      </Card>

      
    </div>
  );
}
