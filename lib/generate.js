const walk = require('walk');
const Pages = require('./generate/pages');
const store = require('./state/store');
const action = require('./state/action');

class Generate {

  constructor(options) {
    this.options = options;
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
      store.dispatch(action.findFiles(files));
      //this.pages.generate(files);
    });
  }
}

module.exports = Generate;
