// Description
// In this example, a customer is sent a text message via Twilio after successfully completing a purchase. 
// We used the sale.created.success.paid Event notation. The event.data.item_details object contains the sale details. 
// The customer information is contained within the sale details, accessible via event.data.item_details.customer

// Trigger
// Account Event

// Event
// sale.created.success.paid

// Item Type
// Sale

// Twilio account must be in live status, not trial


const Twilio = global.twilio; // Accessing the "twilio" module from the global object

const sale_details = event.data.item_details; // Getting the sale details
const customer_details = event.data.item_details.customer; // Getting the customer details
const sale_amount = sale_details.amount_gross; // Get the amount paid for the sale via amount_gross property.

// process.env properties are environment variables you should have already created
let accountSid = process.env.twilio_account_sid;
let token = process.env.twilio_auth_token;
let from_number = process.env.twilio_from_number;


let to = customer_details.phone;

let twilio = new Twilio(accountSid, token);
twilio.messages.create({
    from: from_number,
    to: to,
    body: 'Thank you for your $' + sale_amount + ' purchase!'
}, function(err, result) {
    if (err) {
        console.log(err);
        callback(err);
    } else {
        callback(null, result.sid); // Don't forget the callback()
    }
});
