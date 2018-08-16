module.exports = {

    read: ( req, res ) => {
        let { authID } = req.session.user
        req.app.get('db').get_user_info([ authID ])
        .then( response => {
            req.session.user = response[0]
            res.sendStatus(200)
        })
        .catch(console.log)
    },


    getUserSession: (req, res) => {
        res.status(200).send(req.session);
        console.log(req.session)
    },

}