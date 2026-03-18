const fs = require('fs');
const path = require('path');

const detailDir = 'detail';
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html') && !f.endsWith('_mobile.html'));

console.log(`Updating ${files.length} detail pages...`);

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. 更新 head 中的广告脚本（添加预连接 + 更新为 sub1 多尺寸）
  html = html.replace(
    /<script async src="https:\/\/securepubads\.g\.doubleclick\.net\/tag\/js\/gpt\.js"[^>]*><\/script>\s*<script>\s*window\.googletag[\s\S]*?googletag\.enableServices\(\);\s*}\);\s*<\/script>/,
    `<link rel="preconnect" href="https://securepubads.g.doubleclick.net">
  <link rel="dns-prefetch" href="https://securepubads.g.doubleclick.net">
  <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossorigin="anonymous"></script>
  <script>
  window.googletag = window.googletag || {cmd: []};
  googletag.cmd.push(function() {
    googletag.defineSlot('/23334333394/sub1', [[300, 250], [200, 200], [320, 480], [336, 280], [240, 400], [250, 250], [480, 320]], 'div-gpt-ad-1773800728956-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
  </script>`
  );

  // 2. 更新广告容器
  html = html.replace(
    /<div id='div-gpt-ad-1773196177343-0'[^>]*>[\s\S]*?<\/div>\s*<\/div>/,
    `<div id='div-gpt-ad-1773800728956-0' style='min-width: 200px; min-height: 200px;'>
  <script>
    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1773800728956-0'); });
  </script>
</div>`
  );

  fs.writeFileSync(filePath, html);
  console.log(`✓ ${file}`);
});

console.log('\nDone! Updated all detail pages with new ad code');
