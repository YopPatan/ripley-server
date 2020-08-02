var admin = require("firebase-admin");

var serviceAccount = require("../config/ripley-server-auth-firebase-adminsdk-3gc15-fc2f01e23f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ripley-server-auth.firebaseio.com"
});

const session = {
    isActive: (tokenId) => {
        return admin.auth().verifyIdToken(tokenId).then(token => {
            return true;
        }).catch(error => {
            console.error('session.isActive: ' + error);
            return false;
        });
    }
}

module.exports = session;
