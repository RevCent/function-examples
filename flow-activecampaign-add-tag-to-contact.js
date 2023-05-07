// Description
// In this example we want to add a tag to a contact in ActiveCampaign. Docs: https://developers.activecampaign.com/reference/

// Trigger
// Flow

// Flow Docs: https://kb.revcent.com/en/tools/flows

const request = global['request'];

let active_campaign_api_token = process.env.active_campaign_api_token; // process.env properties are environment variables you should have already created
let active_campaign_account_name = '12345'; // Your ActiveCampaign account name


let customer_details = event.data.item_details; // event.data.item_details for Flow > Customer Lifecycle triggers are the customer details.

let existing_contact = {}; // Get the ActiveCampaign contact using the customer details.
existing_contact.email = customer_details.email;

let contact_id = null;

findContact();

function findContact() {
    // We first need to find the contact using the sync method, which will return the contact ID we need to add the tag.
    const options = {
        method: 'POST',
        url: 'https://' + active_campaign_account_name + '.api-us1.com/api/3/contact/sync',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Api-Token': active_campaign_api_token
        },
        body: existing_contact,
        json: true
    };

    request(options, function(error, response, body) {
        if (error) {
            callback(error);
        } else {
            if (typeof body?.contact?.id !== 'undefined' && !Number.isNaN(parseInt(body.contact.id))) {
                contact_id = parseInt(body.contact.id); // The contact ID needs to be converted to an integer.
                addTag();
            } else {
                callback(null, body);
            }
        }
    });
}



function addTag() {
    // Now that we have the contact ID, we can add the tag.

    let tag_id = 10; // The ActiveCampaign tag ID. Note: The tag ID should be an integer.

    const options = {
        method: 'POST',
        url: 'https://' + active_campaign_account_name + '.api-us1.com/api/3/contactTags',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Api-Token': active_campaign_api_token
        },
        body: {
            contactTag: {
                contact: contact_id,
                tag: tag_id
            }
        },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) {
            callback(error);
        } else {
            callback(null, body);
        }
    })
}
