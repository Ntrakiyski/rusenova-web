import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    
    // Validate the content structure (basic validation)
    if (!content || typeof content !== 'object') {
      return NextResponse.json({ error: 'Invalid content format' }, { status: 400 });
    }

    // Create backup of current content
    const filePath = path.join(process.cwd(), 'app/data/homeContent.json');
    const backupPath = path.join(process.cwd(), 'app/data/homeContent.backup.json');
    
    try {
      // Read current content for backup
      const currentContent = await readFile(filePath, 'utf8');
      await writeFile(backupPath, currentContent);
    } catch (backupError) {
      console.error('Failed to create backup:', backupError);
    }

    // Write new content to file
    const contentString = JSON.stringify(content, null, 2);
    await writeFile(filePath, contentString, 'utf8');

    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ 
      error: 'Failed to save content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
