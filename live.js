'use strict';

const ffmpeg = require('fluent-ffmpeg');

const youtube = '';
const stramkey = ''; // change this for you own stramkey 
const video = `` // we will bring the direct link of this video.

const createStream = async () => {

  await ffmpeg()

    .addOption("-i", url)
    .addOption("-c", "copy")
    .addOption("-f", "flv")
    .on("start", (commandLine) => {
      console.log("Query : ", commandLine);
    })
    .on("error", async (err) => {
      if (err) {
        await createStream();
        console.log("Error: " + err.message);
      }
    })
    .output(youtube + stramkey)
    .run();
}
createStream();

