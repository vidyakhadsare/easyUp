import FileList from '../components/FileList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchFiles,
  deleteFiles,
  filesSelected,
  filesUnSelected,
  downloadFiles
} from '../actions/FileActions';

import {
  openUploadDialog,
  closeUploadDialog
} from '../actions/ModalActions';

//Map state to props
function mapStateToProps(state) {
  return {
    files: state.files.files,
    message: state.files.message,
    showModal: state.files.showModal,
    filesDeleted: state.files.filesDeleted,
    modalDisplayDone: state.files.modalDisplayDone,
    fileSelectionDone: state.files.fileSelectionDone,
    filesDownloadDone: state.files.filesDownloadDone
  };
}

//Map dispatch actions and bind creators to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchFiles, deleteFiles, openUploadDialog,
      closeUploadDialog, downloadFiles, filesSelected, filesUnSelected},
    dispatch
  );
}

//Connect module with Redux store
export default connect(mapStateToProps, mapDispatchToProps)(FileList);
