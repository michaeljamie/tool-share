module.exports = {
    create: ( req, res ) => {
        let { room, sender_id, receiver_id } = req.body
        req.app.get('db').create_room([ room, sender_id, receiver_id ])
    },

    read: (req, res ) => {
        
        req.app.get('db').get_messages([]).then(messages => { res.status(200).send(messages) 
        })
        .catch(err => console.log(err))
    }
}