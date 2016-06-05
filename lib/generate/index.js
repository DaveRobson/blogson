const walk = require('walk');
const { store, action } = require('../state');
const utils = require('../utils');
const Files = require('./files');
const Assets = require('./assets');

class Generate {

  constructor(options) {
    this.options = options;
    new Files(options);
    new Assets(options);

    utils.subscribe(action.START, this.run.bind(this));
  }

  run() {

    let files = {};
    const { srcPath } = this.options;
    const walker = walk.walk(srcPath, {followLinks: false});

    walker.on('file', (root, stat, next) => {
      const info = this.details(root, stat)
      files[root + '/' + info.name] = info;
      next();
    });

    walker.on('end', () => {
      store.dispatch(action.foundFiles(files));
    });
  }

  //todo make this a little neater
  details(root, stat) {
    const ext = utils.getFileExt(stat.name);
    const name = stat.name.replace('.' + ext, '');
    const { assetInput } = this.options;

    let details = {
      name,
      ext,
      path: root + '/' + stat.name
    }

    if(root.indexOf('_layout') > -1) {
      details.type = 'layout';
    } else if(root.indexOf(assetInput) > -1) {
      details.type = 'asset'
    } else {
      details.type = 'page'
    }
    return details
  }
}

module.exports = Generate;
