const { loadByName } = require('../util/layoutUtils');
const matter = require('gray-matter');
const marked = require('marked');

module.exports = data => {
  const page = matter(data);

  if(page.data.layout) {
    return loadByName(page.data.layout + '.njk', marked(page.content));
  } else {
    return marked(page.content);
  }
};
