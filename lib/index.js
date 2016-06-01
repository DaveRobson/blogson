const Generate = require('./generate');
const chokidar = require('chokidar');
const store = require('./state/store');
const Files = require('./generate/files');
const actions = require('./state/action');

const options = {
  'srcPath': './src',
  'buildPath': './build'
}

//init core classes
new Generate(options);
new Files(options);

//start
store.dispatch(actions.start());

const watcher = new chokidar.watch(options.srcPath, {ignored: /[\/\\]\./, persistent: true});

watcher.on('change', (path) => {
  //need to standardise files path, will prob need to create a util for this

  //TODO: need a standard way to regenerate all kinds of files pages, layout, assets
  console.log('changed!!!!');
  store.dispatch(actions.change('./' + path));
});
