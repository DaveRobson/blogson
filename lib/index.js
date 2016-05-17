const Generate = require('./generate');


const options = {
  'srcPath': './src',
  'buildPath': './build'
}

const g = new Generate(options);
g.run();
