import react from "@vitejs/plugin-react";
import { ProxyOptions, defineConfig } from "vite";
import { join } from "path";
import { readdirSync, writeFileSync } from "fs";

// RootPath
const srcPath = join("v1");

const chartPackages = readdirSync(join("src", "v1"), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const port = process.env.port || 3002; // Default to port 3002 if PORT environment variable is not set

const hostURL = `http://localhost:${port}`;

// ProxyOption used for correct route instead of absolute path URL
const proxyOption = {};
const urls = chartPackages.map((folder) => {
  const pathKey = "/" + folder;
  const targetUrl = `${hostURL}/${srcPath}/${folder}/`;

  proxyOption[pathKey] = {
    target: targetUrl,
    changeOrigin: true,
    rewrite: (path) => path.replace(pathKey, ""),
    ignorePath: true,
  } as ProxyOptions;
  return {
    name: folder,
    sourceUrl: `${hostURL}/v1/${folder}/`,
  };
});

// Write the JSON file
// Check generated_urls.json for all generated URLS
const jsonFilePath = join(__dirname, "generated_urls.json");
writeFileSync(jsonFilePath, JSON.stringify(urls, null, 2));

export default defineConfig({
  // base: './',
  root: "src",
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      treeShaking: true,
    },
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: chartPackages.reduce((entries, folder) => {
        entries[folder] = join('src','v1', `/${folder}/index.html`);
        return entries;
      }, {}),
    },
  },
  server: {
    proxy: proxyOption,
  },
});
