import { disableProgress,
  enableProgress, info, showProgress } from './log.js';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { plusx } from './chmod.js';

const latest = 'https://now-cli-latest.zeit.sh/';
const platformToName = {
  darwin: 'now-macos',
  linux: 'now-linux'
};

async function main () {
  info(`Retrieving ${latest}...`);
  let resp = await fetch(latest);
  if (resp.status !== 200) throw new Error(resp.statusText);
  const json = await resp.json();
  const name = platformToName[process.platform];
  const asset = json.assets.filter((a) => a.name === name)[0];
  const { url } = asset;
  resp = await fetch(url);
  const size = resp.headers.get('content-length');
  const file = path.join(__dirname, 'now');
  const ws = fs.createWriteStream(file);

  const short = `Downloading '${name}'`;
  enableProgress(short);
  showProgress(0);
  await new Promise((resolve, reject) => {
    let bytesRead = 0;
    resp.body.on('data', (chunk) => {
      bytesRead += chunk.length;
      showProgress(100 * bytesRead / size);
    });
    resp.body.pipe(ws);
    ws.on('close', () => {
      showProgress(100);
      disableProgress();
      resolve();
    }).on('error', (error) => {
      disableProgress();
      reject(error);
    });
  });

  await plusx(file);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
