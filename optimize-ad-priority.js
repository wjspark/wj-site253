const fs = require('fs');
const path = require('path');

// 1. 优化首页
let indexHtml = fs.readFileSync('index.html', 'utf8');

// 将广告脚本移到 title 之后
indexHtml = indexHtml.replace(
  /(<title>.*?<\/title>)\s*<style>/s,
  `$1
  <link rel="preconnect" href="https://securepubads.g.doubleclick.net">
  <link rel="dns-prefetch" href="https://securepubads.g.doubleclick.net">
  <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossorigin="anonymous"></script>
  <script>
  window.googletag = window.googletag || {cmd: []};
  googletag.cmd.push(function() {
    googletag.defineSlot('/23334333394/sub2', [[250, 250], [300, 250], [336, 280], [200, 200], [480, 320]], 'div-gpt-ad-1773800289746-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
  </script>
  <style>`
);

// 删除原来位置的广告脚本
indexHtml = indexHtml.replace(
  /\s*<link rel="preconnect"[^>]*>\s*<link rel="dns-prefetch"[^>]*>\s*<script async src="https:\/\/securepubads[^<]*<\/script>\s*<script>\s*window\.googletag[\s\S]*?<\/script>/,
  ''
);

fs.writeFileSync('index.html', indexHtml);
console.log('✓ index.html optimized');
