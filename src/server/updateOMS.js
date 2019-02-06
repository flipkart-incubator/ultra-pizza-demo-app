var credentialStore = require('./CredentialStore.js');

/*
 * Discalimer: This class should exist on server. This is kept as part of client to avoid hassle of deplyment for demo.
 * It is NOT RECOMMENDED to call Ultra Server apis from client side.
 * 
 * Server API which updates Ultra OMS after payment succeedes
 */
export async function updateUltraOMS(req) {
    var orderTime = (new Date).getTime();
    let items = [];
    if(req.pizza > 0) {
        items.push({
            "itemId": "Product 1",
            "title": "Pan Pizza",
            "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/pizza.jpg",
            "basePrice": 3,
            "finalPrice": 3,
            "category": "test",
            "fulfillmentDate": orderTime,
            "itemState": "SUCCESSFUL",
            "brand": "Some brand",
            "product": "modelNumber",
            "customerName": "Lorem Ipsum",
            "quantity": req.pizza
            });
    }
    if(req.beverage > 0) {
        items.push({
            "itemId": "Product 2",
            "title": "Coke",
            "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/beverage.jpg",
            "basePrice": 1,
            "finalPrice": 1,
            "category": "test",
            "fulfillmentDate": orderTime,
            "itemState": "SUCCESSFUL",
            "brand": "Some brand",
            "product": "modelNumber",
            "customerName": "Lorem Ipsum 2",
            "quantity": req.beverage
            });
    }
    if(req.sides > 0){
        items.push({
            "itemId": "Product 3",
            "title": "Garlic Bread",
            "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/beverage.jpg",
            "basePrice": 2,
            "finalPrice": 2,
            "category": "test",
            "fulfillmentDate": orderTime,
            "itemState": "SUCCESSFUL",
            "brand": "Some brand",
            "product": "modelNumber",
            "customerName": "Lorem Ipsum 2",
            "quantity": req.sides
        });
    }
    let amount = req.pizza*3 + req.beverage + req.sides*2;
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
                    "items": items,
                    "forwardTransactions": [
                        {
                        "transactionId": req.orderId,
                        "amount": amount,
                        "description": "Paid via FKPG",
                        "timestamp": orderTime
                        }
                    ],
                    "merchantAdjustments": [
                        {
                            "adjustmentId": "Dummy merchant adjustment id",
                            "title": "This is some title",
                            "amount": 0
                        }
                    ],
                    "flipkartAdjustments": [
                        {
                            "adjustmentId": "dummyAdjustmentId",
                            "amount": 0
                        }
                    ]
                })
            }
        ).then((response) => {
            console.log('Ultra OMS update response',response);
            return response.json();
        }).catch((error) => {
            console.error('error in updating Ultra OMS', error);
        })
}

export async function updateOMSAfterRefund(req) {
    var orderTime = (new Date).getTime();
    let items = [];
    if(req.pizza > 0) {
        items.push({
            "itemId": "Product 1",
            "title": "Pan Pizza",
            "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/pizza.jpg",
            "basePrice": 3,
            "finalPrice": 3,
            "category": "test",
            "fulfillmentDate": orderTime,
            "itemState": "SUCCESSFUL",
            "brand": "Some brand",
            "product": "modelNumber",
            "customerName": "Lorem Ipsum",
            "quantity": req.pizza
            });
    }
    if(req.beverage > 0) {
        items.push({
            "itemId": "Product 2",
            "title": "Coke",
            "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/beverage.jpg",
            "basePrice": 1,
            "finalPrice": 1,
            "category": "test",
            "fulfillmentDate": orderTime,
            "itemState": "SUCCESSFUL",
            "brand": "Some brand",
            "product": "modelNumber",
            "customerName": "Lorem Ipsum 2",
            "quantity": req.beverage
            });
    }
    if(req.sides > 0){
        items.push({
            "itemId": "Product 3",
            "title": "Garlic Bread",
            "image": "https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/beverage.jpg",
            "basePrice": 2,
            "finalPrice": 2,
            "category": "test",
            "fulfillmentDate": orderTime,
            "itemState": "SUCCESSFUL",
            "brand": "Some brand",
            "product": "modelNumber",
            "customerName": "Lorem Ipsum 2",
            "quantity": req.sides
        });
    }

    let amount = req.pizza*3 + req.beverage + req.sides*2;

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
                "items": items,
                "forwardTransactions": [
                    {
                      "transactionId": req.orderId,
                      "amount": amount,
                      "description": "Paid via FKPG",
                      "timestamp": orderTime
                    }
                ],
                "merchantAdjustments": [
                    {
                        "adjustmentId": "Dummy merchant adjustment id",
                        "title": "This is some title",
                        "amount": 0
                    }
                ],
                "flipkartAdjustments": [
                    {
                        "adjustmentId": "dummyAdjustmentId",
                        "amount": 0
                    }
                ],
                "reverseTransactions": [
                    {
                      "forwardTransactionId": req.orderId,
                      "reverseTransactionId": "REFUND_" + req.orderId,
                      "amount": amount,
                      "description": "Paid via FKPG",
                      "timestamp": orderTime
                    }
                ],
                "cancellationCharges": [
                    {
                      "itemId": "Product 1",
                      "reason": "cancellation charge",
                      "amount": 0
                    },
                    {
                        "itemId": "Product 2",
                        "reason": "cancellation charge",
                        "amount": 0
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