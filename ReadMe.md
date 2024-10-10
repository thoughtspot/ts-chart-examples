## TS Chart Examples

### Code to run

```
npm i
npm run dev
```

### List of urls

will be available here [Generate Urls](./generated_urls.json)

### Versioning of charts based on TS

We have introduced new folders for separate versions the folder structure apart from v1, which will contain the current charts code.

- If a minimum version required to run the chart is 10.5 the path to chart code is `src/v10_5/<customcharttype-folder>`
- We would need to update `sourceFolders` array in `vite.config.ts` for deployment.
- The generated urls will look like http://localhost:3002/v10_5/custom-bar-chart/ for TS version 10.5 where custom-bar-chart is the folder where custom bar chart code is present.
