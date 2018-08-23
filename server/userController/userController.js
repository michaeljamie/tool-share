module.exports = {
    //leave this here and commented out...feel free to edit with your own info and uncomment so you don't have to keep logging in while you code. Comment out again before pushing to github.
    ignoreAuthInDevelopment: (req, res, next) => {
        if(process.env.MODE === 'development' && !req.session.user){
            req.session.user = {
                id:1, 
                auth_id:'google-oauth2|102948968802324753832', 
                user_name: 'Stephen Pace',	
                user_pic: 'https://lh5.googleusercontent.com/-sapgzN9K2rg/AAAAAAAAAAI/AAAAAAAAAwg/RLOCqjo6wDU/photo.jpg',
            };
            next();
        } else {
            next();
        }
    },

    read: ( req, res ) => {
        let { authID } = req.session.user
        req.app.get('db').get_user_info([ authID ])
        .then( response => {
            req.session.user = response[0]
            res.sendStatus(200)
        })
        .catch(console.log)
    },
    
    update: (req, res) => {
        const {id} = req.params;
        const {lat, long} = req.body;
        req.app.get('db').update_user_latlong([id, lat, long])
        .then( response => {
            res.status(200)
        })
    },

    getUserSession: (req, res) => {
        res.status(200).send(req.session);
        console.log(req.session)
    },

    getUserData: (req, res) => {
        const {userid} = req.params;
        req.app.get('db').get_user_data([userid])
        .then(data => {
            res.send(data)
        })
    },

    editUserData: (req, res) => {
        const {userid} = req.params;
        const {fullName, bio, email, phone, zip} = req.body;
        req.app.get('db').change_user_data([fullName, bio, email, phone, zip, userid])
        .then(() => {
            res.end()
        })
    },

    welcomeUpdate: (req, res) => {
        const {userid} = req.params;
        const {zip, phone} = req.body;
        req.app.get('db').welcome_update([zip, phone, userid])
        .then(() => {
            res.end()
        })
    },

    deleteUser: (req, res) => {
        console.log(req.session.user)
        const { authid } = req.session.user;
        req.app.get('db').delete_user([ authid ])
        .catch( err => {
            console.log(err)
        })
    }        

}