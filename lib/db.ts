import Database from 'better-sqlite3';
import path from 'path';
import { existsSync } from 'fs';

const dbPath = process.env.NODE_ENV === 'development' 
  ? './portfolio.db' 
  : path.join(process.cwd(), 'portfolio.db');

export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initializeDatabase() {
  // Core homepage content tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      type TEXT DEFAULT 'string',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS homepage_sections (
      id INTEGER PRIMARY KEY,
      section_type TEXT NOT NULL,
      content_json TEXT NOT NULL,
      background_color TEXT,
      order_index INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      short_description TEXT,
      preview_image TEXT,
      gradient_colors TEXT,
      is_featured BOOLEAN DEFAULT FALSE,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS project_metrics (
      id INTEGER PRIMARY KEY,
      project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
      value TEXT NOT NULL,
      label TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS work_experience (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      short_description TEXT,
      preview_image TEXT,
      gradient_colors TEXT,
      slug TEXT UNIQUE NOT NULL,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS footer_sections (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      section_type TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE
    );

    CREATE TABLE IF NOT EXISTS footer_links (
      id INTEGER PRIMARY KEY,
      section_id INTEGER REFERENCES footer_sections(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      href TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY,
      platform TEXT NOT NULL,
      url TEXT NOT NULL,
      aria_label TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );
  `);

  console.log('Database schema initialized successfully');
}

// Utility functions for database operations
export function getSetting(key: string, defaultValue: string = ''): string {
  const stmt = db.prepare('SELECT value FROM site_settings WHERE key = ?');
  const result = stmt.get(key) as { value: string } | undefined;
  return result?.value || defaultValue;
}

export function setSetting(key: string, value: string, type: string = 'string'): void {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO site_settings (key, value, type, updated_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
  `);
  stmt.run(key, value, type);
}

export function getHomepageSection(sectionType: string): any {
  const stmt = db.prepare('SELECT * FROM homepage_sections WHERE section_type = ? AND is_active = TRUE');
  return stmt.get(sectionType);
}

export function updateHomepageSection(sectionType: string, contentJson: string, backgroundColor?: string): void {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO homepage_sections (section_type, content_json, background_color, updated_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
  `);
  stmt.run(sectionType, contentJson, backgroundColor);
}

export function getAllProjects(category?: string): any[] {
  let stmt;
  if (category) {
    stmt = db.prepare('SELECT * FROM projects WHERE category = ? ORDER BY order_index, id');
    return stmt.all(category) as any[];
  } else {
    stmt = db.prepare('SELECT * FROM projects ORDER BY order_index, id');
    return stmt.all() as any[];
  }
}

export function getProjectBySlug(slug: string): any {
  const stmt = db.prepare('SELECT * FROM projects WHERE slug = ?');
  return stmt.get(slug);
}

export function getProjectMetrics(projectId: number): any[] {
  const stmt = db.prepare('SELECT * FROM project_metrics WHERE project_id = ? ORDER BY order_index');
  return stmt.all(projectId) as any[];
}

export function getAllWorkExperience(): any[] {
  const stmt = db.prepare('SELECT * FROM work_experience ORDER BY order_index, id');
  return stmt.all() as any[];
}

export function getWorkExperienceBySlug(slug: string): any {
  const stmt = db.prepare('SELECT * FROM work_experience WHERE slug = ?');
  return stmt.get(slug);
}

// Close database connection
export function closeDatabase(): void {
  db.close();
}