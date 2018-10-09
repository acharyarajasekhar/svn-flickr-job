const admin = require('firebase-admin');
const config = require('./config/configuration');

admin.initializeApp({ credential: admin.credential.cert(config.FIREBASE_OPTIONS) })
admin.firestore().settings({ timestampsInSnapshots: true });

require('./tasks/chain')();