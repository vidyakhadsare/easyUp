import React, {Component} from 'react';
import Table from './Table';
import ModalDialog from './ModalDialog';
import FileUploadContainer from '../containers/FileUploadContainer';
import _ from 'lodash';

const noDataText = 'No files found.';

class FileList extends Component {

  //Define Column names of the FileList Table
  constructor(props) {
    super(props);
    this.selectedFiles = [];
    this.trClass = '';
  }
  
  //Fetch file list once application loading is done
  componentDidMount() {
    this.props.fetchFiles();
  }

  //Show new file list again when files are deleted
  componentDidUpdate() {
    if (this.props.filesDeleted || this.props.modalDisplayDone) {
      this.props.fetchFiles();
      console.log('fected after delete');
      this.selectedFiles = [];
    }
    if(this.props.filesDownloadDone === true){
      alert('Files are downloaded successfully in downloaded_Files folder!');
    }
  }

  //Collect row ids to be deleted
  onDeleteRow = () => {
    var fileList = this.selectedFiles;
    let fileIds = [];
    _.each(this.selectedFiles, function (fileInfo) {
      fileIds.push(fileInfo._id);
    });
    this.props.deleteFiles(fileIds);
  }

  //create selected file list on row selection
  onSelectRow = (row, isSelected, e) => {
    // add to selectedRow array if selected
    let parentRow = e.target.parentElement.parentElement;
    if (isSelected) {
      parentRow.classList.add('selectedRow');
      this.addSelectedFile(row);
      this.props.filesSelected();
    } else {
      parentRow.classList.remove('selectedRow');
      // delete from selectedRow array if unselected
      this.removeSelectedFile(row);
      this.props.filesUnSelected();
    }
  }

  //Add file to selected file list on row selection
  addSelectedFile(row){
    var self = this;
    _.each(this.props.files, function (fileInfo) {
      if (_.includes(row, fileInfo.fileName)) {
        self.selectedFiles.push(fileInfo);
      }
    });
  }

  //Remove file from selected file list on row selection
  removeSelectedFile(row){
    var self = this;
    var index;
    _.each(this.selectedFiles, function (fileInfo) {
      if (_.includes(row, fileInfo.fileName)) {
        index = self.selectedFiles.indexOf(fileInfo);
      }
    });
    if(index){
      self.selectedFiles.splice(index, 1);
    }
  }

  //Download Files
  downloadFiles = () => {
    if(this.selectedFiles.length > 0){
      this.props.downloadFiles(this.selectedFiles);
    }
    else {
      alert('Please select files first!');
    }
  }

  //Show elements inside modal when it opens
  onModalOpen = () => {
    this.props.openUploadDialog();
  }

  //Perform close
  onModalClose = () => {
    this.props.closeUploadDialog();
  }

  //Render FileList table on the screen
  render() {


    var trClassName = this.trClass;
    trClassName = '';
    var columns = [
      {title: 'FILE NAME', isKey: true, sort: true, field: 'fileName',
        className:'Name', columnClassName:'fileNameField'},
        {title: 'TYPE', sort: true, field: 'fileType', columnClassName:'CSV', className:'Name'},
        {title: 'SIZE(MB)', sort: true, field: 'size', columnClassName:'-KB', className:'Name'},
        {title: 'UPLOAD DATE', sort: true, field: 'updatedTime', columnClassName:'layer', className:'Name'}
      ];

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
          <p className='There-are-5-data-fil' >There are {numOfFiles} data files.</p>
          <div className="header-row flex-container">
            <img src="../../images/add-button.svg" className=".Add-Button flex-item " onClick={this.onModalOpen}></img>
            <img src="../../images/download-font-awesome.png" className="Download---FontAwesome flex-item"  onClick={this.downloadFiles}></img>
            <img src="../../images/delete-font-awesome.png" className="Delete---FontAwesome flex-item" onClick={this.onDeleteRow}></img>
          </div>
          <Table columns={columns}
            data={files}
            noDataText={noDataText}
            pagination={true}
            search={true}
            deleteRow={false}
            onDeleteRow={this.onDeleteRow}
            onRowSelect={this.onSelectRow}
            trClass={this.trClass}
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
    showModal: React.PropTypes.bool,
  };

  //Module Export definitions
  export default FileList;
