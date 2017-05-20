import Progress from 'progress'
import assert from 'assert'

let bar

export function info (text) {
  console.log(`> ${text}`)
}

export function enableProgress (text) {
  assert(!bar)
  // text += ' '.repeat(28 - text.length);
  bar = new Progress(`> ${text} [:bar] :percent`, {
    stream: process.stdout,
    width: 20,
    complete: '=',
    incomplete: ' ',
    total: 100
  })
}

export function showProgress (percentage) {
  assert(bar)
  bar.update(percentage / 100)
}

export function disableProgress () {
  assert(bar)

  // it is auto-completed once it updates to 100
  // otherwise it outputs a blank line
  if (!bar.complete) {
    bar.update(1)
  }

  bar = undefined
}
