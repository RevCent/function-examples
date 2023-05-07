// Description
// In this example, we want to update the inventory in the originating shopping cart for each product sold in a new sale. 
// The example shows how to update a WooCommerce store, however, this code can be adapted to update inventory at any third party that has an API.

// Trigger
// Account Event

// Event
// sale.created.success.paid

// Item Type
// Sale


const request = global.request; // Accessing the "request" module from the global object

let sale = event.data.item_details; // Sale via item_details

let ctr = 0;
for (let i = 0, len = sale.products_calculated.length; i < len; i++) { // Looping products_calculated array to process each sold product
    let store_product_id = sale.products_calculated[i].internal_id; // Store product ID is the internal_id property
    let product_sku = sale.products_calculated[i].sku; // You can also access the product sku
    let quantity_sold = sale.products_calculated[i].quantity;
    updateIndividualProduct(store_product_id, quantity_sold, function(err, res) {
        ctr++;
        if (ctr === sale.products_calculated.length) {
            callback(null, 'Updated product inventory'); // Loop finished. Ending function.
        }
    });
}


function updateIndividualProduct(product_id, quantity_sold, cb) { // Processing an individual product

    getCurrentQuantity();

    function getCurrentQuantity() { // Getting the current quantity in stock for the product

        // https://woocommerce.github.io/woocommerce-rest-api-docs/#retrieve-a-product

        let options = {
            method: 'GET',
            url: 'https://www.mystore.com/wp-json/wc/v3/products/' + product_id,
            auth: {
                user: 'username',
                pass: 'password'
            },
            json: true
        };

        request(options, function(error, response) {
            if (error) {
                cb(error);
            } else {
                let current_quantity = response.body.stock_quantity;
                let new_quantity = current_quantity - quantity_sold; // Calculating the new quantity
                updateNewQuantity(new_quantity);
            }
        });
    }

    function updateNewQuantity(new_quantity) { // Updating the products' inventory

        // https://woocommerce.github.io/woocommerce-rest-api-docs/#update-a-product

        let options = {
            method: 'PUT',
            url: 'https://www.mystore.com/wp-json/wc/v3/products/' + product_id,
            auth: {
                user: 'username',
                pass: 'password'
            },
            json: true,
            body: {
                stock_quantity: new_quantity
            }
        };

        request(options, function(error, response) {
            if (error) {
                cb(error);
            } else {
                cb(null, response);
            }
        });
    }
}
