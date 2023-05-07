// Description
// In this example, a newsletter signup JSON object is posted to the function webhook URL. 
// A customer is created in RevCent, using the RevCent API, based on the webhook body contents.

// Trigger
// Webhook

const request = global.request; // Accessing the "request" module from the global object

let webhook_body = JSON.parse(event.data); // event.data is always a string for webhook triggers.

// Example Webhook Body
//  {
//     first_name: "Bob",
//     last_name: "Jones",
//     email: "bob.jones@gmail.com"
//  }


let first_name = webhook_body.first_name; // Retrieving the signup info from the webhook body
let last_name = webhook_body.last_name;
let email = webhook_body.email;

createCustomer();

function createCustomer() {

    // API Docs: https://revcent.com/docs/api#customer-create

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
                "type": "customer",
                "method": "create",
                "campaign": "Newsletter Signup",
                "customer": {
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email
                }
            }
        }
    };

    request(options, function(error, response) {
        if (error) {
            callback(error);
        } else {
            let revcent_customer_id = response.body.customer.id;
            callback(null, revcent_customer_id); // Don't forget the callback()
        }
    });
}
