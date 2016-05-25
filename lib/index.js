const Generate = require('./generate');
const chokidar = require('chokidar');
const store = require('./state/store');
const Pages = require('./generate/pages');
const actions = require('./state/action');

const options = {
  'srcPath': './src',
  'buildPath': './build'
}

//init core classes
const g = new Generate(options);
const p = new Pages(options);

//start
store.dispatch(actions.start());

const watcher = new chokidar.watch(options.srcPath, {ignored: /[\/\\]\./, persistent: true});

watcher.on('change', (path) => {
  //need to standardise files path, will prob need to create a util for this

  //TODO: need a standard way to regenerate all kinds of files pages, layout, assets
  store.dispatch(actions.change('./' + path));
});
