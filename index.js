var customersApi = require('./customers');

//customersApi.getCustomers();
customersApi.getCustomerById(8);
// customersApi.saveCustomer({id: 4, firstName: 'Ayan', lastName: 'Dalal', address: '10th cross', city: 'BLR',
//             orders: [
//                 { product: 'basketball', price: 9.99, quantity: 5, orderTotal: 49.95 },
//                 { product: 'cricket', price: 19.99, quantity: 1, orderTotal: 19.99 }
//             ]
//         });
//customersApi.deleteCustomer(4);