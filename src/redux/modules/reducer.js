import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import blocks from './blocks';
import block from './block';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  blocks,
  block
});
