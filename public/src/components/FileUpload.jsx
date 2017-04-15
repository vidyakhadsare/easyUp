import React, { Component } from 'react';
import _ from 'lodash';

class FileUpload extends Component {

  constructor(props) {
    super(props);
    this.files = [];
  }

//Render File Upload dialog components -
//File List, button to select the file, DONE button, Close button
  render() {
    let disabled = this.props.uploadProgress;
    let filesUploaded = this.getUploadedFiles();

    return (
      <form className="upload-form">
        <div className="form-group form-title">
          <span className="span-heading">ADD NEW DATA FILE(S)</span>
        </div>
        <div className="form-group">
          <label className="lable-dialog" >
          <span className="glyphicon glyphicon-plus-sign" aria-hidden="false"></span>
          <input type="file"
                 name="easyFiles"
                 multiple
                 id="inputFile"
                 onChange={this.onFileSelect}
                 disabled={disabled}
                 style={{"display" : "none"}}
                 size="1"
          />
          </label>
        </div>
        <div className="form-group upload-files">
          {filesUploaded}
        </div>
        <div className="upload-footer">
          <button type="button"
                  disabled={disabled}
                  className="upload-form btn-upload"
                  onClick={this.uploadFiles}>
                  DONE
          </button>
        </div>
      </form>
    )
  }

//Function call to upload files
  uploadFiles = () => {
    if(this.files.length>0){
      console.log('Entered upload');
      this.props.uploadFiles(this.files);
      console.log("File to upload " , this.files , "individual " , this.files[0]);
      this.props.closeUploadDialog();
    }
    else {
      alert('Please select file to upload first!');
    }
    this.files = [];
  }

//Create a file list when files are selected for upload
  onFileSelect = (evt) => {
    var that = this;
    _.each(evt.target.files, function(file) {
      that.files.push(file);
    });
    this.forceUpdate();
    this.newFileSelection = true;
  }

//Remove selected item from the file list
  onFileRemove = (name) => {
    var filesArray = this.files;
    var index = this.files.indexOf(name);
    console.log('index' + index);
    this.files.splice(index, 1);
    this.forceUpdate();
  }

//Get the list of uploaded files ready to render
  getUploadedFiles() {
    var self = this;
    if (this.files.length > 0 && !this.props.uploadProgress) {
      let uploadedFileInfo = _.map(this.files, function (fileInfo) {
        return (
          <ul key={fileInfo.name} ref='listItem' value={fileInfo}>
            <li>
              <span className="glyphicon glyphicon-minus-sign" aria-hidden="false" onClick={self.onFileRemove.bind(self, fileInfo)}></span>
              <span className="span-filename">File Name</span><strong> {fileInfo.name}</strong>
            </li>
            <li>
              <span className="span-filetype">Type</span>
              <strong>{fileInfo.type}</strong>
            </li>
          </ul>
        );
      });

      return (
        <ul>
          {uploadedFileInfo}
        </ul>
      );
    }
    return '';
  }
}

//React default props definition for progress
FileUpload.defaultProps = {
  uploadProgress: false
};

//Manadate variables definition
FileUpload.propTypes = {
  uploadFiles: React.PropTypes.func.isRequired,
  uploadProgress: React.PropTypes.bool
};

//Module Export definitions
export default FileUpload;
