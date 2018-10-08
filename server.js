const
    express = require('express'),
    { urlencoded, json } = require('body-parser'),
    cors = require('cors'),
    admin = require('firebase-admin'),
    config = require('./config/configuration'),
    cleanup = require('./midlewares/folder.cleanup'),
    read = require('./midlewares/load.gallery.collection'),
    download = require('./midlewares/firebase.downloader'),
    upload = require('./midlewares/flickr.uploader');
    
admin.initializeApp({ credential: admin.credential.cert(config.FIREBASE_OPTIONS) })

admin.firestore().settings({ timestampsInSnapshots: true });

const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
    res.send('I am running...');
});

app.get('/ATriggerVerify.txt', (req, res) => res.sendFile(__dirname + '\\ATriggerVerify.txt'));

app.get('/task/download', cleanup, read, download);
app.get('/task/upload', upload);

const server = app.listen(process.env.PORT, () => {
    console.log("App listening at http://%s:%s", server.address().address, server.address().port);
}); // taskkill /f /im node.exe