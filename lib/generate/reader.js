const { readFile } = require('../util/fileUtils');
const renderer = require('../render');

module.exports = file => {
  return readFile(file.get('path'))
    .then(data => renderer(file, data))
    .catch(err => console.error('Unable to read file: ' + file));
}
