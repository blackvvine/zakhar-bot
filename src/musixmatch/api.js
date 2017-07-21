'use strict';

const request = require('request');
const config = require('./config');
const urlencode = require('urlencode');

const print = console.log;

function searchLyrics(artist, track, callback) {
    
    let url = `${config.rootUrl}/${config.methods.lyrics}?`;
    url += "q_track=" + urlencode(track);
    url += "&q_artist=" + urlencode(artist);
    url += "&apikey=" + config.key;

    print(`making request to ${url}`);

    request(url, function(error, response, body) {
        if (error) {
            print("musixmatch/api/searchLyrics: error= ", error);
            callback(error, null);
        } else {
            let data = JSON.parse(body);
            callback(error, data.message.body.lyrics.lyrics_body);
        }
    });

}


module.exports = { searchLyrics };

// searchLyrics("bohemian rhapsody", "queen", (a,b) => print(b));

