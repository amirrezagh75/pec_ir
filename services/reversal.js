'use strict'
let xmlParser = require("fast-xml-parser")
let {sendReq}  = require("../helpers")
const url = 'https://pec.shaparak.ir/NewIPGServices/Reverse/ReversalService.asmx'

let reversal = (pin)=>{

    let request = (token)=>{
        
        return new Promise(async (resolve,reject)=>{
            if(token){
                let xmls = 
                `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:rev="https://pec.Shaparak.ir/NewIPGServices/Reversal/ReversalService">
                    <soap:Header/>
                    <soap:Body>
                    <rev:ReversalRequest>
                        <rev:requestData>
                            <rev:LoginAccount>${pin}</rev:LoginAccount>
                            <rev:Token>${token}</rev:Token>
                        </rev:requestData>
                    </rev:ReversalRequest>
                </soap:Body>
                </soap:Envelope>`
        
                let data = await sendReq(url , xmls).then(res=>{return xmlParser.parse(res)['soap:Envelope']['soap:Body']['ReversalRequestResponse']['ReversalRequestResult']}).catch(err=>reject(err))
                
                resolve(data)
            }
            else reject('please provide the token')
        })
    }

    return{
        request
    }
}

module.exports = {
    reversal
}