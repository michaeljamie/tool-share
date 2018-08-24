module.exports = {
    read_reservation_dates: ( req, res ) => {
        
        let { tool_id } = req.params
        
        req.app.get('db').get_dates([ tool_id ]).then( result => {
            res.send(result)
        })
        .catch(console.log)
    },
    add_reservation: (req, res) => {
        console.log(req.session.user)
        let {tool_id,
            pickup_date,
            return_date    
        }   = req.body;
        let {userid} = req.session.user;
        req.app.get('db').create_reservation([tool_id, pickup_date, return_date, userid])
        .then(result=>{
            res.send(result)
        }).catch(err=>{
            console.log(err)
        })
    }
}