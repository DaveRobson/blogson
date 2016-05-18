const Generate = require('./generate');
const chokidar = require('chokidar');

const options = {
  'srcPath': './src',
  'buildPath': './build'
}

const g = new Generate(options);
g.run();

const watcher = new chokidar.watch(options.srcPath, {ignored: /[\/\\]\./, persistent: true});

watcher.on('change', (path) => {
  //need to standardise files path, will prob need to create a util for this
  g.singleFile('./' + path);
});
