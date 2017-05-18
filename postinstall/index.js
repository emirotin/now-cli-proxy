import fetch from 'node-fetch';

(async function () {
  let resp = await fetch('https://now-cli-latest.zeit.sh/');
  if (resp.status !== 200) throw new Error(resp.statusText);
  const json = await resp.json();
  resp = await fetch(json.assets[2].url);
  console.log(resp.body);
}()).catch((error) => {
  console.error(error);
});
