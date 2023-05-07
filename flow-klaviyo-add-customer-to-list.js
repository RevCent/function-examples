// Description
// In this example we want to add the specific flow customer to a Klaviyo list. Docs: https://developers.klaviyo.com/en/reference/api-overview

// Trigger
// Flow

// Flow Docs: https://kb.revcent.com/en/tools/flows

const request = global['request']; // Accessing the "request" module from the global object


let klayvio_api_key = process.env.klayvio_api_key; // process.env properties are environment variables you should have already created
let klayvio_list_id = '12345'; // The Klayvio list to add the customer to.


let customer_details = event.data.item_details; // event.data.item_details for Flow > Customer Lifecycle triggers are the customer details.

let customer_profile = {}; // Create the Klayvio profile using the customer details.
customer_profile.email = customer_details.email;
customer_profile.first_name = customer_details.first_name;
customer_profile.last_name = customer_details.last_name;
customer_profile.phone_number = customer_details.phone;
customer_profile.address1 = customer_details.address_line_1;
customer_profile.address2 = customer_details.address_line_2;
customer_profile.city = customer_details.city;
customer_profile.region = customer_details.state;
customer_profile.country = customer_details.country;
customer_profile.zip = customer_details.zip;

const options = {
    method: 'POST',
    url: 'https://a.klaviyo.com/api/v2/list/' + klayvio_list_id + '/subscribe?api_key=' + klayvio_api_key,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: {
        profiles: [
            customer_profile
        ]
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
