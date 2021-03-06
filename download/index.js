// Native
import fs from 'fs'
import path from 'path'

// Packages
import fetch from 'node-fetch'

// Utilities
import plusxSync from './chmod'
import { disableProgress, enableProgress, showProgress } from './log'

const target = path.join(__dirname, 'now.exe')
const partial = target + '.partial'
const packageJsonPath = path.join(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const nowVersion = packageJson.versionToDownload || packageJson.version

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
    platform: 'Windows',
    binary: 'now-win.exe'
  }
}

async function main() {
  if (process.platform !== 'win32') {
    fs.writeFileSync(
      target,
      '#!/usr/bin/env node\n' +
        'console.log("\'Now\' binary downloading was interrupted. Please reinstall!")\n'
    )
  }

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

    ws
      .on('close', () => {
        showProgress(100)
        disableProgress()
        resolve()
      })
      .on('error', error => {
        disableProgress()
        reject(error)
      })
  })

  fs.renameSync(partial, target)
  plusxSync(target)
}

main().catch(err => {
  console.error(err)

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(2)
})
