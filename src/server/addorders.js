// const admin = require('firebase-admin');
// admin.initializeApp();
var firebase = require("firebase");

export function addOrder(req, res) {

    // var config = {
    //     apiKey: "AIzaSyBAMUXFxgwK5vks7SBQ6EDnMaYuNRIT5Yc",
    //     authDomain: "pizzadelivery-38e91.firebaseapp.com",
    //     databaseURL: "https://pizzadelivery-38e91.firebaseio.com/",
    //     storageBucket: "pizzadelivery-38e91.appspot.com"
    // };
    // firebase.initializeApp(config);

    firebase.database().ref('orders/' + 'manbendra').set({
        pizza: 5,
        beverage: 6,
        sides : 7
    });

    // admin.database().ref('/orders/' + 'manbendra').set({
    //     pizza: 1,
    //     beverage: 2,
    //     sides : 3
    // }).then(() => {
    //     console.log('New Message written');
    // }).catch((error) => {
    //     throw new functions.https.HttpsError('unknown', error.message, error);
    // });


    // if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    //     console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
    //         'Make sure you authorize your request by providing the following HTTP header:',
    //         'Authorization: Bearer <Firebase ID Token>',
    //         'or by passing a "__session" cookie.');
    //     res.status(403).send('Unauthorized');
    //     return;
    // }

    // let idToken;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    //     console.log('Found "Authorization" header');
    //     // Read the ID Token from the Authorization header.
    //     idToken = req.headers.authorization.split('Bearer ')[1];
    // } else {
    //     // No cookie
    //     res.status(403).send('Unauthorized');
    //     return;
    // }
    // return admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
    //     console.log('ID Token correctly decoded', decodedIdToken);
    //     req.user = decodedIdToken;

    //     console.log('new incoming order, pizza:',req.body.pizza,'beverage:',req.body.beverage,'sides',req.body.sides);
    //     var orderid = makeid();
    //     console.log('order id created: ',orderid);
    //     admin.database().ref('/orders/' + req.body.mobile + '/' + orderid).set({
    //         pizza: req.body.pizza,
    //         beverage: req.body.beverage,
    //         sides : req.body.sides
    //     }).then(() => {
    //         console.log('New Message written');
    //         res.status(200).send('Order added');
    //     }).catch((error) => {
    //         res.status(400).send('Order update failed');
    //         throw new functions.https.HttpsError('unknown', error.message, error);
    //     });
    // }).catch((error) => {
    //     console.error('Error while verifying Firebase ID token:', error);
    //     res.status(403).send('Unauthorized');
    //     return;
    // });
    
};
