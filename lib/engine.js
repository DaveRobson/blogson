const marked = require('marked');
const nunjucks = require('nunjucks');

const parse = (ext, data) => {
  let parser = registry[ext];

  return parser(data)
};

const md = data => {
  return marked(data);
};

const njk = data => {
  return nunjucks.renderString(data, {title: "home"});
};

const registry = {
  md: md,
  njk: njk
}

module.exports = {
  parse
}
