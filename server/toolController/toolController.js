module.exports = {

    select_all_tools: ( req, res ) => {
        req.app.get('db').select_all_tools()
        .then( tools => {
            res.status(200).send(tools)
        })
        .catch(err => console.log(err))
    },

    select_tool_by_tags: (req, res) => {
       const {tag} = req.query;
        req.app.get('db').select_tool_by_tags([tag])
        .then( tools => {
            res.status(200).send(tools)
        })
    },

    select_tool_and_owner: (req, res, next) => {
        const {id} = req.params;
        req.app.get('db').select_tool_and_owner([id])
          .then(tool => { res.status(200).send(tool[0]) 
        })
        .catch(err => console.log(err))
    },

    select_all_tools_user_is_renting: (req, res) => {
        const {userid} = req.params;
        req.app.get('db').select_all_tools_user_is_renting([userid])
        .then(tools => {
            res.status(200).send(tools)
        })
    },

    select_all_tools_user_has_listed: (req, res) => {
        const {userid} = req.params;
        req.app.get('db').select_all_tools_user_has_listed([userid])
        .then(tools => {
            res.status(200).send(tools)
        })
    }
    
}
