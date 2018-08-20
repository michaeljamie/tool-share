module.exports = {
    create: ( req, res ) => {
        let { room, sender_id, receiver_id } = req.body
        req.app.get('db').create_room([ room, sender_id, receiver_id ])
        .then( ()  => {
            res.sendStatus(200)
        })
        .catch(console.log)
    },
    read_sender: ( req, res ) => {
        let { id } = req.params
        req.app.get('db').get_messages_sender([ id ])
        .then( result => {
            res.send(result)
        })
        .catch(console.log)
    },
    read_receiver: ( req, res ) => {
        let { id } = req.params
        req.app.get('db').get_messages_receiver([ id ])
        .then( result => {
            res.send(result)
        })
        .catch(console.log)
    },
}