const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. 替换 amp-ad 为 GPT 广告容器
html = html.replace(
  /<amp-ad width="300" height="250" type="doubleclick" data-slot="\/23334333394\/sub"><\/amp-ad>/,
  `<div id='div-gpt-ad-home-01' style='min-width: 200px; min-height: 10px;'>
  <script>
    googletag.cmd.push(function() { googletag.display('div-gpt-ad-home-01'); });
  </script>
</div>`
);

// 2. 替换所有 amp-img 为普通 img
html = html.replace(/<amp-img src="([^"]+)" width="(\d+)" height="(\d+)" layout="fixed"><\/amp-img>/g,
  '<img src="$1" width="$2" height="$3" alt="">');

fs.writeFileSync('index.html', html);
console.log('✓ Step 2: Replaced amp-ad and amp-img');
