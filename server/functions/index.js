const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { routes } = require('./routes');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://yuki-a30e7.firebaseio.com"
});

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

routes(app);

exports.api = functions.https.onRequest(app);
