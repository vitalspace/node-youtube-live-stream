'use strict';

const ffmpeg = require('fluent-ffmpeg');
const youtubedl = require('youtube-dl-exec');

const youtube = 'rtmp://a.rtmp.youtube.com/live2/';
const stramkey = 'vvg9-d52m-y5c2-b15r-2ffm';
const video = `https://www.youtube.com/watch?v=XyZdq03PjfA`

const createStream = async () => {

  let url = {}

  const youtubeData = await youtubedl(video, {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: video
  });

  const data = await youtubeData;
  const formats = await data.formats;
  const urlM3u8 = formats[formats.length - 2];
  url = await urlM3u8.url;

  await ffmpeg()
    .addOption("-fflags", "+igndts")
    .addOption("-hide_banner")
    .addOption("-i", url)
    .addOption("-c", "copy")
    .addOption("-f", "flv")
    .on("start", (commandLine) => {
      console.log("Query : ", commandLine);
    })
    .on("error", (err) => {
      if(err) {
        //if there is an error it searches the transmission again and transmits again.
        createStream();
        console.log("Error: " + err.message);
      }
    })
    .output(youtube + stramkey)
    .run();
}
createStream();
