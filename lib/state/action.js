
const START = 'START';
const FIND_FILES = 'FIND_FILES';
const CHANGE = 'CHANGE';

findFiles = files => {
  return {type: FIND_FILES, files: files}
}

start = () => {
  return {
    type: START
  }
}

change = (path) => {
  return {
    type: CHANGE,
    path: path
  }
}

module.exports = {
  START,
  FIND_FILES,
  CHANGE,

  start,
  findFiles,
  change
}
