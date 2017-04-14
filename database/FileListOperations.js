var FileListItem = require('./FileDBModel');
var _ = require('lodash');

//Save file list item in the database
var saveFileListItem = (file,callback) =>{
    //Create new schema instance
    var fileList = new FileListItem({
      fileName: file.name,
      fileType: file.type,
      updatedTime: file.updateTime,
      size: file.size,
      path:file.path
    });

    //Save file entry in the database
    fileList.save(function(err,data){
        callback(err,data);
    });
}

//Fetch file list from the database
var getFileList = function(req,res,next){
  //Fetch the file list from the database
    FileListItem.find({}, function(error, data){
      // console.log(data);
      // var files = [];
      // _.each(data, function(item) {
      //   files.push({
      //     fileName: item.fileName,
      //     fileType: item.fileType,
      //     updatedTime: item.updatedTime,
      //     size: item.size
      //   });
      // });
      res.json(data);
  });
}

//Delete single file  items from the database
var deleteFile = function(path,callback){
    FileListItem.remove({path:path}, function(err) {
      callback(err);
  });
}

//Batch delete items from the database
var batchDelete = function(req,res,next){
   var ids = req.body.fileIds;
   var error;
   //Remove all items in the array of FileIDs
   ids.forEach(function(id){       
       FileListItem.remove({ _id: id}, function(err) {
         if(err){
           error = err;
         }
       });
   });
   //Send success / error message
   if(!error) {
       res.send('success!');
   }
   else{
        res.send('err!');
   }
}

var getFilePath = function(fileID,callback){

  FileListItem.find({'_id' : fileID}, function(error, data){
    callback(error,data);
});

}
//Module Export definitions
module.exports.saveFileListItem = saveFileListItem;
module.exports.getFileList = getFileList;
module.exports.deleteFile = deleteFile;
module.exports.batchDelete = batchDelete;
module.exports.getFilePath = getFilePath;
