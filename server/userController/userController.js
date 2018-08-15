module.exports = {
    read: ( req, res ) => {
        let { auth_id } = req.session.user
        req.app.get('db').get_user_info([ autho_id ])
        .then( response => {
            req.session.user = response[0]
            res.sendStatus(200)
        })
        .catch(console.log)
    },
}