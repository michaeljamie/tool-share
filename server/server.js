require('dotenv').config();
  const express = require('express');
  const bodyParser = require('body-parser');
  const session = require('express-session');
  const massive = require('massive');
  const axios = require('axios');
  const socket = require('socket.io');
  const nodemailer = require('nodemailer');
  const uc = require('./userController/userController');
  const tc = require('./toolController/toolController');
  const mc = require('./messageController/messageController');
  const nc = require('./nodemailerController/nodemailerController');
  const moment = require('moment');


let {
  REACT_APP_CLIENT_ID,
  REACT_APP_DOMAIN,
  CLIENT_SECRET,
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
} = process.env

const app = express()
    , io = socket(app.listen(SERVER_PORT, () => console.log(`Till ${SERVER_PORT}, I got your back, we can do this! - Childish Gambino`)))

    io.on('connection', socket => {
      console.log('User Connected');
    
    socket.on('message sent', data => {
      console.log(data);
      let { userid, message, profile_pic, username, current_room } = data
      let date = moment().format('l')
      let time = moment().format('h:mm a')
      const response ={
        userid,
        message,
        profile_pic,
        username,
        date,
        time
      }
      const db = app.get('db')
      db.submit_message([current_room, JSON.stringify(response), date, time])
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

app.use(uc.ignoreAuthInDevelopment)

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
  console.log(userData)
  let { sub, name, picture, email } = userData.data;
  let userExists = await db.find_user([sub]);
  if (userExists[0]) {
    req.session.user = userExists[0];
    res.redirect(`${process.env.FRONTEND_DOMAIN}/#/profile/${req.session.user.userid}`);
  } else {
    db.create_user([sub, name, picture, email]).then(createdUser => {
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
app.get('/api/userData/:userid', uc.getUserData)
app.put('/api/userData/:userid', uc.changeUserData)

// Tool Endpoints
app.get('/api/tools', tc.select_all_tools);
app.get('/api/tools_by_tag', tc.select_tool_by_tags);
app.get('/api/get_all_tools_with_tags', tc.get_all_tools_with_tags);
app.get('api/get_current_tool_tag/:id', tc.get_current_tool_tag);
app.get('/api/tool/:id', tc.select_tool_and_owner);
app.post('/api/post/tool', tc.post_tool);
app.get('/api/usersRentedTools/:userid', tc.select_all_tools_user_is_renting)
app.get('/api/usersListedTools/:userid', tc.select_all_tools_user_has_listed)

// Message Endpoints
app.put('/api/room', mc.create)
app.get('/api/sendermessages/:id', mc.read_sender)
app.get('/api/receivermessages/:id', mc.read_receiver)
app.get('/api/messages/:messageid', mc.read)

// Nodemailer Endpoints
app.post('/api/send', nc.send)
