const js = require('./javascript');
const md = require('./markdown');
const njk = require('./nunjucks');
const d = require('./default');

const process = (file, data) => {
  const ext = file.get('ext');

  //Find a renderer that matches the file type
  const renderer = registry[ext];

  //If a renderer isnt found use the default renderer
  return renderer ? renderer(data, file) : d(data, file);
}

//register functions for each file ext
const registry = {
  md,
  njk,
  js,
  html: njk
}

module.exports = process;
