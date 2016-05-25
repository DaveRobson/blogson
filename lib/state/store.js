const redux = require('redux');
const Immutable = require('immutable');
const reducer = require('./reducer');

const store = redux.createStore(reducer);

module.exports = store;
