const fs = require('fs');
const path = require('path');

const detailDir = 'detail';
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('_mobile.html'));

console.log(`Processing ${files.length} mobile pages...`);

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 删除所有广告代码
  html = html.replace(/<link rel="preconnect"[^>]*securepubads[^>]*>\s*/g, '');
  html = html.replace(/<link rel="dns-prefetch"[^>]*securepubads[^>]*>\s*/g, '');
  html = html.replace(/<script[^>]*src="https:\/\/securepubads[^>]*gpt\.js"[^>]*><\/script>\s*/g, '');
  html = html.replace(/<script>\s*window\.googletag[\s\S]*?googletag\.enableServices\(\);[\s\S]*?<\/script>\s*/g, '');

  // 在 title 后插入广告代码
  html = html.replace(
    /(<title>.*?<\/title>)/,
    `$1
  <link rel="preconnect" href="https://securepubads.g.doubleclick.net">
  <link rel="dns-prefetch" href="https://securepubads.g.doubleclick.net">
  <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossorigin="anonymous"></script>
  <script>
  window.googletag = window.googletag || {cmd: []};
  googletag.cmd.push(function() {
    googletag.defineSlot('/23334333394/sub1', [[300, 250], [200, 200], [320, 480], [336, 280], [240, 400], [250, 250], [480, 320]], 'div-gpt-ad-1773800728956-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
  </script>`
  );

  fs.writeFileSync(filePath, html);
  console.log(`✓ ${file}`);
});

console.log('\nDone!');
