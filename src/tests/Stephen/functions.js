const axios = require('axios')

module.exports = {
    getTag: (id)=>{
        axios.get(`api/get_current_tool_tag/${id}`)
        .then(res=>{
            return res.data.tag
        }).catch(err=>console.log(err))
    },
    getUser: ()=>{
        return axios.get('/api/user-data')
        .then(res=>{
            return res.data
        })
    },
    getZip: ()=>{
       let zip
        axios.get(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=38.964340&lng=-0.559150&username=stepace`)
        .then(res=>{
            zip =res.data.postalCodes[0].postalCode
        }).catch(err=>console.log(err))
        return zip
    },
    filter: ()=>{
        let allTools = [{tool: 'hammer', type: 'handTool' }, {tool: 'drill', type: 'powerTool'}, {tool: 'saw', type: 'powerTool'}, {tool: 'screwdriver', type: 'handTool'}]
        let toolsWithSameType = allTools.filter(tool=>{
                return tool.type === 'handTool'
        })
        return toolsWithSameType;
    },
    modifyState: ()=>{
        let state = {a: 1, b: 2, c: 3}
        let updates = {b: 3, c: 4}
        let newState = Object.assign(state, updates)
        return newState;
    }
}