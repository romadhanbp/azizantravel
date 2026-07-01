#!/usr/bin/env node
/**
 * Auto-sync script: ID → EN blog articles
 * 
 * Reads all ID blog articles, checks if EN version exists.
 * If not, creates EN version with:
 * - Translated title (marked [NEEDS TRANSLATION])
 * - Same slug + "-en" suffix
 * - Same image, category, date, tags
 * - Body preserved with translation marker
 * 
 * Usage: node scripts/sync-blog-en.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_ID = path.join(ROOT, 'src', 'content', 'blog');
const BLOG_EN = path.join(ROOT, 'src', 'content', 'blog-en');

// Simple translation map for common words
const TITLE_TRANSLATIONS = {
  'Panduan': 'Guide',
  'Tips': 'Tips',
  'Wisata': 'Tourism',
  'Lombok': 'Lombok',
  'Terbaik': 'Best',
  'Destinasi': 'Destinations',
  'Kuliner': 'Culinary',
  'Khas': 'Traditional',
  'Wajib': 'Must',
  'Dicoba': 'Try',
  'Hemat': 'Budget',
  'Trekking': 'Trekking',
  'Gunung': 'Mountain',
  'Pemula': 'Beginners',
  'Pink Beach': 'Pink Beach',
  'Keajaiban': 'Wonder',
  'Alam': 'Nature',
  'Gili Islands': 'Gili Islands',
  'Surga': 'Paradise',
  'Tersembunyi': 'Hidden',
  '2025': '2025',
  '3D2N': '3D2N',
};

// Slug translation map (ID → EN slug)
const SLUG_TRANSLATIONS = {
  'panduan': 'guide',
  'tips': 'tips',
  'wisata': 'tourism',
  'lombok': 'lombok',
  'terbaik': 'best',
  'destinasi': 'destinations',
  'kuliner': 'culinary',
  'khas': 'traditional',
  'wajib': 'must-try',
  'dicoba': 'try',
  'hemat': 'budget',
  'trekking': 'trekking',
  'gunung': 'mountain',
  'pemula': 'beginners',
  'pink-beach': 'pink-beach',
  'keajaiban': 'wonder',
  'alam': 'nature',
  'gili-islands': 'gili-islands',
  'surga': 'paradise',
  'tersembunyi': 'hidden',
  '3d2n': '3d2n',
};

const CATEGORY_TRANSLATIONS = {
  'Wisata': 'Tourism',
  'Tips': 'Tips',
  'Panduan': 'Guide',
  'Kuliner': 'Culinary',
  'Petualangan': 'Adventure',
  'Bisnis': 'Business',
};

function translateTitle(idTitle) {
  let enTitle = idTitle;
  
  // Try exact match first
  for (const [id, en] of Object.entries(TITLE_TRANSLATIONS)) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    enTitle = enTitle.replace(new RegExp(escaped, 'gi'), en);
  }
  
  // If title didn't change much, wrap with translation marker
  if (enTitle === idTitle) {
    return `[NEEDS TRANSLATION] ${idTitle}`;
  }
  
  return enTitle;
}

function translateCategory(idCategory) {
  return CATEGORY_TRANSLATIONS[idCategory] || idCategory;
}

function translateSlug(idSlug) {
  const parts = idSlug.split('-');
  const translated = parts.map(part => SLUG_TRANSLATIONS[part] || part);
  return translated.join('-');
}

function translateTags(idTags) {
  return idTags.map(tag => {
    const translated = CATEGORY_TRANSLATIONS[tag];
    return translated || tag;
  });
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let inArray = false;
  let arrayItems = [];
  
  for (const line of lines) {
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      if (currentKey && inArray) {
        frontmatter[currentKey] = arrayItems;
        arrayItems = [];
        inArray = false;
      }
      currentKey = kvMatch[1];
      const value = kvMatch[2].trim();
      if (value === '') {
        inArray = true;
        arrayItems = [];
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array
        frontmatter[currentKey] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      } else if (value === 'true') {
        frontmatter[currentKey] = true;
      } else if (value === 'false') {
        frontmatter[currentKey] = false;
      } else if (!isNaN(value)) {
        frontmatter[currentKey] = Number(value);
      } else {
        frontmatter[currentKey] = value.replace(/^["']|["']$/g, '');
      }
    } else if (inArray && line.trim().startsWith('-')) {
      const item = line.trim().replace(/^-\s*/, '').replace(/^["']|["']$/g, '');
      arrayItems.push(item);
    }
  }
  
  if (currentKey && inArray) {
    frontmatter[currentKey] = arrayItems;
  }
  
  return { data: frontmatter, body: match[2] };
}

