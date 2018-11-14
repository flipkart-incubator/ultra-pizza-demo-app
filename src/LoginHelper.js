var firebase = require("firebase");
var getUser = require('./server/getUserDetails');
var userDetailsScreen = require('./components/UserDetailScreen');
var rs = require('jsrsasign');

/* 
 * This method This method handles Login to Ultra.
 * It fetches grant token using client sdk and then fetches access token and user details from server.
 * It returns a promise which resolves later and returns user's details.
 */
export async function ultraSignIn() {
    //requesting for User's Name and Mobile number. Both are non mendatory in our case.
    var scopeReq = [{"scope":"user.mobile","isMandatory":false,"shouldVerify":false},{"scope":"user.name","isMandatory":false,"shouldVerify":false}];
    return userDetailsScreen.fkPlatform.getModuleHelper().getPermissionsModule().getToken(scopeReq).then((e) => {
        var request = {
            token: e.grantToken,
            scopes: ['user.mobile','user.name']
        }
        return getUser.getUserDetails(request).then((user) => {
            signInToFirebase(user.identityToken);
            return user;
        });
        
    }).catch(function (e) {
        console.log('error in ultra login', e.message);
    })
}

/* 
 * signInToFirebase method is to login to firebase database from this app.
 * App login is required to save order or retrieve orders from firebase database.
 */
function signInToFirebase(identityToken) {
    //Adds current users details to firebase realtime DB. This is used to enforce per user access rule 
    //while accessing DB values.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var jsonUser = user.toJSON();
            firebase.database().ref('users/' + jsonUser.uid).set(jsonUser)
            .then(() => {
                console.log('Written user to firebase DB');
        }).catch((error) => {
            console.error('error in writing user data to DB',error);
        });
        } else {
            console.log('no user found');
        }
    });

    //Code to login to firebase
    firebase.auth().signInWithCustomToken(getSecureTokenForFirebase(identityToken)).catch(function(error) {
        console.log('error in sign in',error);
    });
}

/*
 * Generates JWT token which will be used as custom auth in firebase.
 * Method takes uid, a unique id per user
 * returns JWT token for current user.
 */
function getSecureTokenForFirebase(uid) {
    // Header
    var oHeader = { alg: 'RS256', typ: 'JWT' };
    // Payload
    var oPayload = {};
    var tNow = rs.KJUR.jws.IntDate.get('now');
    var tEnd = rs.KJUR.jws.IntDate.get('now') + 1000;
    oPayload.iss = "firebase-adminsdk-j7sl3@pizzadelivery-38e91.iam.gserviceaccount.com";
    oPayload.sub = "firebase-adminsdk-j7sl3@pizzadelivery-38e91.iam.gserviceaccount.com";
    oPayload.aud = "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
    oPayload.iat = tNow;
    oPayload.exp = tEnd;
    oPayload.uid = uid;
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var sPKCS8PEM = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMlQT7ZI5q7BQs\neqwRp3VznJBUHjCHgQNbpkhdZyYxUsMGOpHHhW7vS+eBhOnU51Tc7vMOKbDsurDV\n8vz05ONfyos9BkWOtakg9a7A5o/wCU+JM+gi3KTww/U/ugSM3PM5CG6SN65hrugx\nuIso4/cJ3e/ptUricW4e8FpJBMwoO/jIco7jOFD5uqkpKwmjyldFOvwKqWgBDPz3\n7SN0NO2WpkGNQxZEFePJKDabcLHeuw3D0sNqE6m/FxiBhkQip75O0/l9+WQL8Vye\nmLEsg4lra/vcAddzsvhO+OhDi1Qs/NSfrrTwzeg6g20blss1tZw6lK/oz87MhCof\n0Mn/nVD3AgMBAAECggEAH6j6Kzt4bM9EdKO2svQNkaA2QnD6RVDFEm8NKONDKQPr\n/tqb39rkUZpsuoG1ZtzhUwrpnhSmoY68uhzPYnN07/NE5riXQCAYi0C/fsZ6RQVJ\nLpb+rZJ5i3G6p6uOc7bn2bjWf8Cn4cxzI5Vcd9iw95vF5TmeBqV+Nhcv1GKug5Uz\n9HyQjFC4p/kjnTstgpOg7lDblQbDRr7R7czX0yBzW1+86QIsdA2l4puE7CGQgW7e\n1B3XhJpPvJ+d+hllbYGvCwECU8iYg67B+POUCy99ucTw/762YDJ0kt6nA37q9i7q\nd5ZCnTBYMRi3G9xMDm3JXaCXbwRe/2DgNmdrTnu1YQKBgQD44QzaB7vECZ+0Bsl9\nI+Y+zDCHUAwrQnHTmwH7L8BV4lyAuRlnDycJ8y5doIP6U3D29H40quojWafai97f\nz4UVIbM9R6le94Z713rqiBYC0519zGg2fteocB5CudPRJYMkOdlmosE1ZhlWBLJx\nt5037lfjssVgh5rOlB7Y1Yyi4QKBgQDSb4J9KnFFza1lZ/FIXxlnnASOa0F3Je67\nCyBMpRalOsIJeIXPti6XMVfLXgAw93wLDD7a8ETbVqwSF+ndIaFmTsb4I9AQnckd\nvhZM7DvcoAbcnSJyA7CsP8hniJUtMJz0n+Ln4buBRkEeXYkzoAgiHQvINBOtUt5w\nQeUhR9dG1wKBgQDXUQToYIZu7RCRFMofDP7213sopfVRO9P0iYemREK3SvZSm1FB\n21cgAZbcg7GK0cPKs+24LSIR4VAaAKaapRPzG0vRuXzr32QnIl6CJ6g7W89GdaC3\nfPehDxbvDYwWxsh1f+L5K9fSFfnXdIrZXUyUhgzdvt2KTOd+z6D8YYyhoQKBgBGy\n3z63ux8r1VGaFGkJ1pEoRhnUW4Ux44pHvUe0+tqavocdY+O8Zt7Af6nTFiEIL56e\nQQsY+jGYcJB1Am5ezbxVE9b67Bz5qFigDDAcDkzYCLu1W5hLRyi1lJ1gl2tdk1Xf\nvK3UBnkw93keVNPKueRknQERoDYLqjm20RajfC+xAoGAd/uJ7WYQRZ3HQaeumOaJ\n1bpNCz2kN2NUKEq7gvUZhFEm16hKIFixXaWA+fEgthKuIukyZqw6Iv7tUdTCBnAD\nvyN+aqPXKAkhk/CJdRCh/98Q+MH0SbZ4nN63A/tgTCrfasSZ+LIFdYSHi6dYsaLN\ny6453CrLcraRfyKiHCnCkCQ=\n-----END PRIVATE KEY-----\n";
    var prvKey = rs.KEYUTIL.getKey(sPKCS8PEM, "");
    var sJWT = rs.KJUR.jws.JWS.sign("RS256", sHeader, sPayload, prvKey);
    return sJWT;
};