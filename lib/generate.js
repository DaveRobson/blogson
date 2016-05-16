const marked = require('marked');
const walk = require('walk');
const fs = require('fs');

class Generate {

  constructor() {

  }

  run(path) {

    let files = [];

    const walker = walk.walk(path, {followLinks: false});

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
    return new Promise((resolve, reject) => {
      //remove .md
      let withoutEx = file.slice(0, -3);

      fs.writeFile(withoutEx + ".html", marked(data), function(err) {
          if(err) {
            reject(err);
          }

          console.log("The file was saved!");
          resolve();
      });
    });
  }
}

module.exports = Generate;
