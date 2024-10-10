## TS Chart Examples

### Code to run

```
npm i
npm run dev
```

### List of urls

<<<<<<< Updated upstream
```
[
  {
    "name": "bar-chart-with-measure-names-values",
    "sourceUrl": "http://localhost:3002/v1/bar-chart-with-measure-names-values/"
  },
  {
    "name": "combo-chart",
    "sourceUrl": "http://localhost:3002/v1/combo-chart/"
  },
  {
    "name": "custom-bar-chart",
    "sourceUrl": "http://localhost:3002/v1/custom-bar-chart/"
  },
  {
    "name": "custom-bar-react",
    "sourceUrl": "http://localhost:3002/v1/custom-bar-react/"
  },
  {
    "name": "gantt",
    "sourceUrl": "http://localhost:3002/v1/gantt/"
  },
  {
    "name": "sunburst",
    "sourceUrl": "http://localhost:3002/v1/sunburst/"
  },
  {
    "name": "tester-chart",
    "sourceUrl": "http://localhost:3002/v1/tester-chart/"
  }
]
```
=======
will be available here [Generate Urls](./generated_urls.json)

### Versioning of charts based on TS

We have introduced new folders for separate versions the folder structure apart from v1, which will contain the current charts code.

- If a minimum version required to run the chart is 10.5 the path to chart code is `src/v10_5/<customcharttype-folder>`
- We would need to update `sourceFolders` array in `vite.config.ts` for deployment.
- The generated urls will look like http://localhost:3002/v10_5/custom-bar-chart-10_5/ for TS version 10.5 where custom-bar-chart is the folder where custom bar chart code is present.

Note: Notice that we did not repeat the name of custom-bar-chart folder as it can cause conflicts while build how we have defined the current vite config so it is advised to use different folder names like the one we have used above.
>>>>>>> Stashed changes
