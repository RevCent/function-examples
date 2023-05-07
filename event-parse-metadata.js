// Description
// In this example, we want to notify an affiliate network of a sale for a specific affiliate ID. 
// We previously passed the affiliate ID as a metadata variable when creating the sale. 
// We use the Lodash module to find the affiliate ID within the sale metadata, and pass the sale amount and affiliate ID to the network.

// Trigger
// Account Event

// Event
// sale.created.success.paid

// Item Type
// Sale



const request = global.request; // Accessing the "request" module from the global object
const _ = global.lodash; // Accessing the "Lodash" module from the global object
const sale = event.data.item_details; // Getting the sale details


// Example sale.metadata 
//	[
//    {
//     "name": "affiliate_id",
//     "value": "12345"
//    }
//  ];

let affiliate_id = '';

let metadata_entry = _.find(sale.metadata, { // Using Lodash to find the metadata entry where "name" equals "affiliate_id" 
    'name': 'affiliate_id'
});

if (typeof metadata_entry?.value === 'string' && metadata_entry.value.length > 0) { // Verifying we found an affiliate_id value
    affiliate_id = metadata_entry.value; // Would be "12345" using Example sale.metadata
}


let options = {
    method: 'POST',
    url: 'https://affiliate.network.com/purchase-postback',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        amount: sale.amount_gross, // Retrieving amount from the sale.
        affiliate: affiliate_id
    })
};

request(options, function(error, response) { // Sending the remote request.
    if (error) {
        callback(error);
    } else {
        callback(null, response.body); // Don't forget the callback()
    }
});
