var firebase = require("firebase");

/*
 * Server api which fetches the orders for the user and returns back to the client
 */
export async function getOrders(identityToken) {
    return firebase.database().ref('/orders/' + identityToken).once('value').then((snapshot) => {
        return snapshot.val();
    });
};