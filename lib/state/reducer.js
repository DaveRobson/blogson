const action = require('./action');
const Immutable = require('immutable');

const initialState = new Immutable.Map({
  type: action.START,
  files: [],
  layout: []
});

const blogson = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }


  if(action.type === 'FIND_FILES') {
   return state.merge(action);
  }
  return state;
}

module.exports = blogson
