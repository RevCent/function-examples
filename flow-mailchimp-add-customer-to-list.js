// Description
// In this example we want to add to or remove a customer from a Mailchimp list. Docs: https://mailchimp.com/developer/marketing/api/

// Trigger
// Flow

const client = global['mailchimp-marketing'];

let api_key = process.env.api_key; // process.env properties are environment variables you should have already created
let list_id = '12345'; // The list to add to or remove from.
let server_prefix = 'ABCDE'; // Your Mailchimp server prefix;

let customer_details = event.data.item_details; // event.data.item_details for Flow > Customer Lifecycle triggers are the customer details.

let customer_profile = {}; // Create the Mailchimp profile using the customer details.
customer_profile.email = customer_details.email;
customer_profile.status = 'subscribed'; // To remove, set as "unsubscribed"


client.setConfig({
    apiKey: api_key,
    server: server_prefix,
});


const run = async () => {
    const response = await client.lists.batchListMembers(list_id, {
        members: [customer_profile],
    });
    callback(null, response);
};

run();
