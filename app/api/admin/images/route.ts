import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await walk(full);
      files.push(...sub);
    } else {
      files.push(full);
    }
  }
  return files;
}

export async function GET() {
  try {
    const all = await walk(PUBLIC_DIR);
    const files = all.map((f) => {
      const ext = path.extname(f);
      const rel = '/' + path.relative(PUBLIC_DIR, f).replace(/\\/g, '/');
      return { name: path.basename(f), path: rel, ext };
    });
    return NextResponse.json({ success: true, images: files });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to list images' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });

    const nameFromForm = (form.get('filename') as string) || file.name || 'upload';
    const safeBase = path.basename(nameFromForm).replace(/[^a-zA-Z0-9._-]/g, '-');
    const ext = path.extname(safeBase).toLowerCase() || '.bin';

    const baseNoExt = safeBase.slice(0, safeBase.length - ext.length);
    const finalName = `${baseNoExt}-${Date.now()}${ext}`;
    const dest = path.join(PUBLIC_DIR, finalName);

    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(dest, buf);
    const rel = '/' + path.relative(PUBLIC_DIR, dest).replace(/\\/g, '/');
    return NextResponse.json({ success: true, image: { name: finalName, path: rel, ext } });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const p = searchParams.get('path');
    if (!p) return NextResponse.json({ success: false, error: 'Missing path' }, { status: 400 });
    const rel = p.replace(/^\/+/, '');
    const dest = path.join(PUBLIC_DIR, rel);
    // Ensure within PUBLIC_DIR
    if (!dest.startsWith(PUBLIC_DIR)) return NextResponse.json({ success: false, error: 'Invalid path' }, { status: 400 });
    await fs.unlink(dest);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}
