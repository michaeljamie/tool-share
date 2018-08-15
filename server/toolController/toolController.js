module.exports = {

    select_all_tools: ( req, res ) => {
        req.app.get('db').select_all_tools()
        .then( data => {
            res.status(200).send(data)
        })
        .catch(err => console.log(err))
    },

}
