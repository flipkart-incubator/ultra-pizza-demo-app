var credentialStore = require('./CredentialStore.js');

/*
 * Discalimer: This class should exist on server. This is kept as part of client to avoid hassle of deplyment for demo.
 * It is NOT RECOMMENDED to call Ultra Server apis from client side.
 * 
 * Server API which updates Ultra OMS after payment succeedes
 */
export async function updateUltraOMS(req) {
    var orderTime = (new Date).getTime();
    return fetch('https://platform.flipkart.net/2/oms',
        {
            method: 'POST',
            headers: {
                'secureToken': credentialStore.getSecureTokenForUltra(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "orderId": req.orderId,
                "description": "This is a dummy description",
                "identityToken": credentialStore.getUser(),
                "orderTimestamp": orderTime,
                "orderUpdatedTimestamp": orderTime,
                "orderUrl": "someURLToOrderPage",
                "items": [
                    {
                    "itemId": "Product 1",
                    "title": "Pan Pizza",
                    "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/pizza.jpg",
                    "basePrice": 120,
                    "finalPrice": 100,
                    "category": "test",
                    "fulfillmentDate": orderTime,
                    "itemState": "SUCCESSFUL",
                    "brand": "Some brand",
                    "product": "modelNumber",
                    "customerName": "Lorem Ipsum",
                    "quantity": 1
                    },
                    {
                    "itemId": "Product 2",
                    "title": "Coke",
                    "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/beverage.jpg",
                    "basePrice": 120,
                    "finalPrice": 100,
                    "category": "test",
                    "fulfillmentDate": orderTime,
                    "itemState": "SUCCESSFUL",
                    "brand": "Some brand",
                    "product": "modelNumber",
                    "customerName": "Lorem Ipsum 2",
                    "quantity": 1
                    }
                ],
                "forwardTransactions": [
                    {
                      "transactionId": req.orderId,
                      "amount": 200,
                      "description": "Paid via FKPG",
                      "timestamp": orderTime
                    }
                ],
                "merchantAdjustments": [
                    {
                        "adjustmentId": "Dummy merchant adjustment id",
                        "title": "This is some title",
                        "amount": 20
                    }
                ],
                "flipkartAdjustments": [
                    {
                        "adjustmentId": "dummyAdjustmentId",
                        "amount": 20
                    }
                ]
            })
        }).then((response) => {
            console.log('Ultra OMS update response',response);
            return response.json();
        }).catch((error) => {
            console.error('error in updating Ultra OMS', error);
        })
}

export async function updateOMSAfterRefund(req) {
    var orderTime = (new Date).getTime();
    return fetch('https://platform.flipkart.net/2/oms',
        {
            method: 'POST',
            headers: {
                'secureToken': credentialStore.getSecureTokenForUltra(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "orderId": req.orderId,
                "description": "This is a dummy description",
                "identityToken": credentialStore.getUser(),
                "orderTimestamp": orderTime,
                "orderUpdatedTimestamp": orderTime,
                "orderUrl": "someURLToOrderPage",
                "items": [
                    {
                    "itemId": "Product 1",
                    "title": "Pan Pizza",
                    "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/pizza.jpg",
                    "basePrice": 120,
                    "finalPrice": 100,
                    "category": "test",
                    "fulfillmentDate": orderTime,
                    "itemState": "SUCCESSFUL",
                    "brand": "Some brand",
                    "product": "modelNumber",
                    "customerName": "Lorem Ipsum",
                    "quantity": 1
                    },
                    {
                    "itemId": "Product 2",
                    "title": "Coke",
                    "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/beverage.jpg",
                    "basePrice": 120,
                    "finalPrice": 100,
                    "category": "test",
                    "fulfillmentDate": orderTime,
                    "itemState": "SUCCESSFUL",
                    "brand": "Some brand",
                    "product": "modelNumber",
                    "customerName": "Lorem Ipsum 2",
                    "quantity": 1
                    }
                ],
                "forwardTransactions": [
                    {
                      "transactionId": req.orderId,
                      "amount": 200,
                      "description": "Paid via FKPG",
                      "timestamp": orderTime
                    }
                ],
                "merchantAdjustments": [
                    {
                        "adjustmentId": "Dummy merchant adjustment id",
                        "title": "This is some title",
                        "amount": 20
                    }
                ],
                "flipkartAdjustments": [
                    {
                        "adjustmentId": "dummyAdjustmentId",
                        "amount": 20
                    }
                ],
                "reverseTransactions": [
                    {
                      "forwardTransactionId": req.orderId,
                      "reverseTransactionId": "REFUND_" + req.orderId,
                      "amount": 160,
                      "description": "Paid via FKPG",
                      "timestamp": orderTime
                    }
                ],
                "cancellationCharges": [
                    {
                      "itemId": "Product 1",
                      "reason": "cancellation charge",
                      "amount": 20
                    },
                    {
                        "itemId": "Product 2",
                        "reason": "cancellation charge",
                        "amount": 20
                    }
                ]
            })
        }).then((response) => {
            console.log('Ultra OMS update response',response);
            return response.json();
        }).catch((error) => {
            console.error('error in updating Ultra OMS', error);
        })
}