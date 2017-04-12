importScripts('/node_modules/sw-toolbox/sw-toolbox.js');

toolbox.precache(@@filesToCache)
toolbox.router.get('/', toolbox.networkFirst);
toolbox.router.get('js/main.*.js', toolbox.networkFirst);
toolbox.router.get('img/*', toolbox.cacheFirst);
