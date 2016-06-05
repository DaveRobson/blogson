const store = require('../state/store');

const subscribe = (type, subFunction, filter) => {
  store.subscribe(() => {
    const state = store.getState();
    if(state.get('type') === type) {
      if(filter) {
        subFunction(state.get(filter));
      } else {
        subFunction(state);
      }

    }
  })
};

module.exports = {
  subscribe
}
