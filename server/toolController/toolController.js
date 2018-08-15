module.exports = {

    select_all_tools: ( req, res ) => {
        req.app.get('db').select_all_tools()
        .then( tools => {
            res.status(200).send(tools)
        })
        .catch(err => console.log(err))
    },

    select_tool_and_owner: (req, res, next) => {
        const {id} = req.params;
        req.app.get('db').select_tool_and_owner([id])
          .then(tool => { res.status(200).send(tool[0]) 
        })
        .catch(err => console.log(err))
    },

}
