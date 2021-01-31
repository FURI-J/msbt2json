'use strict';

const msbt2json = require('./index.js');

const fs = require('fs');
const path = require('path');

const readFiles = (dirPath, callback) => {
  fs.readdir(dirPath, {withFileTypes: true}, (err, dirents) => {
    if (err) {
      throw err;
    }

    for (const dirent of dirents) {
      const filePath = path.join(dirPath, dirent.name);
      if (dirent.isDirectory()) {
        readFiles(filePath, callback);
      } else if (path.extname(filePath).toLowerCase() === '.msbt') {
        callback(filePath);
      }
    }
  });
};

readFiles(process.argv[2], function(filePath) {
  msbt2json.convert(filePath);
});
