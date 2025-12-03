import { initializeDatabase, setSetting, updateHomepageSection } from '../lib/db';
import homeContent from '../app/data/homeContent.json';

async function migrateHomepageData() {
  try {
    console.log('Starting homepage data migration to SQLite...');
    
    // Initialize database
    initializeDatabase();
    
    // Migrate colors to site_settings
    console.log('Migrating colors...');
    setSetting('color_primary', homeContent.colors.primary, 'color');
    setSetting('color_secondary', homeContent.colors.secondary, 'color');
    setSetting('color_background', homeContent.colors.background, 'color');
    setSetting('color_text_primary', homeContent.colors.text.primary, 'color');
    setSetting('color_text_secondary', homeContent.colors.text.secondary, 'color');
    setSetting('color_text_accent', homeContent.colors.text.accent, 'color');
    setSetting('color_text_muted', homeContent.colors.text.muted, 'color');
    setSetting('color_border', homeContent.colors.border, 'color');
    
    // Migrate hero section
    console.log('Migrating hero section...');
    updateHomepageSection('hero', JSON.stringify(homeContent.hero), homeContent.hero.backgroundColor);
    
    // Migrate services section
    console.log('Migrating services section...');
    updateHomepageSection('services', JSON.stringify(homeContent.services));
    
    // Migrate features section
    console.log('Migrating features section...');
    updateHomepageSection('features', JSON.stringify(homeContent.features));
    
    // Migrate about section
    console.log('Migrating about section...');
    updateHomepageSection('about', JSON.stringify(homeContent.about));
    
    // Migrate contact section
    console.log('Migrating contact section...');
    updateHomepageSection('contact', JSON.stringify(homeContent.contact));
    
    // Migrate ML preview settings
    console.log('Migrating ML preview settings...');
    setSetting('ml_preview_title', homeContent.mlPreview.title, 'string');
    setSetting('ml_preview_subtitle', homeContent.mlPreview.subtitle, 'string');
    
    // Migrate PD preview settings
    console.log('Migrating PD preview settings...');
    setSetting('pd_preview_title', homeContent.pdPreview.title, 'string');
    setSetting('pd_preview_subtitle', homeContent.pdPreview.subtitle, 'string');
    
    console.log('Homepage data migration completed successfully!');
    
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateHomepageData();
}

export default migrateHomepageData;