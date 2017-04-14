import React, {Component} from 'react';
import Table from './Table';
import ModalDialog from './ModalDialog';
import AutoSuggest from './AutoSuggest';
import FileUploadContainer from '../containers/FileUploadContainer';
import _ from 'lodash';

const noDataText = 'No files found.';

//Define Column names of the FileList Table
const columns = [
  {title: 'File Name', isKey: true, sort: true, field: 'fileName'},
  {title: 'Type', sort: true, field: 'fileType'},
  {title: 'Size(MB)', sort: true, field: 'size'},
  {title: 'Updated Time', sort: true, field: 'updatedTime'}
];

class FileList extends Component {

  //Fetch file list once application loading is done
  componentDidMount() {
    this.props.fetchFiles();
  }

  //Show new file list again when files are deleted
  componentDidUpdate() {
    if (this.props.filesDeleted || this.props.modalDisplayDone) {
      this.props.fetchFiles();
    }
  }

//Collect row ids to be deleted
  onDeleteRow = (rows) => {
    let fileIds = [];
    _.each(this.props.files, function (fileInfo) {
      if (_.includes(rows, fileInfo.fileName)) {
        fileIds.push(fileInfo._id);
      }
    });
    //console.log("File path UI" + filePaths);
    this.props.deleteFiles(fileIds);
  }

  //Show elements inside modal when it opens
  onModalOpen = () => {
    this.props.openUploadDialog();
  }

  //Perform close
  onModalClose = () => {
    this.props.closeUploadDialog();
  }

  onSearch = (event, suggestion, suggestionValue) => {
    console.log(suggestion, suggestionValue);
  }

  //Render FileList table on the screen
  render() {
    let files = this.props.files;

    const numOfFiles = files.length;
    const message = this.props.message ? (<p>{this.props.message}</p>) : '';

    let modalContent = '';
    if (this.props.showModal) {
      modalContent = (<FileUploadContainer/>);
    }

    return (
      <div>
        {message}
        <div className="header-row">
          <p>There are {numOfFiles} data files.</p>
          <div onClick={this.onModalOpen}>
            <span className="glyphicon glyphicon-plus-sign"></span>
          </div>
        </div>

        <AutoSuggest files={files} onSuggestionSelected={this.onSearch}/>
        <Table columns={columns}
               data={files}
               noDataText={noDataText}
               pagination={true}
               search={true}
               deleteRow={true}
               onDeleteRow={this.onDeleteRow}
        />
        <ModalDialog show={this.props.showModal} onModalClose={this.onModalClose}>
          {modalContent}
        </ModalDialog>
      </div>
    );
  }
}

//Manadate variables definition
FileList.propTypes = {
  fetchFiles: React.PropTypes.func.isRequired,
  deleteFiles: React.PropTypes.func.isRequired,
  openUploadDialog: React.PropTypes.func.isRequired,
  files: React.PropTypes.array.isRequired,
  message: React.PropTypes.string,
  filesDeleted: React.PropTypes.bool,
  showModal: React.PropTypes.bool
};

//Module Export definitions
export default FileList;
