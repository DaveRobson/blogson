const walk = require('walk');
const Pages = require('./generate/pages');

class Generate {

  constructor(options) {
    this.options = options;
    this.pages = new Pages(this.options);
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
      this.pages.generate(files);
    });
  }
}

module.exports = Generate;
