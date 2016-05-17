const marked = require('marked');
const walk = require('walk');
const fs = require('fs');
const utils = require('./utils');

class Generate {

  constructor(options) {
    this.options = options;
  }

  run() {

    let files = [];


    const { srcPath } = this.options;
    const walker = walk.walk(srcPath, {followLinks: false});

    walker.on('file', (root, stat, next) => {
      // Only look at md files
      if(stat.name.split('.')[1] === 'md') {
        files.push(root + '/' + stat.name);
      }
      next();
    });

    walker.on('end', () => {
      for(var i = 0; i < files.length; i++) {
        let file = files[i];

        this.read(file)
          .then((data) => {
              this.write(file, data);
          })
          .catch((err) => {
            console.log(err);
          })
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

  write(file, data) {

    const { srcPath, buildPath } = this.options;

    //remove .md
    let prepared = file.slice(0, -3).replace(srcPath, buildPath);
    return utils.writeHtmlFile(prepared, data);
  }
}

module.exports = Generate;
