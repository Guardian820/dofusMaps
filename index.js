const PythonShell = require('python-shell');
const fse = require('fs-extra');
const shell = require('shelljs');
const path = require('path');


if (process.argv.length <= 2) {
  console.log('Error: You didn\'t provide the dofus home dir path');
  console.log('Ex, Run this as: node ./index.js C:/Users/USERNAME/AppData/Local/Ankama/Dofus/');
  process.exit(1);
}

const dofusHomeDir = process.argv[2];
const dofusAppPath = path.join(dofusHomeDir, 'app');
const destD2pFiles = path.join(__dirname, 'input');
const destUnpackedD2pFiles = path.join(__dirname, 'output');
let d2pMapFiles;
let dofusD2pDir;

if (!fse.existsSync(dofusAppPath)) {
  console.log("Error: the path you provided it's not Dofus home");
  process.exit(1);
}

try {
  dofusD2pDir = path.join(dofusHomeDir, 'app', 'content', 'gfx', 'maps');
  d2pMapFiles = fse.readdirSync(dofusD2pDir)
    .filter(f => path.extname(f) === '.d2p');
} catch (err) {
  console.log(`Error reading ${dofusD2pDir}`);
  console.log(err);
  process.exit(1);
}

d2pMapFiles.forEach(d2pMapFile => {
  console.log(`Copying: ${path.join(dofusD2pDir, d2pMapFile)} to ${path.join(destD2pFiles, d2pMapFile)}`);
  fse.copySync(path.join(dofusD2pDir, d2pMapFile), path.join(destD2pFiles, d2pMapFile));
});

console.log('Now running the d2p unpacker, just wait... on a i5-2500 @ 3.30Ghz + SSD this can take a couple of minutes, when done you will see: "-> finished!"');
const pyshell = new PythonShell('./PyDofus/d2p_unpack.py');
pyshell.on('message', message => console.log(message));
pyshell.end(err => {
  if (err) throw err;
  console.log('-> finished!');

  const firstHalfOfTheMap = path.join(destUnpackedD2pFiles, 'worldmap0.d2p', '1', '1');
  const secondHalfOfTheMap = path.join(destUnpackedD2pFiles, 'worldmap0_1.d2p', '1', '1');
  fse.copySync(firstHalfOfTheMap, path.join(__dirname, 'maps'));
  fse.copySync(secondHalfOfTheMap, path.join(__dirname, 'maps'));


  let mapChunkImages = fse.readdirSync(path.join(__dirname, 'maps'))
    .filter(f => path.extname(f) === '.jpg')
    .map(f => parseInt(path.basename(f, '.jpg')), 10)
    .sort((a, b) => a < b ? -1 : 1)
    .map(f => `${f}.jpg`);

  try {
    fse.writeFileSync(path.join(__dirname, 'mapChunkList.txt'), mapChunkImages.join('\n'));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Now combining all the pieces in one big map, again just wait..., when done you will see: "-> finished!"');
  if (shell.exec(`cd maps && montage @../mapChunkList.txt -tile 40x -geometry +0+0 -strip -interlace Plane -quality 100 ../dofusMap.jpg`, (code, stdout, stderr) => {
    if (code !== 0) {
      console.log('Error coudn\'t combine the chunks.');
      console.log(stderr);
      shell.exit(1);
    } else {
      console.log('-> finished!');
      console.log(`Your map is at ${path.join(__dirname, 'dofusMap.jpg')}`);
    }
  }));
});
