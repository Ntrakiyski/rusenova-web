'use client';

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ImagePicker({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
  const [images, setImages] = useState<{ name: string; path: string; ext: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/images');
        const data = await res.json();
        if (data.success) setImages(data.images);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value || ''} onValueChange={(v) => onChange(v)}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder={loading ? 'Loading...' : 'Select image'} />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-900">
          {images.map((img) => (
            <SelectItem key={img.path} value={img.path}>{img.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value ? (
        <div className="mt-2 border rounded-lg p-2 bg-white">
          <img src={value} alt="preview" className="max-h-40 object-contain w-full" />
          <div className="text-xs text-gray-500 mt-1">{value}</div>
        </div>
      ) : null}
    </div>
  );
}
