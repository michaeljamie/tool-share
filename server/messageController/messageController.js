module.exports = {
    create: ( req, res ) => {
        let { room, sender_id, receiver_id } = req.body
        req.app.get('db').create_room([ room, sender_id, receiver_id ])
        .then( result => {
            res.sendStatus(200)
        })
        .catch(console.log)
    },
    read: ( req, res ) => {
        let { userid } = req.params
        req.app.get('db').get_messages([ userid ])
        .then( result => {
            res.send(result)
        })
        .catch(console.log)
    }
}