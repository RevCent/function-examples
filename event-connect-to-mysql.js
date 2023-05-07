// Description
// In this example, when a new customer is created in RevCent, a record should be inserted into a remote MySQL database. 
// We use the customer.created event notation. 
// We get the customer information from the event.data.item_details object, connect to a remote MySQL database and insert a customer row.

// Trigger
// Account Event

// Event
// customer.created

// Item Type
// Customer

const mysql = global.mysql; // Accessing the "mysql" module from the global object
const customer_details = event.data.item_details; // Getting the customer details


// process.env properties are environment variables you should have already created
let connection_settings = {
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_db
};

let connection = mysql.createConnection(connection_settings);

connection.connect(); // Whitelist RevCent Functions IP: 52.3.146.218

function createCustomer(cb) {

    let query = `INSERT INTO customers(first_name, last_name, email) VALUES( ? , ? , ? )`;

    let customer_first_name = customer_details.first_name; // Retrieving customer info from the customer_details
    let customer_last_name = customer_details.last_name;
    let customer_email = customer_details.email;

    connection.query(query, [customer_first_name, customer_last_name, customer_email], (err, rows) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            cb(rows);
        }
    });
}

createCustomer(function(rows) {
    connection.end(); // You should always close a MySQL connection when done.
    callback(null, rows.insertId); // Don't forget the callback()
});
