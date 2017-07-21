'use strict';

function handle(msg) {
    let { message } = msg
    console.log(`bot/text: received message ${message}`);
    console.log(msg);
}

module.exports = {
    handle: handle
}
