const { env } = require('../util/layoutUtils');

module.exports = (data, file) => {

  const context = {
    name: file.get('name')
  }

  return env.renderString(data, context);
};
