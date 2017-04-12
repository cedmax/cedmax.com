importScripts('/node_modules/sw-toolbox/sw-toolbox.js');

toolbox.precache(@@filesToCache)
toolbox.router.get('/', toolbox.fastest);
toolbox.router.get('js/main.*.js', toolbox.fastest);
toolbox.router.get('img/*', toolbox.cacheFirst);
