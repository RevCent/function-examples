// https://t.me/botfather
// create the bot. get the token. process.env.bot_token === new bot token
// open web.telegram in browser
// go to group
// right click on the group name on the left menu
// click 'inspect' button
// you will see the group id in the attribute data-peer-id="-xxxxxxxxxx" or peer="-xxxxxxxxxx"
// group chat id : -xxxxxxxxxx

// channel chat id : -100xxxxxxxxxx



let chat_id = -12345678;
let request = global.request;
request.post({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'chat_id=' + chat_id + '&text=messaging from RevCent function. Here are the AI results: ' + event.data.ai_request.ai_content.toString(),
    url: 'https://api.telegram.org/bot' + process.env.bot_token + '/sendMessage'
}, function(error, response, body) {
    callback(null, 'OK')
});
