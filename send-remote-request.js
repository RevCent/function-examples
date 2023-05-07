// Description
// In this example, a remote request is made to an endpoint when a refund is issued. 
// We use the pending_refund.created event notation. 
// We get the refund information from the event.data.item_details object. 
// Using the request module to send a POST request to an external URL with information related to the refund.

// Trigger
// Account Event

// Event
// pending_refund.created

// Item Type
// Pending Refund


const request = global.request; // Accessing the "request" module from the global object
const pending_refund = event.data.item_details; // Getting the pending refund details

let options = {
    method: 'POST',
    url: 'https:/endpoint.com',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        amount: pending_refund.amount, // Retrieving info from the pending_refund.
        customer: pending_refund.customer,
        refund_id: pending_refund.id
    })
};

request(options, function(error, response) { // Sending the remote request.
    if (error) {
        callback(error);
    } else {
        callback(null, response.body); // Don't forget the callback()
    }
});
