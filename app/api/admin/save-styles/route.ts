import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const stylesData = await request.json();
    
    // Update the lastUpdated timestamp
    const updatedStylesData = {
      ...stylesData,
      meta: {
        ...stylesData.meta,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    };

    // Write to the styles.json file
    const filePath = path.join(process.cwd(), 'app/data/styles.json');
    await writeFile(filePath, JSON.stringify(updatedStylesData, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Styles saved successfully' });
  } catch (error) {
    console.error('Error saving styles:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save styles' },
      { status: 500 }
    );
  }
}
