const fs = require("fs");

fs.copyFileSync(
  `${process.cwd()}/node_modules/sw-toolbox/sw-toolbox.js`,
  `${process.cwd()}/dist/sw-toolbox.js`
);

const serviceWorker = fs.readFileSync(
  `${process.cwd()}/src/service-worker.js`,
  "UTF-8"
);

const newSW = serviceWorker.replace(
  '"@@filesToCache"',
  JSON.stringify(
    fs
      .readdirSync("./public/api")
      .filter(img => img.indexOf(".jpg") > -1 || img.indexOf(".png") > -1)
      .map(img => `api/${img}`)
  )
);

fs.writeFileSync(`${process.cwd()}/dist/service-worker.js`, newSW, "UTF-8");
