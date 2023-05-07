// Description
// In this example a note text posted to the webhook URL, and a note is to be created in RevCent for a customer using the customer email address. 
// The customer is found using the email via API customer > retrieve and a note is then added to the customer via API note > create.

// Trigger
// Webhook

// IP restriction is available

const request = global.request; // Accessing the "request" module from the global object

let webhook_body = JSON.parse(event.data); // event.data is always a string for webhook triggers.

// Example Webhook Body
// {
//     customer_email: "bob.jones@gmail.com",
//     note_text: "Bob called in to ask about his recent order."
// }

let customer_email = webhook_body.customer_email; // Retrieving the customer email from the webhook body
let note_text = webhook_body.note_text; // Retrieving the note text from the webhook body

let customer_id;

findCustomer();

function findCustomer() { 
    // First we must find the customer in RevCent to retrieve the customer_id

    // API Docs: https://revcent.com/docs/api#customer-retrieve

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
                "method": "retrieve",
                "email": customer_email // Searching for customer by email
            }
        }
    };

    request(options, function(error, response) {
        if (error) {
            callback(error);
        } else {
            if (typeof response?.body?.results?.[0]?.id !== 'undefined') { // Checking if customer ID is present in the retrieve results.
                customer_id = response.body.results[0].id; // Customer found, setting customer ID.
                createCustomerNote();
            } else {
                callback('Customer not found.');
            }
        }
    });
}


function createCustomerNote() { // We create the note in RevCent using the customer_id and note_text

    // API Docs: https://revcent.com/docs/api#note-create

    let options = {
        'method': 'POST',
        'url': 'https://api.revcent.com/v1',
        'headers': {
            'Content-Type': 'application/json',
            'x-api-key': process.env.revcent_api_key
        },
        'json': true,
        'body': {
            "request": {
                "type": "note",
                "method": "create",
                "item_type": "customer",
                "item_id": customer_id, // The customer_id we found
                "text": note_text // The notes' text from the webhook body
            }
        }
    };

    request(options, function(error, response) {
        if (error) {
            callback(error);
        } else {
            let revcent_note_id = response.body.note_id; // Note created.
            callback(null, revcent_note_id); // Don't forget the callback()
        }
    });
}
