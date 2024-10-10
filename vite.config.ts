import react from '@vitejs/plugin-react';
import { ProxyOptions, defineConfig } from 'vite';
import { join } from 'path';
import { readdirSync, writeFileSync } from 'fs';

const sourceFolders = ['v1', 'v10_5'];

const chartPackages = sourceFolders.flatMap((srcPath) =>
  readdirSync(join('src', srcPath), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({ name: dirent.name, folder: srcPath }))
);

const port = process.env.port || 3002; // Default to port 3002 if PORT environment variable is not set

const hostURL = `http://localhost:${port}`;

// ProxyOption used for correct route instead of absolute path URL
const proxyOption = {};
const urls = chartPackages.map(({ name: folder, folder: srcPath }) => {
  const pathKey = `/${srcPath}/${folder}`;
  const targetUrl = `${hostURL}/${srcPath}/${folder}/`;

  proxyOption[pathKey] = {
    target: targetUrl,
    changeOrigin: true,
    rewrite: (path) => path.replace(pathKey, ''),
    ignorePath: true,
  } as ProxyOptions;
  return {
    name: folder,
    sourceUrl: `${hostURL}/${srcPath}/${folder}/`,
  };
});

// Write the JSON file
// Check generated_urls.json for all generated URLS
const jsonFilePath = join(__dirname, 'generated_urls.json');
writeFileSync(jsonFilePath, JSON.stringify(urls, null, 2));

export default defineConfig({
  // base: './',
  root: 'src',
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      treeShaking: true,
    },
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: chartPackages.reduce(
        (entries, { name: folder, folder: srcPath }) => {
          entries[folder] = join('src', srcPath, `/${folder}/index.html`);
          return entries;
        },
        {}
      ),
    },
  },
  server: {
    proxy: proxyOption,
  },
});
