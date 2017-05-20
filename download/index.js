import { disableProgress, enableProgress, info, showProgress } from './log.js'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { plusx } from './chmod.js'

const target = 'now.exe'
const packageJson = path.join(__dirname, '../package.json')
const { version } = JSON.parse(fs.readFileSync(packageJson, 'utf8'))
const github = `https://api.github.com/repos/zeit/now-cli/releases/tags/${version}`

const platformToName = {
  darwin: 'now-macos',
  linux: 'now-linux',
  win32: 'now-win.exe'
}

async function main () {
  info('Retrieving the list of releases')
  let resp = await fetch(github)

  if (resp.status !== 200) throw new Error(resp.statusText + ' ' + github)

  const json = await resp.json()
  const name = platformToName[process.platform]
  const asset = json.assets.filter((a) => a.name === name)[0]

  const { browser_download_url } = asset
  info(browser_download_url)

  resp = await fetch(browser_download_url)

  const size = resp.headers.get('content-length')
  const file = path.join(__dirname, target)
  const ws = fs.createWriteStream(file)

  enableProgress(`Downloading '${name}'`)
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
