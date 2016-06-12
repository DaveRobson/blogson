const { subscribe } = require('../util/stateUtils');
const { store, action } = require('../state');
const { FOUND_FILES, CHANGE, GENERATED_PAGES} = action;
const { getFileExt } = require('../util/fileUtils');
const reader = require('./reader');
const writer = require('./writer');

class Files {

  constructor(options) {
    this.options = options;

    subscribe(FOUND_FILES, this.generatePages.bind(this), 'files');
    //subscribe(CHANGE, this.singleFile.bind(this), 'path');
    subscribe(GENERATED_PAGES, this.generateAssets.bind(this), 'files');
    subscribe(CHANGE, this.onChange.bind(this));
  }

  generatePages(files) {
    console.log('starting page generation')
    this.generate(files, 'page')
      .then(() => store.dispatch(action.generatedPages()))
      .catch(err => console.error('page generation failed: ' + err));
  }

  generateAssets(files) {
    console.log('starting asset generation')
    this.generate(files, 'asset')
      .then(() => store.dispatch(action.generatedAssets()))
      .catch(err => console.error('asset generation failed: ' + err));
  }

  singleFile(file) {
    return reader(file)
      .then(data => writer(file, data, this.options))
      .catch(err => console.log(err));
  }

  generate(files, fileType) {
    let filesOfType = files.filter(file => file.get('type') === fileType);
    let work = filesOfType.map(file => this.singleFile(file)).values();
    return Promise.all(work);
  }

  onChange(state) {
    const changedPath = state.get('path');

    if(changedPath) {
      const ext = getFileExt(changedPath);
      const id = changedPath.replace('.' + ext, '');

      const changedFile = state.get('files').get(id);
      this.singleFile(changedFile);
    }
  }
}

module.exports = Files;
