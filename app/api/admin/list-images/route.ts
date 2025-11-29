import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    const publicDir = join(process.cwd(), 'public');
    
    if (!existsSync(publicDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = await readdir(publicDir);
    
    // Filter for image files and get their stats
    const imageFiles = [];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    for (const file of files) {
      const extension = file.toLowerCase().substring(file.lastIndexOf('.'));
      if (imageExtensions.includes(extension)) {
        const filePath = join(publicDir, file);
        const stats = await stat(filePath);
        
        imageFiles.push({
          name: file,
          url: `/${file}`,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
          type: extension.slice(1) // Remove the dot
        });
      }
    }

    // Sort by modified date (newest first)
    imageFiles.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());

    return NextResponse.json({ images: imageFiles });

  } catch (error) {
    console.error('List images error:', error);
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}
