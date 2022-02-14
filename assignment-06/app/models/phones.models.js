const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const phonesSchema = mongoose.Schema({
    phoneId: ObjectId,
    productCode: Number,
    manufacturer: String,
    model: String,
    price: Number,
    quantity: Number 
});

module.exports = mongoose.model('phoneModel', phonesSchema);