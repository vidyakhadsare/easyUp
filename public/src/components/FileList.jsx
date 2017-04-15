import React, {Component} from 'react';
import Table from './Table';
import ModalDialog from './ModalDialog';
import FileUploadContainer from '../containers/FileUploadContainer';
import _ from 'lodash';

const noDataText = 'No files found.';

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
// fieldValue is column value
// row is whole row object
// rowIdx is index of row
// colIdx is index of column
return 'try';

}

class FileList extends Component {

  //Define Column names of the FileList Table
  constructor(props) {
    super(props);
    this.selectedFiles = [];
    this.trClass = '';
  }

  /*columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  // fieldValue is column value
  // row is whole row object
  // rowIdx is index of row
  // colIdx is index of column
  //return rowIdx % 2 === 0 ? 'td-column-function-even-example' : 'td-column-function-odd-example';

  var self = this;
  _.each(this.props.files, function (fileInfo) {
    if (_.includes(row, fileInfo.fileName)) {
      //self.selectedFiles.push(fileInfo);
      return 'Rectangle';
    }
  });
}*/

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
    this.props.deleteFiles(fileIds);
  }

  onSelectRow = (row, isSelected) => {
    // add to selectedRow array if selected
        if (isSelected) {
            this.addSelectedFile(row);
            this.props.filesSelected();
            this.trClass = 'trClass-selected';
            console.log('row ' + {row});
        } else {
            // delete from selectedRow array if unselected
            this.removeSelectedFile(row);
            this.props.filesUnSelected();
            this.trClass = 'trClass-unselected';
        }
  }

  addSelectedFile(row){
    var self = this;
    _.each(this.props.files, function (fileInfo) {
      if (_.includes(row, fileInfo.fileName)) {
        self.selectedFiles.push(fileInfo);
      }
    });
  }

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

  downloadFiles = () => {
    this.props.downloadFiles(this.selectedFiles);
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
    console.log('class value:' + trClassName);
    //trClassName = "'" + trClassName + "'";
//'fileNameField'
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
        <div className="header-row">
          <p className='There-are-5-data-fil'>There are {numOfFiles} data files.</p>
          <div onClick={this.onModalOpen}>
            <span className="glyphicon glyphicon-plus-sign"></span>
          </div>
        </div>
        <span className="glyphicon glyphicon-download-alt" aria-hidden="false" onClick={this.downloadFiles}></span>
        <Table columns={columns}
               data={files}
               noDataText={noDataText}
               pagination={true}
               search={true}
               deleteRow={true}
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
  showModal: React.PropTypes.bool
};

//Module Export definitions
export default FileList;
