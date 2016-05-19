const marked = require('marked');
const walk = require('walk');
const fs = require('fs');
const utils = require('./utils');
const engine = require('./engine');

class Generate {

  constructor(options) {
    this.options = options;
  }

  run() {

    let files = [];

    const { srcPath } = this.options;
    const walker = walk.walk(srcPath, {followLinks: false});

    walker.on('file', (root, stat, next) => {
      files.push(root + '/' + stat.name);
      next();
    });

    walker.on('end', () => {
      for(var i = 0; i < files.length; i++) {
        let file = files[i];

        this.singleFile(file);
      }
    });
  }

  read(file) {

    return new Promise((resolve, reject) => {

      fs.readFile(file, 'utf-8', function(err, data) {
        if(err) {
          throw reject(err);
        }
        resolve(data);
      });
    });

  }

  write(file, data, ext) {
    const { srcPath, buildPath } = this.options;

    //remove .md
    let prepared = file.replace(ext, 'html').replace(srcPath, buildPath);
    return utils.writeHtmlFile(prepared, data);
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

module.exports = Generate;
