// Description
// An Auto Query is run and the results are sent to an AI Assistant. 
// The AI Assistant asks OpenAI: "Please provide an ASCII formatted table of the query results"
// The AI Assistant triggers a function, with the OpenAI response.
// The function sends a telegram message, the contents of the message consisting of the AI's response (an ASCII table)

// Trigger
// AI Assistant

// Auto Query Docs: https://kb.revcent.com/en/tools/auto-query
// AI Docs: https://kb.revcent.com/en/tools/ai

// TELEGRAM INSTRUCTIONS
// Go to https://t.me/botfather
// Create the bot. Get the token. Set process.env.bot_token = new bot token
// Open web.telegram in browser
// Go to the group you want to send messages to.
// Right click on the group name on the left menu
// Click 'inspect' button
// You will see the group id in the attribute data-peer-id="-xxxxxxxxxx" or peer="-xxxxxxxxxx"
// Chat id : -xxxxxxxxxx



let chat_id = -12345678; // From telegram instructions.
let bot_token = process.env.bot_token; // The bot token should be an environment variable.
let custom_arguments = event.data.custom_arguments; // Custom arguments from the AI Assistant
let request = global.request;
request.post({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'chat_id=' + chat_id + '&text=messaging from RevCent function. Here are the AI results: ' + custom_arguments.ascii_table,
    url: 'https://api.telegram.org/bot' + bot_token + '/sendMessage'
}, function(error, response, body) {
    callback(null, 'OK')
});
