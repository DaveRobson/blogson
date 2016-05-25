const marked = require('marked');
const nunjucks = require('nunjucks');
const matter = require('gray-matter');

const parse = (ext, data) => {
  let parser = registry[ext];

  return parser(data)
};

const md = data => {
  const page = matter(data);
  return marked(data);
};

const njk = data => {
  return nunjucks.renderString(data);
};

const registry = {
  md: md,
  njk: njk
}

module.exports = {
  parse
}
