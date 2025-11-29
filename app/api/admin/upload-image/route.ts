import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type (only images)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // Check if file with same name already exists in public folder
    const publicDir = join(process.cwd(), 'public');
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    const existingFiles = await readdir(publicDir);
    if (existingFiles.includes(file.name)) {
      return NextResponse.json({ 
        error: `A file with the name "${file.name}" already exists. Please rename your file and try again.` 
      }, { status: 409 }); // 409 Conflict
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use original filename (no unique naming)
    const filename = file.name;
    
    // Write file to public directory
    const filePath = join(publicDir, filename);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      filename: filename,
      url: `/${filename}`,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
