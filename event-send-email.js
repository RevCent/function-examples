// Description
// In this example, a customer is sent an email after successfully completing a purchase. 
// We used the sale.created.success.paid Event notation. The event.data.item_details object contains the sale details. 
// The customer information is contained within the sale details, accessible via event.data.item_details.customer

// Trigger
// Account Event

// Event
// sale.created.success.paid

// Item Type
// Sale


const nodemailer = global.nodemailer; // Accessing the "nodemailer" module from the global object

// SMTP options differ based on your SMTP provider
let transport_options = {
    host: 'smtp.server.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.smtp_user, // process.env properties are environment variables you should have already created
        pass: process.env.smtp_pass
    }
};

let transport = nodemailer.createTransport(transport_options);

let mail_options = {
    from: '"Store.com" <from@store.com>',
    to: event.data.item_details.customer.email, // Get the customer email via the customer object
    subject: 'Thank you for purchasing!',
    text: '',
    html: 'Your $' + event.data.item_details.amount_gross + ' purchase is confirmed!' // Get the amount paid for the sale via amount_gross property.
};

transport.sendMail(mail_options, function(err, info) {
    if (err) {
        callback(err);
    } else {
        callback(null, info.messageId); // Don't forget the callback()
    }
});
