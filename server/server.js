require('dotenv').config();
const express = require('express');
const bodyPaser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
const socket = require('socket.io');
const uc = require('./userController/userController');
const tc = require('./toolController/toolController');

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

let {
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING,
} = process.env

app.use(bodyPaser.json());
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Database ready')
});

// Profile Endpoints
app.get('/api/userinfo', uc.read)

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port: ${SERVER_PORT}`)
})