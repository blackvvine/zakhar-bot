'use strict';

const config = require('./config');
const musixmatch = require('./musixmatch/api');
const wikia = require('./wikia/api');

function getLyricsEngine() {
    switch (config.lyricsEngine) {
        case 'wikia':
            return wikia;
        case 'musixmatch':
            return musixmatch;
        default:
            throw Error(`Unknown engine: ${config.lyricsEngine}`);
    }
}

module.exports = { getLyricsEngine };


