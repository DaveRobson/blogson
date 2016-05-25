const fs = require('fs');
const utils = require('../utils');
const engine = require('../engine');
const store = require('../state/store');
const action = require('../state/action');

class Pages {

  constructor(options) {
    this.options = options;

    let unsubscribe = store.subscribe(() => {
      if(store.getState().get('type') === action.FIND_FILES) {
        let state = store.getState().toJS();
        this.generate(state.files)
      }
    });

  }

  generate(files) {
    for(var i = 0; i < files.length; i++) {
      let file = files[i];
      this.singleFile(file);
    }
  }

  read(file) {
    return utils.readFile(file);
  }

  write(file, data, ext) {
    const { srcPath, buildPath } = this.options;

    //remove .md
    let prepared = file.replace(ext, 'html').replace(srcPath, buildPath);
    return utils.writeFile(prepared, data);
  }

  singleFile(file) {

    this.read(file)
      .then((data) => {
        let ext = utils.getFileExt(file);
        let parsedData = engine.parse(ext, data);
        this.write(file, parsedData, ext);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

module.exports = Pages;
