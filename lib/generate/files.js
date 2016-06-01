const utils = require('../utils');
const store = require('../state/store');
const action = require('../state/action');
const engine = require('../engine');

class Files {

  constructor(options) {
    this.options = options;

    utils.subscribe(action.FOUND_FILES, this.generate.bind(this), 'files');
    utils.subscribe(action.CHANGE, this.singleFile.bind(this), 'path');
  }

  generate(files) {
    let pages = files.filter(file => file.get('type') === 'page');
    pages.map(file => this.singleFile(file));
  }

  singleFile(file) {
    utils.readFile(file.get('path'))
      .then((data) => {
        let parsedData = engine.parse(file.get('ext'), data);      
        this.write(file.get('path'), parsedData, file.get('ext'));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  write(file, data, ext) {
    const { srcPath, buildPath } = this.options;

    //remove .md
    let prepared = file.replace(ext, 'html').replace(srcPath, buildPath);
    return utils.writeFile(prepared, data);
  }



}

module.exports = Files;
