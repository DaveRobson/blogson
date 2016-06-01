const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const store = require('./state/store');

const writeFile = (filename, data) => {
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

const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', function(err, data) {
      if(err) {
        throw reject(err);
      }
      resolve(data);
    });
  });
}

const subscribe = (type, subFunction, filter) => {
  store.subscribe(() => {
    const state = store.getState();
    console.log()
    if(state.get('type') === type) {
      if(filter) {
        subFunction(state.get(filter));
      } else {
        subFunction(state);
      }

    }
  })
};

module.exports = {
  writeFile,
  getFileExt,
  readFile,
  subscribe
}
