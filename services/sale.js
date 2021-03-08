'use strict'
let xmlParser = require("fast-xml-parser")
let {sendReq}  = require("../helpers")
const url = 'https://pec.shaparak.ir/NewIPGServices/Sale/SaleService.asmx'

function sale (pin) {

    let payment = (info)=> {
        return new Promise(async (resolve,reject)=>{
            if(info && info.Amount && info.OrderId && info.CallBackUrl){
                let xmls = 
                `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:sal="https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService">
                    <soap:Header/>
                    <soap:Body>
                        <sal:SalePaymentRequest>
                            <sal:requestData>
        
                                <sal:LoginAccount>${pin}</sal:LoginAccount>
                                <sal:Amount>${info.Amount}</sal:Amount>
                                <sal:OrderId>${info.OrderId}</sal:OrderId>
                                <sal:CallBackUrl>${info.CallBackUrl}</sal:CallBackUrl>
                                ${info.AdditionalData ?'<sal:AdditionalData>'+info.AdditionalData+'</sal:AdditionalData>' : ''}
                                ${info.Originator ? '<sal:Originator>'+info.Originator+'</sal:Originator>' : ''}
        
                            </sal:requestData>
                        </sal:SalePaymentRequest>
                    </soap:Body>
                </soap:Envelope>`
        
                let data = await sendReq(url , xmls)
                .then(res=>{return xmlParser.parse(res)['soap:Envelope']['soap:Body']['SalePaymentRequestResponse']['SalePaymentRequestResult']})
                .catch(err=>reject(err))
                data.link = `https://pec.shaparak.ir/NewIPG/?token=${data.Token}`
                
                resolve(data)
            }
            else reject('please provide "Amount" , "OrderId" and "CallBackUrl" in an object. Also you can add "AdditionalData" and "Originator" ')
        })
    },
    
    paymentWithDiscount = (info)=>{
        return new Promise(async (resolve,reject)=>{
            if(info && info.Amount && info.OrderId && info.CallBackUrl){
                let products=''
                let xmls = 
                `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:sal="https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService">
                    <soap:Header/>
                    <soap:Body>
                        <sal:SalePaymentWithDiscount>
                            <sal:requestData>
        
                                <sal:LoginAccount>${pin}</sal:LoginAccount>
                                <sal:Amount>${info.Amount}</sal:Amount>
                                <sal:OrderId>${info.OrderId}</sal:OrderId>
                                <sal:CallBackUrl>${info.CallBackUrl}</sal:CallBackUrl>
                                ${info.AdditionalData ?'<sal:AdditionalData>'+info.AdditionalData+'</sal:AdditionalData>' : ''}
                                ${info.Originator ? '<sal:Originator>'+info.Originator+'</sal:Originator>' : ''}
                                <sal:DiscountProduct>
                                ${info.Product ? info.Product.forEach(product=>{
                                    if(product.PGroupId && product.Amount)
                                        products += `
                                        <sal:Product>
                                            <sal:PGroupId>${product.PGroupId}</sal:PGroupId>
                                            <sal:Amount>${product.Amount}</sal:Amount>
                                        </sal:Product>`
                                }) :''}
                                ${products}
                                </sal:DiscountProduct>
                            </sal:requestData>
                        </sal:SalePaymentWithDiscount>
                    </soap:Body>
                </soap:Envelope>`
    
                let data = await sendReq(url ,xmls)
                .then(res=>{return xmlParser.parse(res)['soap:Envelope']['soap:Body']['SalePaymentWithDiscountResponse']['SalePaymentWithDiscountResult']})
                .catch(err=>reject(err))
                data.link = `https://pec.shaparak.ir/NewIPG/?token=${data.Token}`
                
                resolve(data)
            }
            else reject('please provide "Amount", "OrderId" and "CallBackUrl" in an object. Also, you can add "AdditionalData", "Originator" and a list of "Product" which contains "PGroupId" and "Amount" in them')
        })
    },
    
    paymentWithId = (info)=>{
        return new Promise(async (resolve,reject)=>{
            if(info && info.Amount && info.OrderId && info.CallBackUrl){
                let xmls = 
                `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:sal="https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService">
                    <soap:Header/>
                    <soap:Body>
                        <sal:SalePaymentWithId>
                            <sal:requestData>
        
                                <sal:LoginAccount>${pin}</sal:LoginAccount>
                                <sal:Amount>${info.Amount}</sal:Amount>
                                <sal:OrderId>${info.OrderId}</sal:OrderId>
                                <sal:CallBackUrl>${info.CallBackUrl}</sal:CallBackUrl>
                                ${info.AdditionalData ?'<sal:AdditionalData>'+info.AdditionalData+'</sal:AdditionalData>' : ''}
                                ${info.Originator ? '<sal:Originator>'+info.Originator+'</sal:Originator>' : ''}
        
                            </sal:requestData>
                        </sal:SalePaymentWithId>
                    </soap:Body>
                </soap:Envelope>`
        
                let data = await sendReq(url , xmls)
                .then(res=>{return xmlParser.parse(res)['soap:Envelope']['soap:Body']['SalePaymentWithIdResponse']['SalePaymentWithIdResult']})
                .catch(err=>reject(err))
                data.link = `https://pec.shaparak.ir/NewIPG/?token=${data.Token}` 
                
                resolve(data)
            }
            else reject('please provide "Amount" , "OrderId" and "CallBackUrl" in an object. Also you can add "AdditionalData" and "Originator" ')
        })
    },
    
    udPaymentRequest = (info)=>{
        return new Promise(async (resolve,reject)=>{
            if(info && info.Amount && info.OrderId && info.CallBackUrl){
                let xmls = 
                `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:sal="https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService">
                    <soap:Header/>
                    <soap:Body>
                        <sal:UDSalePaymentRequest>
                            <sal:requestData>
        
                                <sal:LoginAccount>${pin}</sal:LoginAccount>
                                <sal:Amount>${info.Amount}</sal:Amount>
                                <sal:OrderId>${info.OrderId}</sal:OrderId>
                                <sal:CallBackUrl>${info.CallBackUrl}</sal:CallBackUrl>
                                ${info.AdditionalData ?'<sal:AdditionalData>'+info.AdditionalData+'</sal:AdditionalData>' : ''}
                                ${info.Originator ? '<sal:Originator>'+info.Originator+'</sal:Originator>' : ''}
        
                            </sal:requestData>
                        </sal:UDSalePaymentRequest>
                    </soap:Body>
                </soap:Envelope>`
        
                let data = await sendReq(url , xmls)
                .then(res=>{return xmlParser.parse(res)['soap:Envelope']['soap:Body']['UDSalePaymentRequestResponse']['UDSalePaymentRequestResult']})
                .catch(err=>reject(err))
                data.link = `https://pec.shaparak.ir/NewIPG/?token=${data.Token}`
                
                resolve(data)
            }
            else reject('please provide "Amount" , "OrderId" and "CallBackUrl" in an object. Also you can add "AdditionalData" and "Originator" ')
        })
    }
    return {
        payment,
        paymentWithDiscount,
        paymentWithId,
        udPaymentRequest
    }
}


module.exports = {
    sale
}