'use strict';

const wikia = require('lyric-get');


function searchLyrics(artist, track, callback) {
    wikia.get(artist, track, (err, res) => callback(err, res));
}


module.exports = { searchLyrics };


