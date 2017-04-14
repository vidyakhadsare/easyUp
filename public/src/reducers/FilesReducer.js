//Import each individual action from actions
import {
  FETCH_FILE_LIST,
  FILES_FETCHED,
  FILES_DELETED
} from '../actions/FileActions';

import {
  OPEN_UPLOAD_DIALOG,
  CLOSE_UPLOAD_DIALOG
} from '../actions/ModalActions';

import {
  UPLOAD_DONE,
  UPLOAD_PROGRESS,
  UPLOAD_FILE_SELECTED
} from '../actions/UploadActions';

//Define initial state
const INITIAL_STATE = {files: [], showModal: false, filesDeleted: false, message: ''};

//Reducer definitions for each action
export default function FilesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FILE_LIST:
      return { ...state, message: '', filesDeleted: false, showModal: false};
    case FILES_FETCHED:
      return { ...state, files: action.payload, message: null, filesDeleted: false, showModal: false, modalDisplayDone:false  };
    case FILES_DELETED:
      return { ...state, filesDeleted: true, showModal: false};
    case OPEN_UPLOAD_DIALOG:
      return { ...state, filesDeleted: false, showModal: true, modalDisplayDone:false};
    case CLOSE_UPLOAD_DIALOG:
      return { ...state, filesDeleted: false, showModal: false, modalDisplayDone:true};
    case UPLOAD_DONE:
      return { ...state, uploadProgress: false, fileListSelected: false};
    case UPLOAD_PROGRESS:
      return { ...state, uploadProgress: true};
    case UPLOAD_FILE_SELECTED:
      return {...state, fileListSelected: true};
    default:
      return state;
  }
}
