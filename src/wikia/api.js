'use strict';

const wikia = require('lyric-get');
const unescape = require('entities').decodeHTML;


function searchLyrics(artist, track, callback) {
    wikia.get(artist, track, (err, res) => callback(err, res ? unescape(res) : null));
}


module.exports = { searchLyrics };


