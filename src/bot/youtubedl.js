const config = require('../config');
const yt = require('youtube-dl');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const { spawn } = require('child_process')

const print = console.log;

function handle(msg, props) {

    const url = props.match[1];

    print("url=", url, "props=", props);

    const uuid = uuidv4();
    const prefix = uuid + '_';
    const dir = config.videosDir + '/' + uuid + '.mp4';


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
	    msg.reply.text('Video retrieved, splitting...');
	    split = spawn("MP4Box", ["-splits", "20000", dir, "-out", config.videosDir+"/"], {cwd: config.videosDir})
	    split.stderr.pipe(process.stderr);
	    split.on("exit", function(code){
		    console.log("split code " + code);
		    fs.unlinkSync(dir, (err) => console.log("remove " + err));
		    fs.readdir(config.videosDir, function(err, items){
			    console.log("prefix=" + prefix)
			    let i = 0;
			    items.sort().forEach((t) => {
					console.log(t);
					if (t.startsWith(prefix)) {	
					    i += 1;
					    console.log("sending ", t);
					    msg.reply.text("Sending part " + i);
					    msg.reply.video(config.videosDir + "/" + t);
					    setTimeout(() => {
					    	fs.unlinkSync(config.videosDir + "/" + t, (err) => console.log("remove " + err));
					    }, 10 * 60 * 1000)
					}
				    })
			    })
		    })
	    // msg.reply.video(dir);
	    });

}


function run() {
    props = Object()
	props.match = [0, 'https://www.youtube.com/watch?v=7B4eG3Y3axw']
	handle(null, props)
}

module.exports = { handle };

