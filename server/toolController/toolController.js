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
        }).catch(err => console.log(err))
    },

    get_tags: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_tags([id])
        .then( tags => {
            res.status(200).send(tags)
        }).catch(err => console.log(err))
    },

    get_all_tools_with_tags: (req, res) => {
        req.app.get('db').get_all_tools_with_tags()
        .then( tools => {
            res.status(200).send(tools)
        }).catch(err=>console.log(err))
    },

    select_tool_and_owner: (req, res, next) => {
        const {id} = req.params;
        req.app.get('db').select_tool_and_owner([id])
          .then(tool => { res.status(200).send(tool[0]) 
        })
        .catch(err => console.log(err))
    },

    post_tool: (req, res, next) => {
       const {
            owner,
            name,
            type,
            description,
            condition,
            for_rent,
            for_sale,
            delivery_avail,
            pickup_avail,
            power_tool,
            power_type,
            requires_fuel,
            fuel_type,
            tool_img,
            priceInt,
            depositInt
        } = req.body
        req.app.get('db').post_tool([
            owner,
            name,
            type,
            description,
            condition,
            for_rent,
            for_sale,
            delivery_avail,
            pickup_avail,
            power_tool,
            power_type,
            requires_fuel,
            fuel_type,
            tool_img,
            priceInt,
            depositInt
        ])
        .then( () => { res.status(200).send('Tool Posted') 
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