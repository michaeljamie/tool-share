module.exports = {
    get_tool_names: (req, res) => {
        req.app.get('db').get_tool_names()
        .then(tools => {
            
            res.status(200).send(tools)
        })
        .catch(err => console.log(err))
    },

    get_tools_by_search: (req, res) => {
        const {tool_id} = req.body;
        req.app.get('db').get_tools_by_search([tool_id])
        .then( tools=>{
            res.status(200).send(tools)
        }).catch(err=>console.log(err))
    },

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

    get_tool_tags: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_tool_tags([id])
        .then( tags => {res.status(200).send(tags)})
        .catch(err => console.log(err))
    },

    get_all_tools_with_tags: (req, res) => {
        req.app.get('db').get_all_tools_with_tags()
        .then( tools => {
            res.status(200).send(tools)
        }).catch(err=>console.log(err))
    },

    get_all_tags: (req, res) => {
        req.app.get('db').get_all_tags()
        .then( (tools) => {res.status(200).send(tools)})
        .catch( err => console.log(err))
    },

    get_current_tool_tag: (req, res) => {
       
        const {id} = req.params;
        req.app.get('db').get_current_tool_tag([id])
        .then ( tag => {
            res.status(200).send(tag)
        }).catch(err=>console.log(err))
    },

    get_similar_tools: (req, res) => {
        const {toolId} = req.body
        
        req.app.get('db').get_similar_tools(toolId)
        .then (tools => {
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
            description,
            times_rented,
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
            depositInt,
            currently_available
        } = req.body
        req.app.get('db').post_tool([
            owner,
            name,
            description,
            times_rented,
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
            depositInt,
            currently_available
        ])
        .then( (tool) => res.status(200).send(tool[0]) )
        .catch(err => console.log(err))
    },

    post_tags: (req, res, next) => {
        console.log('tags method hit')
        const {
            tool_id,
            drill,
            hammer,
            hammer_drill,
            jack_hammer,
            sander,
            grinder,
            auger,
            saw,
            mower,
            trimmer,
            ladder,
            welding,
            air_compressor,
            vacuum, 
            pressure_washer,
            ratchet,
            wrench,
            lawn_tool
         } = req.body
         console.log(req.body)
         req.app.get('db').post_tags([
            tool_id,
            drill,
            hammer,
            hammer_drill,
            jack_hammer,
            sander,
            grinder,
            auger,
            saw,
            mower,
            trimmer,
            ladder,
            welding,
            air_compressor,
            vacuum, 
            pressure_washer,
            ratchet,
            wrench,
            lawn_tool
         ])
         .then( () => res.status(200).send('Tags Posted') )
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
    },

    update_tool: (req, res, next) => {
        console.log('update_tool hit')
        console.log('update_tool params:',req.params.id)
        const {id} = req.params
        const {
            name,
            image,
            description,
            priceInt,
            depositInt,
            condition,
            forRent,
            forSale,
            delivery,
            pickup,
            powerTool,
            powerType,
            requiresFuel,
            fuelType
        } = req.body
        console.log(req.body)
        req.app.get('db').update_tool([
            name,
            image,
            description,
            priceInt,
            depositInt,
            condition,
            forRent,
            forSale,
            delivery,
            pickup,
            powerTool,
            powerType,
            requiresFuel,
            fuelType,
            id
        ])
        .then( (tool) => res.status(200).send(tool[0]) )
        .catch(err => console.log(err))
    },

    update_tags: (req, res, next) => {
        console.log('update tags method hit')
        const {id} = req.params;
        const {
            drill,
            hammer,
            hammer_drill,
            jack_hammer,
            sander,
            grinder,
            auger,
            saw,
            mower,
            trimmer,
            ladder,
            welding,
            air_compressor,
            vacuum, 
            pressure_washer,
            ratchet,
            wrench,
            lawn_tool
         } = req.body
         console.log('just before sql file')
         console.log(req.body)
         console.log('update_tags params:',req.params.id)
         req.app.get('db').update_tags([
            drill,
            hammer,
            hammer_drill,
            jack_hammer,
            sander,
            grinder,
            auger,
            saw,
            mower,
            trimmer,
            ladder,
            welding,
            air_compressor,
            vacuum, 
            pressure_washer,
            ratchet,
            wrench,
            lawn_tool,
            id
         ])
         .then( () => res.status(200).send('Tags Updated') )
         .catch(err => console.log(err))
    },
    
    return_tool: (req, res) => {
        const {id} = req.params;
        console.log(id)
        req.app.get('db').return_tool([id])
        .then( () => res.status(200).send('Tool Returned') )
        .catch(err => console.log(err))
    },

    delete_tool: (req, res) => {
        const {id} = req.params;
        req.app.get('db').delete_tool([id]).then(() => {
            res.end();
        })
    },

    delete_tags: (req, res) => {
        const {id} = req.params;
        req.app.get('db').delete_tags([id]).then(() => {
            res.end();
        })
    }

}