module.exports = (app) => {
    const phones = require('../controllers/phones.controllers.js');


    //default message for /
    app.get('/', phones.root);

    //create new phone
    app.post('/createphone', phones.createPhone);

    //retrieve all
    app.get('/findallphones', phones.findAllPhones);

    //retrieve one
    app.get('/findphone/:phoneId', phones.findOnePhone);

    //update a phone info
    app.put('/updatephone/:phoneId', phones.updatePhone);

    //delete a phone info
    app.delete('/deletephone/:phoneId', phones.deletePhone);
}