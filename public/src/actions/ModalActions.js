
//Action - open upload dialog
export function openUploadDialog() {
  return {
    type: OPEN_UPLOAD_DIALOG
  }
}

//Action - close upload dialog
export function closeUploadDialog() {
  return {
    type: CLOSE_UPLOAD_DIALOG
  }
}

//Module Export definitions
export const OPEN_UPLOAD_DIALOG = 'openUploadDialog';
export const CLOSE_UPLOAD_DIALOG = 'closeUploadDialog';
