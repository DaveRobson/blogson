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

        fs.writeFile(filename, data, function(err) {
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

const getFileExt = filename => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

module.exports = {
  writeHtmlFile: writeHtmlFile,
  getFileExt
}
