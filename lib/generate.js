const walk = require('walk');
const Pages = require('./generate/pages');
const store = require('./state/store');
const actions = require('./state/action');
const utils = require('./utils');

class Generate {

  constructor(options) {
    this.options = options;

    utils.subscribe(actions.START, this.run.bind(this));
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
      store.dispatch(actions.foundFiles(files));
    });
  }

  details(root, stat) {
    const ext = utils.getFileExt(stat.name);
    const name = stat.name.replace('.' + ext, '');

    let details = {
      name,
      ext,
      path: root + '/' + stat.name
    }

    if(root.indexOf('_layout') > -1) {
      details.type = 'layout';
    } else {
      details.type = 'page'
    }
    return details
  }
}

module.exports = Generate;
