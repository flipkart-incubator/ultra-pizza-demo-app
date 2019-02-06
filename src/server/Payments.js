var credentialStore = require('./CredentialStore.js');

/*
 * Discalimer: This class should exist on server. This is kept as part of client to avoid hassle of deplyment for demo.
 * It is NOT RECOMMENDED to call Ultra Server apis from client side.
 * 
 * Server API which fetches payment token from Ultra Server and returns it to client
 */
export async function getPaymentToken(req) {
    return fetch('https://platform.flipkart.net/2/payment/token',
        {
            method: 'POST',
            headers: {
                'secureToken': credentialStore.getSecureTokenForUltra(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //merchant credentials provided by flipkart
                merchantCredential:{
                    "name": "test_mmt_flipkart",
                    "password": "a4df1221a8ba0ffcda1a2a43046a2b0bae2518f5881210bb1e2ea003fc0038fa"
                },
                "merchantTransactionId": req.orderId,
                "merchantReferenceId": "PLAYGROUND_" + Math.random().toString(36).slice(2).toUpperCase(),
                "amountPaise": req.amount,
                "paymentExpiryMilliSeconds": 1000000,
                "category": "home",
                "userInfo": {
                    "identityToken": credentialStore.getUser()
                },
                "successfulCallBackUrl": 'https://us-central1-pizzadelivery-38e91.cloudfunctions.net/successfulCallBackUrl',
                "failureCallBackUrl": 'https://us-central1-pizzadelivery-38e91.cloudfunctions.net/failureCallBackUrl',
                "description": "this is a test transaction",
                "metadata": "this is a test transaction",
                "priceSummary": {
                    "basePricePaise": req.amount-50,
                    "itemCount": req.itemCount,
                    "breakup": [
                    {
                        "description": "delivery_fee",
                        "displayText": "Delivery Fee",
                        "valueInPaise": 50,
                        "breakupType": "DEFAULT"
                    }
                    ]
                }
            })
        }).then( (response) => response.json())
        .then((responsejson) => {
            console.log("payment token json response",responsejson);
            return {
                token: responsejson.RESPONSE.token
            }
        }).catch((error) => {
            console.error('error in get payment token Ultra api', error);
        })
}