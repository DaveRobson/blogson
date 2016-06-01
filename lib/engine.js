const marked = require('marked');
const nunjucks = require('nunjucks');
const matter = require('gray-matter');
const layouts = require('./util/layouts');

const parse = (ext, data) => {
  let parser = registry[ext];

  return parser(data)
};

const md = data => {
  const page = matter(data);

  if(page.data.layout) {    
    return layouts.loadByName(page.data.layout + '.njk', marked(page.content));
  } else {
    return marked(page.content);
  }
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
