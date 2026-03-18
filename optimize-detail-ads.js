const fs = require('fs');
const path = require('path');

const detailDir = 'detail';
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html') && !f.endsWith('_mobile.html'));

console.log(`Optimizing ${files.length} detail pages...`);

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 提取广告脚本
  const adScriptMatch = html.match(/<link rel="preconnect"[\s\S]*?googletag\.enableServices\(\);\s*}\);\s*<\/script>/);

  if (adScriptMatch) {
    const adScript = adScriptMatch[0];

    // 删除原位置的广告脚本
    html = html.replace(adScript, '');

    // 插入到 title 之后
    html = html.replace(
      /(<title>.*?<\/title>)/,
      `$1\n  ${adScript}`
    );

    fs.writeFileSync(filePath, html);
    console.log(`✓ ${file}`);
  }
});

console.log('\nDone! Ad scripts moved to top');
