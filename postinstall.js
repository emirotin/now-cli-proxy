var fs = require('fs')
var path = require('path')
var dist = path.join(__dirname, 'dist')
var download = path.join(dist, 'download.js')

try {
  fs.mkdirSync(dist)
} catch (error) {
  if (error.code !== 'EEXIST') {
    throw error
  }
}

fs.closeSync(
  fs.openSync(download, 'a')
)

require(download)
