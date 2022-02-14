const Phone = require('../models/phones.models.js');


//default message for /

exports.root = (req, res) => {
    console.log("this is my CS230 Assignment 6 admission.");
    return res.status(200).send({
        message: "this is my CS230 Assignment 6 admission."
    });
};


//create new phone
exports.createPhone = (req, res) => {
    if(!req.body.productCode || !req.body.manufacturer || !req.body.model || !req.body.price || !req.body.quantity) {
        return res.status(404).send({
            message: "Please fill the relevant fields."
        });
    }

    //create
    const phone = new Phone({
       phoneId: req.body.phoneId,
       productCode: req.body.productCode,
       manufacturer: req.body.manufacturer,
       model: req.body.model,
       price: req.body.price,
       quantity: req.body.quantity
    });

    //save
    phone.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occired while creating the phone."
        });
    });
 
};

//retrieve all
exports.findAllPhones = (req, res) => {
    Phone.find()
    .then(phones => {
        res.send(phones);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occured while retrieving all phones."
        });
    });
};


//retrieve one
exports.findOnePhone = (req, res) => {
    Phone.findById(req.params.phoneId).then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "Phone nor found with id " + req.params.phoneId
            });
        }
        res.send(phone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        return res.status(500).send({
            message: "Error retrieving phone with id " + req.params.phoneId
        });
    });
};

//update a phone info
exports.updatePhone = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Phone content cannot be empty"
        });
    }

    //find phone and update it with the request body
    Phone.findByIdAndUpdate(req.params.phoneId, {
       productCode: req.body.productCode,
       manufacturer: req.body.manufacturer,
       model: req.body.model,
       price: req.body.price,
       quantity: req.body.quantity
    },
    { new: true })  // "new: true" return updated object
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "phone not found with id " + req.params.phoneId
            });
        }
        res.send(phone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "phone not found with id " + req.params.phoneId
            });                
        }
        return res.status(500).send({
            message: "Error updating phone with id " + req.params.phoneId
        });
    });
};


//delete a phone
exports.deletePhone = (req, res) => {
    Phone.findByIdAndRemove(req.params.phoneId).then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "phone not found with id " + req.params.phoneId
            });
        }
        res.send({message: "phone deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "phone not found with id " + req.params.phoneId
            });
        }
        return res.status(500).send({
            message: "could not delete phone with id " + req.params.phoneId
        });
    });
};