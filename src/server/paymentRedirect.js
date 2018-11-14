const functions = require('firebase-functions');

/*
 * Function deployed as firebase cloud function which sends an event to app after the payment is successful.
 */
exports.successfulCallBackUrl = functions.https.onRequest((req, res) => {
    res.redirect('fapp://action?value={"screenType":"ultra","params":{"url":"/success","clientId":"playground.pizza","postPaymentFlow":true,"success":TRUE}}');
});

/*
 * Function deployed as firebase cloud function which sends an event to app after the payment fails.
 */
exports.failureCallBackUrl = functions.https.onRequest((req, res) => {
    res.redirect('fapp://action?value={"screenType":"ultra","params":{"url":"/failure","clientId":"playground.pizza","postPaymentFlow":true,"success":FALSE}}');
});