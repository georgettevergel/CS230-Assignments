const Customer = require('../models/customers.models.js');


//default message for /

exports.root = (req, res) => {
    console.log("this is my CS230 Assignment 6 admission.");
    return res.status(200).send({
        message: "this is my CS230 Assignment 6 admission."
    });
};


//create new customer
exports.createCustomer = (req, res) => {
    if(!req.body.title || !req.body.fname || !req.body.lname || !req.body.mobile || !req.body.email || !req.body.home.address1 || !req.body.home.town || !req.body.home.city || !req.body.shipping.address1 || !req.body.shipping.town || !req.body.shipping.city) {
        return res.status(404).send({
            message: "Please fill the relevant fields."
        });
    }

    //create
    const customer = new Customer({
        customerId = req.body.customerId,
        title: req.body.customer,
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email,
        home: {
            address1: req.body.address1,
            address2: req.body.address2,
            town: req.body.town,
            city: req.body.city,
            eircode: req.body.eircode
        },
        shipping: {
            address1: req.body.address1,
            address2: req.body.address2,
            town: req.body.town,
            city: req.body.city,
            eircode: req.body.eircode
        },
        orderHistory: [{
            orderId: req.body.orderId
        }]
    });

    //save
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occired while creating the customer."
        });
    });
 
};

//retrieve all
exports.findAllCustomers = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occured while retrieving all customers."
        });
    });
};


//retrieve one
exports.findOneCustomer = (req, res) => {
    Customer.findById(req.params.customerId).then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer nor found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.customerId
        });
    });
};

//update a customer info
exports.updateCustomer = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty"
        });
    }

    //find customer and update it with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        title: req.body.customer,
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email,
        home: {
            address1: req.body.address1,
            address2: req.body.address2,
            town: req.body.town,
            city: req.body.city,
            eircode: req.body.eircode
        },
        shipping: {
            address1: req.body.address1,
            address2: req.body.address2,
            town: req.body.town,
            city: req.body.city,
            eircode: req.body.eircode
        },
        orderHistory: [{
            orderId: req.body.orderId
        }]
    },
    { new: true })  // "new: true" return updated object
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    });
};


//delete a customer
exports.deleteCustomer = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId).then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "could not delete customer with id " + req.params.customerId
        });
    });
};