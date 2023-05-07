// Description
// In this example, we want to retrieve the status of any subscription when sending a GET request to the function URL. 
// The request to the function URL has the "subscription_id" URL param appended, example: https://functions.revcent.com/[URL_UUID]?subscription_id=[SUB_ID]. 
// The function parses the URL param "subscription_id", retrieves the subscription via RevCent\'s API and returns the subscription status.

// Trigger
// Function Url

// Function URL Request: GET https://functions.revcent.com/[URL_UUID]?subscription_id=[SUB_ID]

const request = global.request; // Accessing the "request" module from the global object

if (typeof context?.source?.url_params?.subscription_id === 'string' && context.source.url_params.subscription_id.length > 0) {
    findSubscription();
} else {
    callback(null, 'No subscription ID in URL.');
}

function findSubscription() {

    // API Docs: https://revcent.com/docs/api#subscription-retrieve

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
                "type": "subscription",
                "method": "retrieve",
                "id": context.source.url_params.subscription_id // Searching for the subscription using the URL param "subscription_id"
            }
        }
    };

    request(options, function(error, response) {
        if (error) {
            callback(error);
        } else {
            if (typeof response?.body?.results?.[0]?.status !== 'undefined') { // Checking if subscription status exists.
                callback(null, response?.body?.results?.[0].status); // Returning the subscription status.
            } else {
                callback(null, 'Subscription not found.');
            }
        }
    });
}
