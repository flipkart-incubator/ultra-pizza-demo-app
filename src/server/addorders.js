var firebase = require("firebase");

export function addOrder(req) {
    firebase.database().ref('orders/' + req.identityToken + '/' + req.orderId).set({
        pizza: req.pizza,
        beverage: req.beverage,
        sides : req.sides,
        orderId : req.orderId,
        state : req.state
    }).then(() => {
        console.log('Saved Order on Firebase DB');
    }).catch((error) => {
        console.error('Error in saving order on Firebase DB',error);
    });
};

export function returnOrder(req) {
    firebase.database().ref('orders/' + req.identityToken + '/' + req.orderId).update({
        state : 'REFUNDED'
    }).then(() => {
        console.log('Saved returned order on Firebase DB');
    }).catch((error) => {
        console.error('Error in updating order on Firebase DB',error);
    });
}