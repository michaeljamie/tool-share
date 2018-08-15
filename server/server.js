require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
const socket = require('socket.io');

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

let {
    REACT_APP_CLIENT_ID,
    REACT_APP_DOMAIN,
    CLIENT_SECRET,
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING,
} = process.env

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../build`))
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));



massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Database ready')
});

app.get('/auth/callback', async (req, res) => {
    // code from auth0 on req.query.code
    let payload = {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.PROTOCOL}://${req.headers.host}/auth/callback`
    };
  
    // post request to exchange the code for a token
    let responseWithToken = await axios.post(
      `https://${REACT_APP_DOMAIN}/oauth/token`,
      payload
    );
    // use token to get user data of whom just logged in
    let userData = await axios.get(
      `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
        responseWithToken.data.access_token
      }`
    );
    const db = req.app.get('db');
    let { sub, name, picture } = userData.data;
    let userExists = await db.find_user([sub]);
    if (userExists[0]) {
      req.session.user = userExists[0];
      res.redirect(`${process.env.FRONTEND_DOMAIN}/#/profile`);
    } else {
      db.create_user([sub, name, picture]).then(createdUser => {
        req.session.user = createdUser[0];
        res.redirect(`${process.env.FRONTEND_DOMAIN}/#/profile`);
      });
    
    }
  });
  
app.get('/api/user-data', ( req, res ) => {
if (req.session.user) {
    res.status(200).send(req.session.user)
   
}
else {
    res.status(401).send('Unauthorized')
}
})
  
app.get('/api/logout', (req, res) => {
    req.session.destroy()
    
})



app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port: ${SERVER_PORT}`)
})