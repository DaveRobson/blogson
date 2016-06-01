
const START = 'START';
const FIND_FILES = 'FIND_FILES';
const CHANGE = 'CHANGE';
const FOUND_FILES = 'FOUND_FILES'

findFiles = files => {
  return {type: FIND_FILES, files: files}
}

foundFiles = (files) => {
  return {
    type: FOUND_FILES,
    files: files
  }
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
  FOUND_FILES,

  start,
  findFiles,
  change,
  foundFiles
}
