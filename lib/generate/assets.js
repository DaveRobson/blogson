const utils = require('../utils');
const { store, action } = require('../state');;

class Assets {

  constructor(options) {
    this.options = options;

    utils.subscribe(action.GENERATED_PAGES, this.process.bind(this), 'files');
  }

  process(files) {
    let assets = files.filter(file => file.get('type') === 'asset');
    
  }
}

module.exports = Assets;
