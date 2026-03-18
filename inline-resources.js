const fs = require('fs');
const path = require('path');

// 读取 CSS
const css = fs.readFileSync('detail/style.css', 'utf8');

// 处理游戏子页
const detailDir = 'detail';
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html') && !f.endsWith('_mobile.html'));

console.log(`Inlining CSS and JS for ${files.length} pages...`);

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. 替换外部 CSS 为内联
  html = html.replace(
    '<link href="style.css" rel="stylesheet"/>',
    `<style>${css}</style>`
  );

  // 2. 检查是否有外部 script.js
  if (html.includes('<script src="script.js"></script>')) {
    html = html.replace('<script src="script.js"></script>', '');
  }

  fs.writeFileSync(filePath, html);
  console.log(`✓ ${file}`);
});

console.log('\nDone! CSS and JS inlined');
