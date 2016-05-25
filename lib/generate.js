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

    let files = [];
    let layout = [];

    const { srcPath } = this.options;
    const walker = walk.walk(srcPath, {followLinks: false});

    walker.on('file', (root, stat, next) => {

      if(root.indexOf('_layout') > -1) {
        layout.push(root + '/' + stat.name);
      } else {
        files.push(root + '/' + stat.name);
      }

      next();
    });

    walker.on('end', () => {
      store.dispatch(actions.findFiles(files));
      //this.pages.generate(files);
    });
  }
}

module.exports = Generate;
