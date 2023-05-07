// Description
// In this example we want to remove a customer from a Klaviyo list. Docs: https://developers.klaviyo.com/en/reference/api-overview

// Trigger
// Flow

const request = global['request']; // Accessing the "request" module from the global object


let klayvio_api_key = process.env.klayvio_api_key; // process.env properties are environment variables you should have already created
let klayvio_list_id = '12345'; // The Klayvio list to remove the customer from.

let customer_details = event.data.item_details; // event.data.item_details for Flow > Customer Lifecycle triggers are the customer details.


const options = {
    method: 'DELETE', // notice the method is DELETE
    url: 'https://a.klaviyo.com/api/v2/list/' + klayvio_list_id + '/members?api_key=' + klayvio_api_key,
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        emails: [customer_details.email]
    },
    json: true
};

request(options, function(error, response, body) {
    if (error) {
        callback(error);
    } else {
        let customer_klayvio_id = body[0].id; // Klayvio responds with their customers profile ID.
        callback(null, body);
    }
});
