module.exports = {
    test: ()=>{
        return "test"
    },
    getUser: ()=>{
        return axios.get('/api/user-data')
    }
}