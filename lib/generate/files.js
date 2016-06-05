const utils = require('../utils');
const store = require('../state/store');
const action = require('../state/action');
const engine = require('../engine');

//TODO: With a bit of design all files could probably be handled by one class 
class Files {

  constructor(options) {
    this.options = options;

    utils.subscribe(action.FOUND_FILES, this.generate.bind(this), 'files');
    utils.subscribe(action.CHANGE, this.singleFile.bind(this), 'path');
  }

  generate(files) {
    let pages = files.filter(file => file.get('type') === 'page');

    let work = pages.map(file => this.singleFile(file)).values();

    //When all the files have been saved dispatch new event
    Promise.all(work)
      .then(() => store.dispatch(action.generatedPages()))
      .catch((err) => console.log(err));
  }

  singleFile(file) {

    //TODO: abstract is all away
    return new Promise((resolve, reject) => {
      utils.readFile(file.get('path'))
        .then((data) => {
          let parsedData = engine.parse(file.get('ext'), data);
          this.write(file.get('path'), parsedData, file.get('ext'))
            .then(() => resolve())
            .catch((err) => reject('failed to write file: ' + file));
        })
        .catch((err) => {
          console.log(err);
        })
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
