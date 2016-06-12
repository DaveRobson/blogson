const nunjucks = require('nunjucks');
var env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader('./src/_layout'),
  { autoescape: false }
);
const loadByName = (name, content) => {

    try {
      const context = {
        content,
        scripts: 'scripts.njk',
        css: 'css.njk'
      }
      return env.render(name, context);
    } catch(error) {
      console.log(error);
    }

}

module.exports = {
  loadByName,
  env
}
