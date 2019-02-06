var credentialStore = require('./CredentialStore.js');

/*
 * Discalimer: This class should exist on server. This is kept as part of client to avoid hassle of deplyment for demo.
 * It is NOT RECOMMENDED to call Ultra Server apis from client side.
 * 
 * Server API to initiate refund
 */
export async function returnOrder(req) {
    let amount = req.pizza*3 + req.beverage + req.sides*2;
    return fetch('https://platform.flipkart.net/3/payment/refund/create',
        {
            method: 'POST',
            headers: {
                'secureToken': credentialStore.getSecureTokenForUltra(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //merchant credentials provided by flipkart
                merchantCredential:{
                    "name": "playground",
                    "password": "a4df1221a8ba0ffcda1a2a43046a2b0bae2518f5881210bb1e2ea003fc0038fa"
                },
                "paymentMerchantTransactionId": req.orderId,
                "refundAmountInPaise": amount,
                "refundMerchantTransactionId": "PLAYGROUND_" + Math.random().toString(36).slice(2).toUpperCase(),
                "refundReason": "taking longer than expected",
                "identityToken": credentialStore.getUser()
            })
        }).then( (response) => response.json())
        .then((responsejson) => {
            console.log("Manbendra, refund api json response",responsejson);
            if(responsejson.STATUS === 200){
                return true;
            }else{
                return false;
            }
        }).catch((error) => {
            console.error('Manbendra, error in Ultra refund api', error);
        })
}