module.exports = {
    create: ( req, res ) => {
        let { room, sender_id, receiver_id } = req.body;
        req.app.get('db').create_room([ room, sender_id, receiver_id ])
        .then( ()  => {
            res.sendStatus(200)
        })
        .catch(console.log)
    },
    read_sender: ( req, res ) => {
        let { id } = req.params;
        req.app.get('db').get_messages_sender([ id ])
        .then( result => {
            res.send(result)
        })
        .catch(console.log)
    },
    read_receiver: ( req, res ) => {
        let { id } = req.params;
        req.app.get('db').get_messages_receiver([ id ])
        .then( result => {
            res.send(result)
        })
        .catch(console.log)
    },
    read: (req, res ) => {
        let { messageid } = req.params;
        req.app.get('db').get_messages([ messageid ]).then(messages => {
            const messagesArr = [];
            messages.map( e => {
            messagesArr.push(JSON.parse(e.messages))
            return messagesArr;
        }
    )
    res.send(messagesArr) 
        })
        .catch(err => console.log(err))
    }

}