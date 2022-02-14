const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const CustomersSchema = mongoose.Schema({
    customerId: ObjectId,
    title: String,
    fname: String,
    lname: String,
    mobile: String,
    email: String,
    home: {
        address1: String,
        address2: String,
        town: String,
        city: String,
        eircode: String
    },
    shipping: {
        address1: String,
        address2: String,
        town: String,
        city: String,
        eircode: String
    },
    orderHistory: [{
        orderId: {type: ObjectId}
    }]
});

module.exports = mongoose.model('Customer', CustomersSchema);