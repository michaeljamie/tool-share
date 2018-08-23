module.exports = {
    read_reservation_dates: ( req, res ) => {
        
        let { tool_id } = req.params
        
        req.app.get('db').get_dates([ tool_id ]).then( result => {
            res.send(result)
        })
        .catch(console.log)
    },
}