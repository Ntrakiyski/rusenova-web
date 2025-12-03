import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const HOME_CONTENT_PATH = path.join(process.cwd(), 'app', 'data', 'homeContent.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(HOME_CONTENT_PATH, 'utf-8');
    const homeContent = JSON.parse(fileContent);
    
    return NextResponse.json(homeContent);
  } catch (error) {
    console.error('Error reading home content:', error);
    return NextResponse.json(
      { error: 'Failed to read home content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const ColorsSchema = z.object({
      primary: z.string(),
      secondary: z.string(),
      background: z.string(),
      text: z.object({
        primary: z.string(),
        secondary: z.string(),
        accent: z.string(),
        muted: z.string(),
      }).strict(),
      border: z.string(),
    }).strict();

    const HeroSchema = z.object({
      backgroundColor: z.string(),
      badge: z.string(),
      title: z.string(),
      subtitle: z.string(),
      buttons: z.array(z.object({
        text: z.string(),
        link: z.string(),
        style: z.enum(['primary','secondary']),
      }).strict()),
      image: z.object({ src: z.string(), alt: z.string() }).strict(),
    }).strict();

    const ServicesSchema = z.object({
      title: z.string(),
      items: z.array(z.string()),
    }).strict();

    const FeaturesSchema = z.object({
      backgroundColor: z.string(),
      title: z.string(),
      subtitle: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      }).strict()),
    }).strict();

    const MetricSchema = z.object({ value: z.string(), label: z.string() }).strict();
    const MLPreviewSchema = z.object({
      title: z.string(),
      subtitle: z.string(),
      projects: z.array(z.object({
        title: z.string(),
        shortDescription: z.string(),
        metrics: z.array(MetricSchema),
        previewImage: z.string(),
        slug: z.string(),
      }).strict()),
    }).strict();

    const PDPreviewSchema = z.object({
      title: z.string(),
      subtitle: z.string(),
      projects: z.array(z.object({
        title: z.string(),
        role: z.string(),
        company: z.string(),
        shortDescription: z.string(),
        previewImage: z.string(),
        slug: z.string(),
        metrics: z.array(MetricSchema),
      }).strict()),
    }).strict();

    const AboutSchema = z.object({
      backgroundColor: z.string(),
      badge: z.string(),
      title: z.string(),
      paragraphs: z.array(z.string()),
      stats: z.array(z.object({ value: z.string(), label: z.string() }).strict()),
      image: z.object({ src: z.string(), alt: z.string() }).strict(),
    }).strict();

    const ContactSchema = z.object({
      title: z.string(),
      subtitle: z.string(),
      email: z.string(),
      linkedin: z.string(),
      opportunities: z.array(z.array(z.string())),
    }).strict();

    const FooterSchema = z.object({
      backgroundColor: z.string(),
      brand: z.object({ name: z.string(), description: z.string() }).strict(),
      social: z.array(z.object({ platform: z.string(), url: z.string(), ariaLabel: z.string() }).strict()),
      sections: z.array(z.object({
        title: z.string(),
        links: z.array(z.object({ label: z.string(), href: z.string() }).strict()),
      }).strict()),
      legal: z.object({
        copyright: z.string(),
        links: z.array(z.object({ label: z.string(), href: z.string() }).strict()),
      }).strict(),
    }).strict();

    const HomeContentSchema = z.object({
      meta: z.object({ version: z.string(), lastUpdated: z.string() }).partial().strict(),
      colors: ColorsSchema,
      hero: HeroSchema,
      services: ServicesSchema,
      features: FeaturesSchema,
      mlPreview: MLPreviewSchema,
      pdPreview: PDPreviewSchema,
      about: AboutSchema,
      contact: ContactSchema,
      footer: FooterSchema,
    }).strict();

    const parseResult = HomeContentSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid data structure', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    // Update metadata
    const updatedContent = {
      ...parseResult.data,
      meta: {
        version: '1.0.0',
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    };

    // Write to file
    await fs.writeFile(
      HOME_CONTENT_PATH,
      JSON.stringify(updatedContent, null, 2),
      'utf-8'
    );

    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Error saving home content:', error);
    return NextResponse.json(
      { error: 'Failed to save home content' },
      { status: 500 }
    );
  }
}
