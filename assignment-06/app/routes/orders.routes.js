module.exports = (app) => {
    const orders = require('../controllers/orders.controllers.js');


    //default message for /
    app.get('/', orders.root);

    //create new order
    app.post('/createorder', orders.createOrder);

    //retrieve all
    app.get('/findallorders', orders.findAllOrders);

    //retrieve one
    app.get('/findorder/:orderId', orders.findOneOrder);

    //update a order info
    app.put('/updateorder/:orderId', orders.updateOrder);

    //delete a order info
    app.delete('/deleteorder/:orderId', orders.delet0rder);
}