// Description
// In this example we want to remove a tag from a contact in ActiveCampaign. Docs: https://developers.activecampaign.com/reference/

// Trigger
// Flow


const request = global['request'];
const _ = global['lodash'];

let active_campaign_api_token = process.env.active_campaign_api_token; // process.env properties are environment variables you should have already created
let active_campaign_account_name = '12345'; // Your ActiveCampaign account name


let customer_details = event.data.item_details; // event.data.item_details for Flow > Customer Lifecycle triggers are the customer details.

let contact_id = null;
let tag_id = 10; // The ActiveCampaign tag ID that we want to remove from the contact.


findContact();

function findContact() {
    // We first need to find the contact using the sync method, which will return the contact ID we need to in order to remove the tag.
    const options = {
        method: 'POST',
        url: 'https://' + active_campaign_account_name + '.api-us1.com/api/3/contact/sync',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Api-Token': active_campaign_api_token
        },
        body: {
            email: customer_details.email
        },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) {
            callback(error);
        } else {
            if (typeof body?.contact?.id !== 'undefined') {
                contact_id = body.contact.id;
                getTagAssociation();
            } else {
                callback(null, body);
            }
        }
    });
}



function getTagAssociation() {
    // Now that we have the contact ID, we need to find the tag association ID, using the contact ID and tag ID.

    const options = {
        method: 'GET',
        url: 'https://' + active_campaign_account_name + '.api-us1.com/api/3/' + contact_id + '/contactTags',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Api-Token': active_campaign_api_token
        },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) {
            callback(error);
        } else {
            let tag_association = _.find(body.contactTags, { // Searching the returned contacts' tags to find the association ID.
                'tag': tag_id.toString()
            });
            if (typeof tag_association?.id !== 'undefined') {
                let tag_association_id = tag_association.id;
                removeTagAssociation(tag_association_id);
            } else {
                callback(null, body);
            }
        }
    })
}


function removeTagAssociation(tag_association_id) {
    // Now that we have the contact ID and the tag association ID, we can remove the tag from the contact.
    const options = {
        method: 'DELETE',
        url: 'https://' + active_campaign_account_name + '.api-us1.com/api/3/contactTags/' + tag_association_id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Api-Token': active_campaign_api_token
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
