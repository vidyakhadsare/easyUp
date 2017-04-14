var winston = require('winston');
var path = require('path');

//Create a logger using winston library to keep a track of required actions
const log_file = path.join(__dirname, '..', 'logs', 'debug.log');
const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.File)({ filename: log_file })
  ]
});

//Module Export definitions
module.exports = {
  LEVEL: {
    ERROR: 'error',
    DEBUG: 'debug',
    INFO: 'info'
  },
  l: logger
};
