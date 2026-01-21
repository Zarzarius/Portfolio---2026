import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const clientDir = join(rootDir, 'dist', 'client');
const assetsDir = join(clientDir, 'assets');

// Find the main JS and CSS files
const assets = readdirSync(assetsDir);
const mainJs = assets.find(f => f.startsWith('main-') && f.endsWith('.js'));
const indexJs = assets.find(f => f.startsWith('index-') && f.endsWith('.js'));
const indexCss = assets.find(f => f.startsWith('index-') && f.endsWith('.css'));
const mainCss = assets.find(f => f.startsWith('main-') && f.endsWith('.css'));

const jsFiles = [mainJs, indexJs].filter(Boolean);
const cssFiles = [mainCss, indexCss].filter(Boolean);

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio 2026</title>
${cssFiles.map(css => `    <link rel="stylesheet" crossorigin href="/assets/${css}">`).join('\n')}
  </head>
  <body>
${jsFiles.map(js => `    <script type="module" crossorigin src="/assets/${js}"></script>`).join('\n')}
  </body>
</html>
`;

writeFileSync(join(clientDir, 'index.html'), html);
console.log('Generated index.html with assets:', { jsFiles, cssFiles });
