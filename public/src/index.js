import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import reducers from './reducers';

//Creation of Store using Redux-Thunk
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  createLogger()
)(createStore);

/****************** React routing *************/
//Render Final React DOM elemets
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('.container'));
