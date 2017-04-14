import { combineReducers } from 'redux';
import FilesReducer from './FilesReducer';

//rootReducer assignment to combine all Reducers
const rootReducer = combineReducers({
  files: FilesReducer
});

//Module Export definition
export default rootReducer;
