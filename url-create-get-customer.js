// Description
// In this example, a two step checkout process collects basic user information for creating prospects before continuing to checkout. 
// We want to use the URL trigger to immediately receive a RevCent customer ID in a POST response. 
// When the visitor submits their basic information a new customer is created in RevCent if they do not exist, or retrieved if already exists.
// The RevCent customer information including RevCent customer ID is returned.

// Trigger
// Function Url


// Function URL Request: POST https://functions.revcent.com/[FUNCTION_URL_UUID]
// IP restriction is available

// Example URL POST Body
//  {
//     first_name: "Bob",
//     last_name: "Jones",
//     email: "bob.jones@gmail.com"
//  }

const request = global.request; // Accessing the "request" module from the global object

let post_body = JSON.parse(event.data); // event.data is always a string for POST URL triggers.

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
                "campaign": "Two Step Checkout",
                "customer": {
                    "first_name": post_body.first_name,
                    "last_name": post_body.last_name,
                    "email": post_body.email
                }
            }
        }
    };

    request(options, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body.customer); // Returning the customer object
        }
    });
}
