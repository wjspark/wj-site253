const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. 移除 AMP 标记
html = html.replace(/<html ⚡ lang="en">/, '<html lang="en">');

// 2. 删除 AMP 脚本
html = html.replace(/\s*<script async src="https:\/\/cdn\.ampproject\.org\/v0\.js"><\/script>/, '');
html = html.replace(/\s*<script async custom-element="amp-img"[^>]*><\/script>/, '');
html = html.replace(/\s*<script async custom-element="amp-ad"[^>]*><\/script>/, '');
html = html.replace(/\s*<style amp-boilerplate>[\s\S]*?<\/noscript>/, '');

// 3. 添加 GPT 脚本
const gptScripts = `
  <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossorigin="anonymous"></script>
  <script>
  window.googletag = window.googletag || {cmd: []};
  googletag.cmd.push(function() {
    googletag.defineSlot('/23334333394/sub', [300, 250], 'div-gpt-ad-home-01').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
  </script>`;

html = html.replace('</head>', gptScripts + '\n</head>');

fs.writeFileSync('index.html', html);
console.log('✓ Step 1: Converted to GPT mode');
