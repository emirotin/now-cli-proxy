import fs from 'fs';

function stat (file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (error, stats) => {
      if (error) return reject(error);
      resolve(stats);
    });
  });
}

function chmod (file, mode) {
  return new Promise((resolve, reject) => {
    fs.chmod(file, mode, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

export async function plusx (file) {
  const s = await stat(file);
  const newMode = s.mode | 64 | 8 | 1;
  if (s.mode === newMode) return;
  const base8 = newMode.toString(8).slice(-3);
  await chmod(file, base8);
}
