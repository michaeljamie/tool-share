require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
const socket = require('socket.io');
const uc = require('./userController/userController');
const tc = require('./toolController/toolController');
const mc = require('./messageController/messageController');

let {
  REACT_APP_CLIENT_ID,
  REACT_APP_DOMAIN,
  CLIENT_SECRET,
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  GOOGLE_API,
} = process.env

const app = express()
    , io = socket(app.listen(SERVER_PORT, () => console.log(`Till ${SERVER_PORT}, I got your back, we can do this! - Childish Gambino`)))

    io.on('connection', socket => {
      console.log('User Connected');
    
    socket.on('message sent', data => {
      console.log(data);
      let { userid, message, profile_pic, username, current_room } = data
      let date = new Date()
      const response ={
        userid,
        message,
        profile_pic,
        username,
        date
      }
      const db = app.get('db')
      db.submit_message([current_room, message, date])
      io.emit(`message dispatched-${current_room}`, response)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
})


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
    res.redirect(`${process.env.FRONTEND_DOMAIN}/#/profile/${req.session.user.userid}`);
  } else {
    db.create_user([sub, name, picture]).then(createdUser => {
      req.session.user = createdUser[0];
      res.redirect(`${process.env.FRONTEND_DOMAIN}/#/profile/${req.session.user.userid}`);
    });
  };
});
  
app.get('/api/user-data', ( req, res ) => {
  if (req.session.user) {
    res.status(200).send(req.session.user)
  }
  else {
    res.status(401).send('Unauthorized')
  }
});
  
app.get('/api/logout', (req, res) => {
  req.session.destroy()
  res.redirect(`${FRONTEND_DOMAIN}/#`)
});

// Profile Endpoints
app.get('/api/userinfo', uc.read);
app.get('/api/session', uc.getUserSession);
app.post('/api/updateUser/:id', uc.update);

// Tool Endpoints
app.get('/api/tools', tc.select_all_tools);
app.get('/api/tool/:id', tc.select_tool_and_owner);
app.get('/api/usersRentedTools/:userid', tc.select_all_tools_user_is_renting)

// Message Enpoints
app.put('/api/room', mc.create)