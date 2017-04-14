var multer = require('multer');
var path = require('path');
var constants = require('./constants');
var FileListItem = require('../database/FileListOperations');


let upload;
/*Mutler is npm module used to get file usage details such as -
Filename, File type, file size after uploading*/
const Utils = {
  getMulter: function() {
    if (!upload) {
      let storage = multer.diskStorage({
        destination: path.join(__dirname, '..', constants.UPLOAD_FILE_DIR),
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        },
        onFileUploadComplete: function (file) {
          console.log('saving');
          // FileListItem.saveFileListItem(file);
       }
      });
      //Return Mutler instance
      return multer({storage: storage})
        .array(constants.UPLOAD_FILE_NAME, constants.UPLOAD_FILE_LIMIT);
    }
    return upload;
  }
};

//Module Export definition
module.exports = Utils;
