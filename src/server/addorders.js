var firebase = require("firebase");

export function addOrder(req) {
    firebase.database().ref('orders/' + req.identityToken + '/' + req.orderId).set({
        pizza: req.pizza,
        beverage: req.beverage,
        sides : req.sides
    }).then(() => {
        console.log('Saved Order on Firebase DB');
    }).catch((error) => {
        console.error('Error in saving order on Firebase DB',error);
    });
};