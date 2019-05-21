/* global importScripts: false, toolbox: false */
importScripts("/sw-toolbox.js");

toolbox.precache("@@filesToCache");
toolbox.router.get("/", toolbox.fastest);
toolbox.router.get("*.js", toolbox.fastest);
toolbox.router.get("*.css", toolbox.fastest);
toolbox.router.get("api/*", toolbox.cacheFirst);
