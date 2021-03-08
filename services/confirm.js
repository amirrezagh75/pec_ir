'use strict'
let xmlParser = require("fast-xml-parser"),
    {sendReq}  = require("../helpers")
const url = 'https://pec.shaparak.ir/NewIPGServices/Confirm/ConfirmService.asmx';

function confirm(pin){

    let payment = (token)=>{
        return new Promise(async (resolve,reject)=>{
            if(token){
                let xmls = 
                `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:con="https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService">
                    <soap:Header/>
                    <soap:Body>
                    <con:ConfirmPayment>
                        <con:requestData>
                            <con:LoginAccount>${pin}</con:LoginAccount>
                            <con:Token>${token}</con:Token>
                        </con:requestData>
                    </con:ConfirmPayment>
                </soap:Body>
                </soap:Envelope>`
        
                let data = await sendReq(url , xmls).then(res=>{return xmlParser.parse(res)['soap:Envelope']['soap:Body']['ConfirmPaymentResponse']['ConfirmPaymentResult'] }).catch(err=>reject(err))
                resolve(data)
            }
            else reject('please provide a token')
        })
    },
    
    paymentWithAddData = (token)=>{
    return new Promise(async (resolve,reject)=>{
        if(token){
            let xmls = 
            `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:con="https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService">
                <soap:Header/>
                <soap:Body>
                <con:ConfirmPaymentWithAddData>
                    <con:requestData>
                        <con:LoginAccount>${pin}</con:LoginAccount>
                        <con:Token>${token}</con:Token>
                    </con:requestData>
                </con:ConfirmPaymentWithAddData>
            </soap:Body>
            </soap:Envelope>`
    
            let data = await sendReq(url , xmls).then(res=>{return xmlParser.parse(res)['soap:Envelope']['soap:Body']['ConfirmPaymentWithAddDataResponse']['ConfirmPaymentWithAddDataResult']}).catch(err=>reject(err))

            resolve(data)
        }
        else reject('please provide a token')
    })
    },

    paymentWithAmount = (info)=>{
    return new Promise(async (resolve,reject)=>{
        if(info && info.token && info.OrderId && info.Amount){
            let xmls = 
            `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:con="https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService">
                <soap:Header/>
                <soap:Body>
                <con:ConfirmPaymentWithAmount>
                    <con:requestData>
                        <con:LoginAccount>${pin}</con:LoginAccount>
                        <con:Token>${info.Token}</con:Token>
                        <con:OrderId>${info.OrderId}</con:OrderId>
                        <con:Amount>${info.Amount}</con:Amount>                
                    </con:requestData>
                </con:ConfirmPaymentWithAmount>
            </soap:Body>
            </soap:Envelope>`
    
            let data = await sendReq(url , xmls).then(res=>{return xmlParser.parse(res)['soap:Envelope']['soap:Body']['ConfirmPaymentWithAmountResponse']['ConfirmPaymentWithAmountResult'] }).catch(err=>reject(err))

            resolve(data)
        }
        else reject('please provide "Token" , "OrderId" and "Amount" in an object ')
    })
    }

    return{
        payment,
        paymentWithAddData,
        paymentWithAmount
    }
}
module.exports = {
    confirm
}