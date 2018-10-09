const
    express = require('express'),
    cors = require('cors'),
    admin = require('firebase-admin'),
    config = require('./config/configuration');

admin.initializeApp({ credential: admin.credential.cert(config.FIREBASE_OPTIONS) })

admin.firestore().settings({ timestampsInSnapshots: true });

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('I am running...');
});

app.get('/ATriggerVerify.txt', (req, res) => res.sendFile(__dirname + '/ATriggerVerify.txt'));

app.get('/task/start', (req, res) => {
    require('./tasks/chain')();
    res.send("Job initiated...");
})

const server = app.listen(process.env.PORT, () => {
    console.log("App listening at http://%s:%s", server.address().address, server.address().port);
}); // taskkill /f /im node.exe
