'use strict';


function handle(msg, props) {
    console.log("bot/echo/handle: called.");
    console.log("var msg:", msg);
    console.log("var props:", props);
    msg.reply.text(props.match[1]);
}


module.exports = { handle };

