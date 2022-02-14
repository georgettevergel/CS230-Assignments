module.exports = (app) => {
    const customers = require('../controllers/customers.controllers.js');


    //default message for /
    app.get('/', customers.root);

    //create new customer
    app.post('/createcustomer', customers.createCustomer);

    //retrieve all
    app.get('/findallcustomers', customers.findAllCustomers);

    //retrieve one
    app.get('/findonecustomer/:customerId', customers.findOneCustomer);

    //update a customer info
    app.put('/updatecustomer/:customerId', customers.updateCustomer);

    //delete a customer 
    app.delete('/deletecustomer/:customerId', customers.deleteCustomer);
}