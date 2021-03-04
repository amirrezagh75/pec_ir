let axios = require("axios")

module.exports = {
    sendReq :(url , info)=>{
        return new Promise( (resolve,reject)=>{
            axios.post(url , info , {headers: {'Content-Type': 'text/xml'}})
            .then(res=>resolve(res.data))
            .catch(err=>reject(err))
        })
    }
}