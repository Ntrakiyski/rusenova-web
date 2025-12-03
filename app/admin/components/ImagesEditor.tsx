'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X } from 'lucide-react';

export default function ImagesEditor() {
  const [images, setImages] = useState<{ name: string; path: string; ext: string }[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const res = await fetch('/api/admin/images');
    const data = await res.json();
    if (data.success) setImages(data.images);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    for (const f of files) {
      const fd = new FormData();
      fd.append('file', f);
      fd.append('filename', f.name);
      await fetch('/api/admin/images', { method: 'POST', body: fd });
    }
    setUploading(false);
    await load();
  };

  const handleDelete = async (path: string) => {
    const res = await fetch(`/api/admin/images?path=${encodeURIComponent(path.replace(/^\//,''))}`, { method: 'DELETE' });
    if (res.ok) await load();
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          <Button onClick={handleUpload} disabled={!files.length || uploading}>{uploading ? 'Uploading...' : 'Upload'}</Button>
        </div>
      </Card>
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Path</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.map((img) => (
              <TableRow key={img.path}>
                <TableCell>{img.name}</TableCell>
                <TableCell>{img.ext.replace('.', '').toUpperCase()}</TableCell>
                <TableCell>
                  {/^\.(png|jpg|jpeg|gif|webp|svg)$/i.test(img.ext) ? (
                    <img src={img.path} alt="" className="h-12 w-auto object-contain" />
                  ) : (
                    <span className="text-xs text-gray-500">No preview</span>
                  )}
                </TableCell>
                <TableCell className="text-xs text-gray-600">{img.path}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(img.path)}>
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
