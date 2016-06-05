const js = require('./javascript');
const md = require('./markdown');
const njk = require('./nunjucks');

const process = (file, data) => {
  const ext = file.get('ext');
  const renderer = registry[ext];
  return renderer(data, file);
}

//register functions for each file ext
const registry = {
  md,
  njk,
  js,
  html: njk
}

module.exports = process;
