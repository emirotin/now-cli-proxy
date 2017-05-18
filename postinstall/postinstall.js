const fetch = require('node-fetch');

fetch('https://now-cli-latest.zeit.sh/').then(function (resp) {
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}).then(function (json) {
  console.log(json);
});
