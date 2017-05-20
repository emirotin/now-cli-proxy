import { disableProgress, enableProgress, showProgress } from './log.js'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { plusx } from './chmod.js'

const target = 'now.exe'
const packageJson = path.join(__dirname, '../package.json')
const { version } = JSON.parse(fs.readFileSync(packageJson, 'utf8'))

const platformToName = {
  darwin: 'now-macos',
  linux: 'now-linux',
  win32: 'now-win.exe'
}

const names = {
  darwin: {
    platform: 'macOS',
    binary: 'now-macos'
  },
  linux: {
    platform: 'Linux',
    binary: 'now-linux'
  },
  win32: {
    platform: 'Window',
    binary: 'now-win.exe'
  }
}

async function main() {
  const nameDetails = names[process.platform]
  const url = `https://github.com/zeit/now-cli/releases/download/${version}/${nameDetails.binary}`

  const resp = await fetch(url)
  const size = resp.headers.get('content-length')
  const file = path.join(__dirname, target)
  const ws = fs.createWriteStream(file)

  enableProgress('Downloading `now` for ' + nameDetails.platform)
  showProgress(0)

  await new Promise((resolve, reject) => {
    let bytesRead = 0

    resp.body.on('data', chunk => {
      bytesRead += chunk.length
      showProgress(100 * bytesRead / size)
    })

    resp.body.pipe(ws)

    ws.on('close', () => {
      showProgress(100)
      disableProgress()
      resolve()
    }).on('error', error => {
      disableProgress()
      reject(error)
    })
  })

  await plusx(file)
}

main().catch(error => {
  console.error(error)
  process.exit(2)
})
