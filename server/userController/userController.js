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
    update: (req, res) => {
        const {id} = req.params;
        const {latlong} = req.body;
        req.app.get('db').update_user_latlong([id, latlong])
        .then( response => {
            res.status(200)
        })
    }

}