const fs = require('fs');
const path = require('path');

// 处理首页
let indexHtml = fs.readFileSync('index.html', 'utf8');
const adScriptMatch = indexHtml.match(/(<link rel="preconnect"[\s\S]*?<\/script>)\s*<style>/);
if (adScriptMatch) {
  const adScript = adScriptMatch[1];
  indexHtml = indexHtml.replace(adScript + '\n  <style>', '<style>');
  indexHtml = indexHtml.replace(/(<title>.*?<\/title>)/, `$1\n  ${adScript}`);
  fs.writeFileSync('index.html', indexHtml);
  console.log('✓ index.html');
}

// 处理游戏子页
const detailDir = 'detail';
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html') && !f.endsWith('_mobile.html'));

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  const match = html.match(/(<link rel="preconnect"[\s\S]*?<\/script>)\s*<style>/);
  if (match) {
    const adScript = match[1];
    html = html.replace(adScript + '\n<style>', '<style>');
    html = html.replace(/(<title>.*?<\/title>)/, `$1\n  ${adScript}`);
    fs.writeFileSync(filePath, html);
    console.log(`✓ ${file}`);
  }
});

console.log('\nDone!');
