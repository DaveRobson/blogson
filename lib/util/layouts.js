const nunjucks = require('nunjucks');
var env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader('./src/_layout'),
  { autoescape: false }
);
const loadByName = (name, content) => {
    const context = {
      content
    }
    return env.render(name, context);
}

module.exports = {
  loadByName
}
