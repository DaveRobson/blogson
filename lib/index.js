const Generate = require('./generate');
const chokidar = require('chokidar');
const { store, action } = require('./state');

const options = {
  'srcPath': './src',
  'buildPath': './build',
  'assetOutput': 'public',
  'assetInput': '_asset'
}

//init core classes
new Generate(options);

//start
store.dispatch(action.start());

const watcher = new chokidar.watch(options.srcPath, {ignored: /[\/\\]\./, persistent: true});

watcher.on('change', (path) => {
  //need to standardise files path, will prob need to create a util for this

  //TODO: need a standard way to regenerate all kinds of files pages, layout, assets
  console.log('changed!!!!');
  store.dispatch(action.change('./' + path));
});
