#!/usr/bin/env node
/**
 * Master sync script: ID → EN for all collections
 * 
 * Usage: node scripts/sync-all.js
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const scripts = [
  { name: 'Blog', script: 'sync-blog-en.js' },
  { name: 'Transport', script: 'sync-transport-en.js' },
  { name: 'Packages', script: 'sync-packages-en.js' },
];

console.log('═══════════════════════════════════════');
console.log('  🔄 Auto-Sync ID → EN');
console.log('═══════════════════════════════════════\n');

let totalCreated = 0;
let totalSkipped = 0;

for (const { name, script } of scripts) {
  console.log(`\n--- ${name} ---`);
  try {
    execSync(`node ${path.join(__dirname, script)}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`  ❌ Error syncing ${name}`);
  }
}

console.log('\n═══════════════════════════════════════');
console.log('  ✅ Sync complete!');
console.log('═══════════════════════════════════════');
console.log('\nNext: Open admin → Blog (EN) → Translate articles marked [AUTO-SYNC]');
console.log('      Then set published: true when ready\n');
