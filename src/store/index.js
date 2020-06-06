import appReducer from "./appReducer";
const { createStore, compose, applyMiddleware} = require('redux');

// // Be sure to ONLY add this middleware in development!
const middleware = process.env.NODE_ENV !== 'production' ?
  [
      require('redux-immutable-state-invariant').default(),
  ]:
  [];
 
// Note passing middleware as the last argument to createStore requires redux@>=3.1.0

const store = createStore(
    appReducer,
    compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



export default store;
