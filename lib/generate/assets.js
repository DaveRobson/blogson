const utils = require('../utils');
const { store, action } = require('../state');;

class Assets {

  constructor(options) {
    this.options = options;

    utils.subscribe(action.GENERATED_PAGES, this.process.bind(this), 'files');
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
      utils.readFile(file.get('path'))
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
    return utils.writeFile(prepared, data);
  }
}

module.exports = Assets;
