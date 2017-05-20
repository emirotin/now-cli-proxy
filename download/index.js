import { disableProgress, enableProgress, showProgress } from './log.js'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { plusxSync } from './chmod.js'

const target = path.join(__dirname, 'now.exe')
const partial = target + '.partial'
const packageJsonPath = path.join(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const nowVersion = packageJson.versionOverride || packageJson.version

const details = {
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

async function main () {
  const { binary, platform } = details[process.platform]
  const url = `https://github.com/zeit/now-cli/releases/download/${nowVersion}/${binary}`

  enableProgress('Downloading `now` for ' + platform)
  showProgress(0)

  const resp = await fetch(url)
  const size = resp.headers.get('content-length')
  const ws = fs.createWriteStream(partial)

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

  fs.renameSync(partial, target)
  plusxSync(target)
}

main().catch(error => {
  console.error(error)
  process.exit(2)
})
