const admin = require('firebase-admin');
const config = require('./config/configuration');
const app = require('express')();

admin.initializeApp({ credential: admin.credential.cert(config.FIREBASE_OPTIONS) })
admin.firestore().settings({ timestampsInSnapshots: true });

app.get('/', (req, res) => res.send("I am running"));
app.get('/ATriggerVerify.txt', (req, res) => res.sendFile(__dirname + '/ATriggerVerify.txt'));
app.get('/start', (req, res) => { require('./tasks/chain')(); res.send("Job initiated") });
app.get('/flickr/search', require('./search.flickr'));
app.get('/firebase/search', require('./search.firebase'));

app.listen(process.env.PORT, () => console.log('App started listening @ PORT: ' + process.env.PORT));