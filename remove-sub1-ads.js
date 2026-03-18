const fs = require('fs');
const path = require('path');

const detailDir = 'detail';
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html') && !f.endsWith('_mobile.html'));

console.log(`Processing ${files.length} files...`);

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 删除 sub1 的 defineSlot 行
  html = html.replace(/\s*googletag\.defineSlot\('\/23334333394\/sub1'[^\n]+\n/g, '');

  // 删除 sub1 广告容器（包含外层 ad-section）
  html = html.replace(/\n<div class="ad-section" style="text-align:center;padding:8px 0;">\s*<div id='div-gpt-ad-1773196483132-0'[^>]*>[\s\S]*?<\/div>\s*<\/div>/g, '');

  fs.writeFileSync(filePath, html);
  console.log(`✓ ${file}`);
});

console.log('\nDone! Removed sub1 ad from all detail pages');
