module.exports = {
    updateTool: (req, res) => {
        const {id} = req.params;
        const {renter_id} = req.body;
        req.app.get('db').update_tool_data([id, renter_id])
        .then( () => {
            res.status(200)
        })
    }
}