const fs = require('fs');
const path = require('path');

// 1. 处理游戏子页：删除第二个广告位（sub1）
const detailDir = 'detail';
const detailFiles = fs.readdirSync(detailDir).filter(f => f.endsWith('.html') && !f.endsWith('_mobile.html'));

console.log(`Processing ${detailFiles.length} detail pages...`);

detailFiles.forEach(file => {
  const filePath = path.join(detailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 删除 sub1 的 defineSlot
  html = html.replace(/\s*googletag\.defineSlot\('\/23334333394\/sub1'[^;]+;/, '');

  // 删除 sub1 的广告容器
  html = html.replace(/<div class="ad-section"[^>]*>\s*<div id='div-gpt-ad-1773196483132-0'[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

  fs.writeFileSync(filePath, html);
  console.log(`✓ ${file}`);
});

console.log('\nDetail pages: removed sub1 ad slot');
