module.exports = {
    updateTool: (req, res) => {
        console.log('req.params=', req.params)
        console.log('req.body=', req.body)
        const {tool_id} = req.params;
        const {renter_id} = req.body;
        req.app.get('db').update_tool_data([tool_id, renter_id])
        .then( response => {
            res.status(200)
        })
    }
}