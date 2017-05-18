const fetch = require('node-fetch');

fetch('https://now-cli-latest.zeit.sh/').then((resp) => {
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}).then((json) => {
  console.log(json);
});