function buildFrontmatter(data) {
  let output = '---\n';
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      output += `${key}:\n`;
      for (const item of value) {
        output += `  - ${item.includes(' ') ? `"${item}"` : item}\n`;
      }
    } else if (typeof value === 'boolean') {
      output += `${key}: ${value}\n`;
    } else if (typeof value === 'number') {
      output += `${key}: ${value}\n`;
    } else if (value && typeof value === 'object') {
      output += `${key}:\n`;
      for (const [k2, v2] of Object.entries(value)) {
        if (Array.isArray(v2)) {
          output += `  ${k2}:\n`;
          for (const item of v2) {
            output += `    - keyword: ${item}\n`;
          }
        } else if (typeof v2 === 'object' && v2 !== null) {
          output += `  ${k2}:\n`;
          for (const [k3, v3] of Object.entries(v2)) {
            output += `    ${k3}: ${v3 || ''}\n`;
          }
        } else {
          output += `  ${k2}: ${v2 || ''}\n`;
        }
      }
    } else {
      output += `${key}: "${value || ''}"\n`;
    }
  }
  output += '---\n';
  return output;
}

function main() {
  console.log('🔄 Syncing ID → EN blog articles...\n');

  // Ensure EN directory exists
  if (!fs.existsSync(BLOG_EN)) {
    fs.mkdirSync(BLOG_EN, { recursive: true });
  }

  // Read ID articles
  if (!fs.existsSync(BLOG_ID)) {
    console.log('⚠️  No ID blog directory found');
    return;
  }

  const idFiles = fs.readdirSync(BLOG_ID).filter(f => f.endsWith('.md'));
  const enFiles = new Set(
    fs.readdirSync(BLOG_EN).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''))
  );

  let created = 0;
  let skipped = 0;

  for (const file of idFiles) {
    const slug = file.replace('.md', '');
    const enSlug = translateSlug(slug);

    // Skip if EN version already exists (check both translated and original slug)
    if (enFiles.has(enSlug) || enFiles.has(`${slug}-en`)) {
      skipped++;
      continue;
    }

    // Read ID article
    const idContent = fs.readFileSync(path.join(BLOG_ID, file), 'utf8');
    const { data: idData, body: idBody } = parseFrontmatter(idContent);

    // Build EN article
    const enData = {
      title: `[AUTO-SYNC] ${translateTitle(idData.title || slug)}`,
      slug: enSlug,
      category: translateCategory(idData.category || 'Tourism'),
      date: idData.date || new Date().toISOString().split('T')[0],
      image: idData.image || '',
      imageAlt: idData.imageAlt || idData.title || '',
      imageTitle: idData.imageTitle || '',
      imageCaption: idData.imageCaption || '',
      excerpt: `[NEEDS TRANSLATION] ${idData.excerpt || ''}`,
      tags: translateTags(idData.tags || []),
      published: false,
      featured: idData.featured || false,
    };

    const enContent = buildFrontmatter(enData) + `\n<!-- AUTO-SYNCED from: ${slug} -->\n<!-- TODO: Translate this content to English -->\n\n${idBody}`;

    fs.writeFileSync(path.join(BLOG_EN, `${enSlug}.md`), enContent, 'utf8');
    created++;
    console.log(`  ✅ Created: ${enSlug}.md (from ${file})`);
  }

  console.log(`\n📊 Results: ${created} created, ${skipped} skipped (already exist)`);
  
  if (created > 0) {
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Open admin dashboard → Blog (EN)`);
    console.log(`   2. Find articles marked [AUTO-SYNC] and [NEEDS TRANSLATION]`);
    console.log(`   3. Translate the title, excerpt, and body`);
    console.log(`   4. Set published: true when ready`);
  }
}

main();
