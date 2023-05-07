// Description
// In this example, a JSON post is sent to the function webhook URL. 
// The body is parsed and the gateways' transaction ID is used to create a chargeback in RevCent.

// Trigger
// Webhook


const request = global.request; // Accessing the "request" module from the global object

let webhook_body = JSON.parse(event.data); // event.data is always a string for webhook triggers.

// Example Webhook Body JSON
//  {
//     gateway_transaction_id: "abcdefg12345"
//  }

let gateway_transaction_id = webhook_body.gateway_transaction_id; // Retrieving the gateways' transaction ID to match with

createChargeback();

function createChargeback() {

    // API Docs: https://revcent.com/docs/api#chargeback-create

    let options = {
        'method': 'POST',
        'url': 'https://api.revcent.com/v1', // Making an API call to the RevCent API endpoint
        'headers': {
            'Content-Type': 'application/json',
            'x-api-key': process.env.revcent_api_key // "revcent_api_key" is an environment variable you should have already created
        },
        'json': true,
        'body': {
            "request": {
                "type": "chargeback",
                "method": "create",
                "gateway_transaction_id": gateway_transaction_id, // The gateways' transaction ID, used to find the associated transaction in RevCent.
                "void_transaction": true // If you want to simultaneously fully refund the associated transaction
            }
        }
    };

    request(options, function(error, response) {
        if (error) {
            callback(error);
        } else {
            let revcent_chargeback_id = response.body.chargeback_id;
            callback(null, revcent_chargeback_id); // Don't forget the callback()
        }
    });
}
