'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface ColorsEditorProps {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: {
      primary: string;
      secondary: string;
      accent: string;
      muted: string;
    };
    border: string;
  };
  onChange: (colors: any) => void;
}

export default function ColorsEditor({ colors, onChange }: ColorsEditorProps) {
  const handleColorChange = (path: string, value: string) => {
    const newColors = { ...colors };
    
    if (path === 'primary') {
      newColors.primary = value;
    } else if (path === 'secondary') {
      newColors.secondary = value;
    } else if (path === 'background') {
      newColors.background = value;
    } else if (path === 'border') {
      newColors.border = value;
    } else if (path === 'text.primary') {
      newColors.text.primary = value;
    } else if (path === 'text.secondary') {
      newColors.text.secondary = value;
    } else if (path === 'text.accent') {
      newColors.text.accent = value;
    } else if (path === 'text.muted') {
      newColors.text.muted = value;
    }
    
    onChange(newColors);
  };

  const ColorInput = ({ label, value, path }: { label: string; value: string; path: string }) => (
    <div className="space-y-2">
      <Label htmlFor={path}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={path}
          type="color"
          value={value}
          onChange={(e) => handleColorChange(path, e.target.value)}
          className="w-16 h-10 p-1 border rounded cursor-pointer"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => handleColorChange(path, e.target.value)}
          className="flex-1"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ColorInput
          label="Primary Color"
          value={colors.primary}
          path="primary"
        />
        <ColorInput
          label="Secondary Color"
          value={colors.secondary}
          path="secondary"
        />
        <ColorInput
          label="Background Color"
          value={colors.background}
          path="background"
        />
        <ColorInput
          label="Border Color"
          value={colors.border}
          path="border"
        />
      </div>

      <Card className="p-4">
        <h4 className="font-medium mb-4">Text Colors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorInput
            label="Primary Text"
            value={colors.text.primary}
            path="text.primary"
          />
          <ColorInput
            label="Secondary Text"
            value={colors.text.secondary}
            path="text.secondary"
          />
          <ColorInput
            label="Accent Text"
            value={colors.text.accent}
            path="text.accent"
          />
          <ColorInput
            label="Muted Text"
            value={colors.text.muted}
            path="text.muted"
          />
        </div>
      </Card>

      <Card className="p-4">
        <h4 className="font-medium mb-4">Color Preview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div 
              className="w-full h-16 rounded border-2 border-gray-200 mb-2"
              style={{ backgroundColor: colors.primary }}
            />
            <p className="text-sm font-medium">Primary</p>
          </div>
          <div className="text-center">
            <div 
              className="w-full h-16 rounded border-2 border-gray-200 mb-2"
              style={{ backgroundColor: colors.secondary }}
            />
            <p className="text-sm font-medium">Secondary</p>
          </div>
          <div className="text-center">
            <div 
              className="w-full h-16 rounded border-2 border-gray-200 mb-2"
              style={{ backgroundColor: colors.background }}
            />
            <p className="text-sm font-medium">Background</p>
          </div>
          <div className="text-center">
            <div 
              className="w-full h-16 rounded border-2 border-gray-200 mb-2"
              style={{ backgroundColor: colors.text.accent }}
            />
            <p className="text-sm font-medium">Accent</p>
          </div>
        </div>
      </Card>
    </div>
  );
}