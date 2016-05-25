
const START = 'START';
const FIND_FILES = 'FIND_FILES';

findFiles = files => {
  return {type: FIND_FILES, files: files}
}

module.exports = {
  START,
  FIND_FILES,
  findFiles
}
