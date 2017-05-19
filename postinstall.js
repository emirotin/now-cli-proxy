var fs = require('fs');
var path = require('path');
var dir = path.join(__dirname, 'dist');
var file = path.join(dir, 'download.js');

try {
  fs.mkdirSync(dir);
} catch (error) {
  if (error.code !== 'EEXIST') {
    throw error;
  }
}

fs.closeSync(
  fs.openSync(file, 'a')
);

require(file);
