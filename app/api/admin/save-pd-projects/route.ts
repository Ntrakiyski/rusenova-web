import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const projectsData = await request.json();
    
    // Generate TypeScript file content
    const fileContent = `import { Project } from '@/types/project';

export const productDesignProjects: Project[] = ${JSON.stringify(projectsData, null, 2)};

export default productDesignProjects;
`;

    // Write to the actual productDesignProjects.ts file
    const filePath = path.join(process.cwd(), 'app/data/productDesignProjects.ts');
    await writeFile(filePath, fileContent, 'utf-8');

    return NextResponse.json({ success: true, message: 'PD projects saved successfully' });
  } catch (error) {
    console.error('Error saving PD projects:', error);
    return NextResponse.json(
      { error: 'Failed to save PD projects' },
      { status: 500 }
    );
  }
}
