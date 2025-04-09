const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const serviceAccount = require('./serviceAccountKey.json');
const admin = require('firebase-admin');
const fs = require('fs');
const https = require('https');
var cors = require('cors');
const runCronJob = require('./src/helper/subscriptionCron');
app.use(
    bodyParser.json({
        verify: (req, res, buf) => {
            req.rawBody = buf;
        }
    })
);
app.use(express.json());
app.use(cors());

//Database connection
require('./db/index');
require('dotenv').config();



let httpServer;

const privateKey = fs.readFileSync('certy/privkey.pem', 'utf8');
const certificate = fs.readFileSync('certy/cert.pem', 'utf8');
const caBundle = fs.readFileSync('certy/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: caBundle };

httpServer = https.createServer(credentials, app);
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

function onListening() {
    let addr = httpServer.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    req.header('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://crowdfunding-app-2e362-default-rtdb.firebaseio.com/'
});
app.use(bodyParser.json());

const router = require('./src/router/routes');
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('<h2>CrowdFunding app server</h2>');
});





// Server to connect
// app.listen(port, async () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });
