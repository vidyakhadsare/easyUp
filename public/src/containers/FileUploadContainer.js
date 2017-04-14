import FileUpload from '../components/FileUpload';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  uploadFiles,
  selectFileToUpload
} from '../actions/UploadActions';

import {
  closeUploadDialog
} from '../actions/ModalActions';
//Map state to props
function mapStateToProps(state) {
  return {
    uploadProgress: state.files.uploadProgress,
    fileListSelected: state.files.fileListSelected,
    showModal: state.files.showModal
  };
}

//Map dispatch actions and bind creators to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {uploadFiles,selectFileToUpload,closeUploadDialog},
    dispatch
  );
}

//Connect module with Redux store
export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
