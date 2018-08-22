const axios = require('axios')

module.exports = {
    test: ()=>{
        return "test"
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
}