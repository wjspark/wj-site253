const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 替换 amp-custom 为普通 style
html = html.replace(/<style amp-custom>/, '<style>');

fs.writeFileSync('index.html', html);
console.log('✓ Step 3: Fixed style tag');
