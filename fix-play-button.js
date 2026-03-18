const fs = require('fs');
const path = require('path');

const detailDir = 'detail';
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html') && !f.endsWith('_mobile.html'));

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 替换点击事件逻辑
  html = html.replace(
    /playButton\.addEventListener\('click', function\(e\) \{[\s\S]*?playButton\.style\.display = 'none';[\s\S]*?\}\);/,
    `playButton.addEventListener('click', function(e) {
        e.preventDefault();
        const topSection = document.querySelector('.top-section');
        playSection.style.display = 'block';
        if (topSection) topSection.style.display = 'none';
      });`
  );

  fs.writeFileSync(filePath, html);
  console.log(`✓ ${file}`);
});

console.log('\nDone!');
