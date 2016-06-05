const { writeFile } = require('../util/fileUtils');

const replacementMap = {
  md: 'html',
  njk: 'html',
  js: 'js',
  html: 'html'
}

//if the ext is the same as the value dont replace it
const doReplacement = (file, options) => {
  const { srcPath, buildPath, assetOutput, assetInput } = options;

  const path = file.get('path');
  const ext = file.get('ext');

  const value = replacementMap[ext];

  if(file.get('type') === 'asset') {
    return path.replace(assetInput, assetOutput).replace(srcPath, buildPath);
  } else if(value === ext) {
    return path.replace(srcPath, buildPath);
  } else {
    return path.replace(ext, value).replace(srcPath, buildPath)
  }
}

module.exports = (file, data, options) => {
  return new Promise((resolve, reject) => {
    //remove .md
    let prepared = doReplacement(file, options);
    writeFile(prepared, data)
      .then(() => {
        resolve();
      })
      .catch(err => {
        console.error('Unable to write file: ' + file);
      });
  });

}
