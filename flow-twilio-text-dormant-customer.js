// Description
// In this example we want to send a dormant customer a coupon code in order to entice them back.
// You would set up the flow to trigger when a customer enters a customer group with 180 days since last sale setting.

// Trigger
// Flow

// Flow Docs: https://kb.revcent.com/en/tools/flows

// Twilio account must be in live status, not trial

const Twilio = global.twilio; // Accessing the "twilio" module from the global object

const customer_details = event.data.item_details; // event.data.item_details for Flow > Customer Lifecycle triggers are the customer details.


// process.env properties are environment variables you should have already created
let accountSid = process.env.twilio_account_sid;
let token = process.env.twilio_auth_token;
let from_number = process.env.twilio_from_number;


let twilio = new Twilio(accountSid, token);
twilio.messages.create({
    from: from_number,
    to: customer_details.phone,
    body: 'Hey ' + customer_details.first_name + ', please come back to MyStore. Use the coupon code "COMEBACKNOW" at www.mystore.com and save 20% on your next order!'
}, function(err, result) {
    if (err) {
        console.log(err);
        callback(err);
    } else {
        callback(null, result.sid); // Don't forget the callback()
    }
});
