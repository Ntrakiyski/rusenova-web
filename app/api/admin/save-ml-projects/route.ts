import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const projectsData = await request.json();
    
    // Generate TypeScript file content
    const fileContent = `import { Project } from '@/types/project';

export const mlProjects: Project[] = ${JSON.stringify(projectsData, null, 2)};

export default mlProjects;
`;

    // Write to the actual mlProjects.ts file
    const filePath = path.join(process.cwd(), 'app/data/mlProjects.ts');
    await writeFile(filePath, fileContent, 'utf-8');

    return NextResponse.json({ success: true, message: 'ML projects saved successfully' });
  } catch (error) {
    console.error('Error saving ML projects:', error);
    return NextResponse.json(
      { error: 'Failed to save ML projects' },
      { status: 500 }
    );
  }
}
