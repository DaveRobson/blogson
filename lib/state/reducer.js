const actions = require('./action');
const Immutable = require('immutable');

const initialState = new Immutable.Map({
  type: actions.START,
  files: [],
  layout: []
});

const blogson = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case actions.FIND_FILES:
      return state.merge(action);
    case actions.CHANGE:
      return state.merge(action);
    default:
      return state.merge(action);
  };
}

module.exports = blogson
