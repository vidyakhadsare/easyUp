import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/';

//Get file list from node server
export function fetchFiles() {
  let request = axios.get(`${ROOT_URL}files`);

//Dispatch actions to provide data to the front end
  return (dispatch) => {
    dispatch(fetchingFiles());
    return request.then((response) => {
      dispatch(filesFetched(response));
    });
  };
}

//Batch delete or single file delete
export function deleteFiles(fileIds) {
  let request;
  if (fileIds.length === 1) {
    //console.log("Fpath***" + filePaths[0]);
    //console.log("Actual path: " + {${ROOT_URL}files/${filePaths[0]});
    request = axios.delete(`${ROOT_URL}files/${fileIds[0]}`);
    
  } else {
    request = axios.post(`${ROOT_URL}files/batch`, {
      action: 'delete',
      fileIds: fileIds
    });
  }
  //Dispatch action to update file list at front end side
  return (dispatch) => {
    return request.then(() => {
      dispatch(filesDeleted());
    });
  };
}

//Action - fetch file in progress
function fetchingFiles() {
  return {
    type: FETCH_FILE_LIST
  }
}

//Action - fetch file done
function filesFetched(response) {
  return {
    type: FILES_FETCHED,
    payload: response.data
  }
}

//Action -  file deleted
function filesDeleted() {
  return {
    type: FILES_DELETED
  }
}

//Module Export definitions
export const FETCH_FILE_LIST = 'fetchFileList';
export const FILES_FETCHED = 'filesFetched';
export const FILES_DELETED = 'filesDeleted';
