'use strict';

const ffmpeg = require('fluent-ffmpeg');

const youtube = 'rtmp://ovsu.mycdn.me/input/';
const stramkey = '4004618971925_2406873369109_p243ia67we'; // change this for you own stramkey 
const url = `http://hammertv.net:25461/hadrien/hadrien548/16589`; // we will bring the direct link of this video.

const createStream = async () => {

  try {
    await ffmpeg()
    .addOption("-i", url)
    .addOption("-c", "copy")
    .addOption("-f", "flv")
    .on("start", (commandLine) => {
      console.log("Query : ", commandLine);
    })
    .output(youtube + stramkey)
    .run();
  } catch (error) {
    await createStream();
  }

}
createStream();


