const config = require('../config');
const yt = require('youtube-dl');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const print = console.log;

function handle(msg, props) {
    
    const url = props.match[1];

    print("url=", url, "props=", props);

    const dir = config.videosDir + '/' + uuidv4() + '.mp4';

    if (!fs.existsSync(config.videosDir)){
        fs.mkdirSync(config.videosDir);
    }

    let video = yt(url);

    video.on('info', function(info) {

      console.log('Download started');
      console.log('filename: ' + info._filename);
      console.log('size: ' + info.size);

        msg.reply.text(`Video resolved.`);
        msg.reply.text(`Video name: ${info._filename}`);
        msg.reply.text(`Video size: ${info.size}`);
        
    });
    
    video.pipe(fs.createWriteStream(dir));

    video.on('end', function() {
          console.log('finished downloading!');
        msg.reply.text('Video retrieved, sending...');
        msg.reply.video(dir);
    });

}


//handle(null, [null, 'https://www.youtube.com/watch?v=7B4eG3Y3axw'])

module.exports = { handle };

