const nunjucks = require('nunjucks');
var env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader('./src/_layout'),
  { autoescape: false }
);
const loadByName = (name, content) => {

    const context = {
      content,
      scripts: env.render('scripts.njk', {})
    }
    return env.render(name, context);
}

module.exports = {
  loadByName,
  env
}
