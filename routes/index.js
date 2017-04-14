var express = require('express');
var logger = require('../utils/logger');
var constants = require('../utils/constants');
var utils = require('../utils/utils');
var path = require('path');
var fs = require('fs');
var util = require('util');
var _ = require('lodash');
var FileList = require('../database/FileListOperations');
// var JSON = require('json');

var router = express.Router();
var upload = utils.getMulter();

//*********************  Node js routing ***************************/
//File upload route
router.post('/files/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      logger.l.log(logger.LEVEL.ERROR, 'Upload failed', err);
      res.status(500).send();
    }
    logger.l.log(logger.LEVEL.INFO, 'Upload succeeded');
    var error;
    var filesInfo = [];

    //If file upload is scuccessful, save it in the DB
    _.each(req.files, function(file) {
      fileStat = fs.statSync(file.path);
      console.log("File path:" + file.path);
      var info = {
        name: file.originalname,
        size: (file.size / 1048576).toFixed(5),
        type: file.mimetype,
        updateTime: fileStat.mtime.getTime(),
        path: file.path
      };
      //Call save function to save file entry in DB
      FileList.saveFileListItem(info,function(err,data){
        error = err;
      });
    });
    if(error){
      res.send(err);
    }
    else {
      res.status(200).send(filesInfo);
    }
  });
});

//Get File List route
router.get('/files',FileList.getFileList);

//Delete Single File route
router.delete('/files/:id',function(req,res){
  var error;
  deleteFile(req.params.id,function(error){
      error = error;
  });
  if(error){
    res.send(error);
  }
  else {
    res.status(200).send('delete scuccessful');
  }
});

//Batch Delete route
router.post('/files/batch',function(req,res){
  var fileIDs = req.body.fileIds;
  var error;
  fileIDs.forEach(function(fileID){
      deleteFile(fileID,function(error){
          error = error;
      });
  });
  if(error){
    res.send(error);
  }
  else {
    res.status(200).send('delete scuccessful');
  }
});

function deleteFile(fileID,callback){
  var file;
  var error;
  FileList.getFilePath(fileID,function(err,data){
    console.log("Data came:" + data);
    if(err){
      error = err;
    }
    else {
      file = data && data.length > 0 && data[0];
      console.log("Path came:" + file.path);
      if(file.path){
        console.log("Unlink came:");
        fs.unlink(file.path,function(err){
          if(err) {
            error = err;
          }
        });
        FileList.deleteFile(file.path,function(err){
          console.log("Delete came:");
          if(err){
            error = err;
          }
        });
      }
    }
  });
  callback(error);
}

router.all(function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

//Module Export definition
module.exports = router;