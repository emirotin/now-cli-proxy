var fs = require('fs')
var path = require('path')
var dist = path.join(__dirname, 'dist')
var now = path.join(dist, 'now.exe')

fs.writeFileSync(now,
  '#!/usr/bin/env node\n' +
  'console.log("\'Now\' binary downloading was interrupted. Please reinstall!")\n'
)
