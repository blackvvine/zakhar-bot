#!/usr/bin/env node

"use strict";

if (!process.env.ZAKHARBOT_TOKEN) {
    console.log("ZakharBot token not set");
    process.exit(1);
} else {
    console.log("token=", process.env.ZAKHARBOT_TOKEN);
}

const config = require('./config.js');
const echoResponse = require('./bot/echo.js');
const lyricsResponse = require('./bot/lyrics.js');
const ytdlResponse = require('./bot/youtubedl.js');
const TeleBot = require('telebot');

const bot = new TeleBot(config);

bot.on(/^\/echo\s+(.+)/, (msg, props) => echoResponse.handle(msg, props));
bot.on(/^\/lyrics\s+(.+)\s*-\s*(.+)\s*/, (msg, props) => lyricsResponse.handle(msg, props));
bot.on(/^\/ytdl\s+(.+)/, (msg, props) => ytdlResponse.handle(msg, props));

bot.start();

