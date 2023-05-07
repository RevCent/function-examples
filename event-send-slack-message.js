// Description
// In this example, a Slack channel is notified after a successful purchase. 
// We used the sale.created.success.paid Event notation. The event.data.item_details object contains the sale details. 
// The customer information is contained within the sale details, accessible via event.data.item_details.customer

// Trigger
// Account Event

// Event
// sale.created.success.paid

// Item Type
// Sale

const {
    WebClient
} = global['@slack/web-api']; // Accessing the "@slack/web-api" module from the global object


const token = process.env.slack_token; // process.env properties are environment variables you should have already created

const web = new WebClient(token);

const conversation_id = 'CHANNELID'; // Can be a channel ID, a DM ID, a MPDM ID, or a group ID

(async () => {
    let message = 'New sale: ' + event.data.item_details.id + ' with customer: ' + event.data.item_details.customer.first_name;
    const res = await web.chat.postMessage({
        channel: conversation_id,
        text: message
    });
    console.log('Message sent: ', res);
    callback(null, res);
})();
