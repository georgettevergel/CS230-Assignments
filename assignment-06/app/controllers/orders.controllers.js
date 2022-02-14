const Order = require('../models/orders.models.js');


//default message for /

exports.root = (req, res) => {
    console.log("this is my CS230 Assignment 6 admission.");
    return res.status(200).send({
        message: "this is my CS230 Assignment 6 admission."
    });
};


//create new order
exports.createOrder = (req, res) => {
    if(!req.body.email) {
        return res.status(404).send({
            message: "Please fill the relevant fields."
        });
    }

    //create
    const order = new Order({
       orderId: req.body.orderId,
       email: req.body.email,
       products: {
           productCode: req.body.productCode
       }
    });

    //save
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occired while creating the order."
        });
    });
 
};

//retrieve all
exports.findAllOrders = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occured while retrieving all orders."
        });
    });
};


//retrieve one
exports.findOneOrder = (req, res) => {
    Order.findById(req.params.orderId).then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order nor found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error retrieving order with id " + req.params.orderId
        });
    });
};

//update a order info
exports.updateOrder = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Order content cannot be empty"
        });
    }

    //find order and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
       email: req.body.email,
       products: {
           productCode: req.body.productCode
       }
    },
    { new: true })  // "new: true" return updated object
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error updating order with id " + req.params.orderId
        });
    });
};


//delete a order
exports.deleteOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId).then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send({message: "order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "could not delete order with id " + req.params.orderId
        });
    });
};