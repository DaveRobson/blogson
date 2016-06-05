const { subscribe } = require('../util/stateUtils');
const { getFileExt, readFile, writeFile } = require('../util/fileUtils');
const { store, action } = require('../state');
const { GENERATED_PAGES } = action;

class Assets {

  constructor(options) {
    this.options = options;

    //subscribe(GENERATED_PAGES, this.process.bind(this), 'files');
  }

  process(files) {
    let assets = files.filter(file => file.get('type') === 'asset');

    assets.forEach(file => {
      if(file.get('ext') === 'js') {
        this.js(file);
      }
    });
  }

  js(file) {
    return new Promise((resolve, reject) => {
      readFile(file.get('path'))
        .then(data => {
          return this.write(file.get('path'), data, file.get('ext'))
            .then(() => resolve())
            .catch((err) => reject('failed to write file: ' + file));
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

  write(file, data, ext) {
    const { srcPath, buildPath, assetOutput, assetInput } = this.options;

    //remove .md
    let prepared = file.replace(assetInput, assetOutput).replace(srcPath, buildPath);
    return writeFile(prepared, data);
  }
}

module.exports = Assets;
