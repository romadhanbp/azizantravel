#!/usr/bin/env node
/**
 * Auto-sync script: ID → EN transport articles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TRANSPORT_ID = path.join(ROOT, 'src', 'content', 'transportasi');
const TRANSPORT_EN = path.join(ROOT, 'src', 'content', 'transportasi-en');

const TITLE_TRANSLATIONS = {
  'Sewa': 'Rent',
  'Kendaraan': 'Vehicle',
  'Avanza': 'Avanza',
  'Xenia': 'Xenia',
  'Innova': 'Innova',
  'Zenix': 'Zenix',
  'Driver': 'Driver',
  'Bandara': 'Airport',
  'Transfer': 'Transfer',
  'Lombok': 'Lombok',
  'Harian': 'Daily',
  '+': '+',
  'Dan': 'and',
};

function translateTitle(idTitle) {
  let enTitle = idTitle;
  for (const [id, en] of Object.entries(TITLE_TRANSLATIONS)) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    enTitle = enTitle.replace(new RegExp(escaped, 'gi'), en);
  }
  if (enTitle === idTitle) {
    return `[NEEDS TRANSLATION] ${idTitle}`;
  }
  return enTitle;
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
        if (typeof v2 === 'object' && v2 !== null) {
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
  console.log('🔄 Syncing ID → EN transport articles...\n');

  if (!fs.existsSync(TRANSPORT_EN)) {
    fs.mkdirSync(TRANSPORT_EN, { recursive: true });
  }

  if (!fs.existsSync(TRANSPORT_ID)) {
    console.log('⚠️  No ID transport directory found');
    return;
  }

  const idFiles = fs.readdirSync(TRANSPORT_ID).filter(f => f.endsWith('.md'));
  const enFiles = new Set(
    fs.readdirSync(TRANSPORT_EN).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''))
  );

  let created = 0;
  let skipped = 0;

  for (const file of idFiles) {
    const slug = file.replace('.md', '');
    const enSlug = `${slug}-en`;

    if (enFiles.has(enSlug)) {
      skipped++;
      continue;
    }

    const idContent = fs.readFileSync(path.join(TRANSPORT_ID, file), 'utf8');
    const { data: idData, body: idBody } = parseFrontmatter(idContent);

    const enData = {
      title: `[AUTO-SYNC] ${translateTitle(idData.title || slug)}`,
      slug: enSlug,
      image: idData.image || '',
      imageAlt: idData.imageAlt || idData.title || '',
      imageTitle: idData.imageTitle || '',
      badge: idData.badge || '',
      category: idData.category || '',
      capacity: idData.capacity || '',
      luggage: idData.luggage || '',
      price: idData.price || '',
      pricePer: idData.pricePer || '',
      includes: idData.includes || [],
      description: `[NEEDS TRANSLATION] ${idData.description || ''}`,
      published: false,
      order: idData.order || 99,
    };

    const enContent = buildFrontmatter(enData) + `\n<!-- AUTO-SYNCED from: ${slug} -->\n<!-- TODO: Translate this content to English -->\n\n${idBody}`;

    fs.writeFileSync(path.join(TRANSPORT_EN, `${enSlug}.md`), enContent, 'utf8');
    created++;
    console.log(`  ✅ Created: ${enSlug}.md (from ${file})`);
  }

  console.log(`\n📊 Results: ${created} created, ${skipped} skipped`);
}

main();
