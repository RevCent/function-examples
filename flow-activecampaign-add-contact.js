// Description
// In this example we want to add an ActiveCampaign contact. Docs: https://developers.activecampaign.com/reference/

// Trigger
// Flow

// Flow Docs: https://kb.revcent.com/en/tools/flows

const request = global['request'];

let active_campaign_api_token = process.env.active_campaign_api_token; // process.env properties are environment variables you should have already created
let active_campaign_account_name = '12345'; // Your ActiveCampaign account name


let customer_details = event.data.item_details; // event.data.item_details for Flow > Customer Lifecycle triggers are the customer details.

let new_contact = {}; // Create the ActiveCampaign contact using the customer details.
new_contact.email = customer_details.email;
new_contact.firstName = customer_details.first_name;
new_contact.lastName = customer_details.last_name;
new_contact.phone = customer_details.phone;



const options = {
    method: 'POST',
    url: 'https://' + active_campaign_account_name + '.api-us1.com/api/3/contact/sync',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Api-Token': active_campaign_api_token
    },
    body: new_contact,
    json: true
};

request(options, function(error, response, body) {
    if (error) {
        callback(error);
    } else {
        callback(null, body);
    }
});
