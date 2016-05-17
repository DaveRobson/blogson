const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const writeHtmlFile = (filename, data) => {

  return new Promise((resolve, reject) => {
    //create directory before adding file
    mkdirp(path.dirname(filename), function (err) {
      if (err) {
        reject(err);
      } else {

        fs.writeFile(filename + ".html", marked(data), function(err) {
            if(err) {
              reject(err);
            }

            console.log("The file was saved!");
            resolve();
        });

      }
    });


  });
};

module.exports = {
  writeHtmlFile: writeHtmlFile
}
