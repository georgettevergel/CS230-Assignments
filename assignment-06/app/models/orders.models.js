const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    orderId: ObjectId,
    email: String,
    products: [{
        productCode: {type: Number}
    }]
});

module.exports = mongoose.model('orderDetails', ordersSchema);