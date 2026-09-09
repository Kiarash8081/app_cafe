import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const skip = new Set(['node_modules', 'dist', '.git']);
const skipFiles = new Set(['package-lock.json', 'cafe-all.html', 'hero-verify.png']);
const allowExt = new Set(['.jsx', '.js', '.css', '.html', '.svg', '.json', '.yml', '.md', '.txt', '.xml', '.gitignore']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (skip.has(name) || skipFiles.has(name)) continue;
    const full = path.join(dir, name);
    const rel = path.relative(root, full).replaceAll('\\', '/');
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
      continue;
    }
    const ext = path.extname(name);
    if (name === '.gitignore' || allowExt.has(ext)) out.push(rel);
  }
  return out;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

const files = walk(root).sort((a, b) => a.localeCompare(b, 'en'));
const parts = files.map((rel) => {
  const body = fs.readFileSync(path.join(root, rel), 'utf8');
  return `<section class="file">
<h2>${escapeHtml(rel)}</h2>
<pre><code>${escapeHtml(body)}</code></pre>
</section>`;
});

const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>کافه نوا — کل کدها</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Tahoma, "Segoe UI", Arial, sans-serif;
      background: #1a1612;
      color: #f6efe4;
      line-height: 1.65;
    }
    header {
      position: sticky;
      top: 0;
      padding: 16px 20px;
      background: #2a1d16;
      border-bottom: 1px solid #6b4630;
      z-index: 2;
    }
    h1 { margin: 0; font-size: 1.3rem; }
    p { margin: 6px 0 0; color: #c4a07a; }
    main { padding: 12px 16px 40px; }
    .file {
      margin: 18px 0;
      padding: 14px;
      border: 1px solid #6b4630;
      border-radius: 14px;
      background: #241c16;
    }
    h2 {
      margin: 0 0 10px;
      font-size: 1rem;
      color: #e8c56b;
      direction: ltr;
      text-align: left;
    }
    pre {
      margin: 0;
      overflow: auto;
      direction: ltr;
      text-align: left;
      white-space: pre-wrap;
      word-break: break-word;
      font: 13px/1.55 Consolas, "Courier New", monospace;
      color: #f3e6d4;
    }
  </style>
</head>
<body>
  <header>
    <h1>کل کدهای پروژه کافه نوا</h1>
    <p>${files.length} فایل، پشت‌سرهم در همین صفحه</p>
  </header>
  <main>
${parts.join('\n')}
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'cafe-all.html'), html);
console.log(`wrote cafe-all.html with ${files.length} files`);
