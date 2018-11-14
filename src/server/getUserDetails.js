var credentialStore = require('./CredentialStore.js');

/*
 * Discalimer: This class should exist on server. This is kept as part of client to avoid hassle of deplyment for demo.
 * It is NOT RECOMMENDED to call Ultra Server apis from client side.
 * 
 * Server API which fetches User's details from Ultra Server and returns it to partner client
 */
export async function getUserDetails(req) {
    ultraSecureToken = credentialStore.getSecureTokenForUltra();
    var identityToken;
    //Ultra server call to fetch identity token by passing grant token
    return fetch('https://platform.flipkart.net/1/authorization/auth?grantToken='+req.token+'&clientId=playground&clientSecret=4FKzLsQDixo2tcP3nyzp8yq6jQq57cgy8ECQkiMHE7SlMiHy',
    {method: 'GET',
        headers: {
            'secureToken': ultraSecureToken
        }
    }).then( (response) => response.json())
    .then( (accessResponse) => {
        identityToken = accessResponse.RESPONSE.identityToken;
        credentialStore.putUser(identityToken);
        //Ultra server call to fetch user's details by passing identity token
        return fetch('https://platform.flipkart.net/1/resource/bulk?accessToken='+accessResponse.RESPONSE.accessToken,
        {
            method: 'POST',
            headers: {
                'secureToken': ultraSecureToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.scopes)
        }).then( (response) => response.json())
        .then((userResponse) => {
            //Form full name for user and pass details back to client
            let fullName = "";
            if(userResponse.RESPONSE["user.name"] != undefined){
                fullName = userResponse.RESPONSE["user.name"].firstName + " " + userResponse.RESPONSE["user.name"].lastName;
            }
            let mobileNumber = "";
            if(userResponse.RESPONSE["user.mobile"] != undefined){
                mobileNumber = userResponse.RESPONSE["user.mobile"].mobileNumber
            }
            
            return {
                name: fullName,
                mobile: mobileNumber,
                identityToken: identityToken
            };
        })
        .catch((error) => {
            console.error('error in get user details', error);
        })
    })
    .catch((error) => {
        console.error('error in get identity token',error);
    });
}