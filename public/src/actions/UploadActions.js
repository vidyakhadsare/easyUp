import _ from 'lodash';

//Action -  upload files using multipart form data
export function uploadFiles(files) {
  let formData = _.reduce(
    files,
    function (formData, file) {
      formData.append("easyFiles", file);
      return formData;
    },
    new FormData()
  );

  return function (dispatch) {
    //Action -  upload files in progress
    dispatch(uploadProgress());

    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        //Action -  upload files in progress
        dispatch(uploadDone())
      }
    };
    let uri = "/files/upload";
    request.open("POST", uri, true);
    request.send(formData);
  }
}

//Action -  upload files in progress
function uploadProgress() {
  return {
    type: UPLOAD_PROGRESS
  }
}

//Action -  upload files done
function uploadDone() {
  return {
    type: UPLOAD_DONE
  }
}

//Action -  select file list to be uploaded
export function selectFileToUpload() {
  return {
    type: UPLOAD_FILE_SELECTED
  }
}

//Module Export definitions
export const UPLOAD_DONE ='uploadDone';
export const UPLOAD_PROGRESS ='uploadProgress';
export const UPLOAD_FILE_SELECTED = 'selectFileToUpload';
