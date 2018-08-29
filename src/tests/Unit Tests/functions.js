const axios = require('axios')

module.exports = {

    test: ()=>{
        return "test"
    },

    getUser: ()=>{
        return axios.get('/api/user-data/')
        .then(res=>{
            return res.data
        }).catch(err=>console.log(err))
    },
    getTags: ()=>{
        return axios.get('/api/get_all_tags/')
        .then(res=>{
            return res.data
        }).catch(err=>console.log(err))
    },

    getTagById: (id)=>{
        return axios.get('http://localhost:3005/api/get_current_tool_tag/' + id)
        .then(res=>{
            return res.data
        }).catch(err=>console.log(err))   
    },

    getUserData: (id) => {
        return axios.get('http://localhost:3005/api/userData/' + id)
        .then(res => {
            return res.data
        }).catch(err=>console.log(err))   
    },

    getUsersListedTools: (id) => {
        return axios.get('http://localhost:3005/api/usersListedTools/' + id)
        .then(res => {
            return res.data
        }).catch(err=>console.log(err))
    },
    
    getAllUsers: () => {
       return axios.get('http://localhost:3005/api/users').then( res => {
            return res.data
        }).catch(err=>console.log(err))
    }
}