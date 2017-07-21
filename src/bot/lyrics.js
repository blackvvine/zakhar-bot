'use strict';

const bot = require('../bot');

const lyrics = bot.getLyricsEngine();
const print = console.log;

function handle(msg, props) {
    
    let artist = props.match[1];
    let track = props.match[2];

    print(`artist=${artist} track=${track}`);

    lyrics.searchLyrics(artist, track, function(err, response) {
        if (err)
            msg.reply.text("Not found.");
        else
            msg.reply.text(response);
    });
}

module.exports = { handle };


