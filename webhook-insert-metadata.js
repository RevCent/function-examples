// Description
// In this example we want to insert additional metadata to a sale after the sale was created. 
// A webhook POST is sent by a company called "SaleMonitorService", and the webhook body contains the RevCent sale ID as well as their own sale ID. 
// We want to attach the "SaleMonitorService" ID to the related RevCent sale.

// Trigger
// Webhook

const request = global.request; // Accessing the "request" module from the global object

let webhook_body = JSON.parse(event.data); // event.data is always a string for webhook triggers.

// Example Webhook Body
// {
//     revcent_sale_id: "5r6aooYylZFvoGvKm9z5",
//     service: "SaleMonitorService"
//     order_id: "123456"
// }


let metadata_object_to_insert = { // Creating the metadata object we are inserting
    'name': webhook_body.service, // Retrieving the "service" property from the webhook body to use at the metadata name
    'value': webhook_body.order_id // Retrieving the "order_id" property from the webhook body to use as the metadata value
};

// Metadata object printed
// {
//     name: "SaleMonitorService"
//     value: "123456"
// }


// API Docs: https://revcent.com/docs/api#metadata-insert

let options = {
    'method': 'POST',
    'url': 'https://api.revcent.com/v1',
    'headers': {
        'Content-Type': 'application/json',
        'x-api-key': process.env.revcent_api_key // "revcent_api_key" is an environment variable you should have already created
    },
    'json': true,
    'body': {
        "request": {
            "type": "metadata",
            "method": "insert",
            "item_type": "sale", // We are inserting the metadata to a sale
            "item_id": webhook_body.revcent_sale_id, // Using the RevCent sale ID from the webhook body for attaching the metadata to
            "metadata": [metadata_object_to_insert] // The metadata is an array, allowing for multiple metadata insertions in one call
        }
    }
};

request(options, function(error, response) {
    if (error) {
        callback(error);
    } else {
        callback(null, response); // Don't forget the callback()
    }
});
