const { env } = require('../util/layoutUtils');

module.exports = (data, file) => {
  //massive hack, need a way of rendering all the needed templates nicely
  return env.renderString(data, {scripts: env.render('scripts.njk', {})});
};
