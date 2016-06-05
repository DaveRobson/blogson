
const START = 'START';
const FIND_FILES = 'FIND_FILES';
const CHANGE = 'CHANGE';
const FOUND_FILES = 'FOUND_FILES';
const GENERATED_PAGES = 'GENERATED_PAGES';
const GENERATED_ASSETS = 'GENERATED_ASSETS';

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

foundFiles = (files) => {
  return {
    type: FOUND_FILES,
    files: files
  }
}

generatedPages = () => {
  console.log('Saved all the pages!!');

  return {
    type: GENERATED_PAGES
  }
}


generatedAssets = () => {
  console.log('Saved all the assets!!');

  return {
    type: GENERATED_ASSETS
  }
}

module.exports = {
  START,
  FIND_FILES,
  CHANGE,
  FOUND_FILES,
  GENERATED_PAGES,
  GENERATED_ASSETS,

  start,
  findFiles,
  change,
  foundFiles,
  generatedPages,
  generatedAssets
}
