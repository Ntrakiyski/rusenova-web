'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Image {
  name: string;
  url: string;
  size: number;
  created: string;
  modified: string;
  type: string;
}

interface ImageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  placeholder?: string;
}

function ImageSelector({ 
  value, 
  onChange, 
  label = "Image Source", 
  id,
  placeholder = "Select or upload an image"
}: ImageSelectorProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Load images on component mount
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/list-images');
      const data = await response.json();
      if (response.ok) {
        setImages(data.images);
      }
    } catch (error) {
      console.error('Failed to load images:', error);
    } finally {
      setIsLoading(false);
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
        // Auto-select the newly uploaded image
        onChange(`/${data.filename}`);
      } else {
        setUploadMessage(`Error: ${data.error}`);
      }
    } catch {
      setUploadMessage('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  // Filter out non-image files and create options
  const imageOptions = images
    .filter(img => {
      const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
      const extension = img.type.toLowerCase();
      return imageTypes.includes(extension);
    })
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(img => ({
      value: `/${img.name}`,
      label: img.name,
      size: img.size,
      type: img.type
    }));

  return (
    <div className="space-y-3">
      <Label htmlFor={id}>{label}</Label>
      
      {/* Image selector dropdown */}
      <Select
        value={value}
        onValueChange={handleSelectChange}
        disabled={isLoading}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {imageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{option.label}</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  {Math.round(option.size / 1024)}KB
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Upload new image */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Upload New Image</Label>
        <div className="flex gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="flex-1"
          />
        </div>
        
        {isUploading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
            <span>Uploading...</span>
          </div>
        )}
        
        {uploadMessage && (
          <div className={`text-sm p-2 rounded-md ${
            uploadMessage.includes('Error') || uploadMessage.includes('failed')
              ? 'bg-destructive/10 text-destructive'
              : 'bg-green-50 text-green-700'
          }`}>
            {uploadMessage}
          </div>
        )}
      </div>

      {/* Image preview */}
      {value && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Preview</Label>
          <div className="border rounded-md p-2 bg-muted/30">
            <Image 
              src={value} 
              alt="Preview" 
              width={300}
              height={128}
              className="max-w-full h-32 object-contain mx-auto"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-xs text-center text-muted-foreground mt-1 break-all">
              {value}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ImageSelector };
export default ImageSelector;
