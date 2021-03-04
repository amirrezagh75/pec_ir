English | [فارسی](./README_fa.md)

# Parsian E-commerce(pec.ir) api
[![Generic badge](https://img.shields.io/badge/Requirment-npm-green.svg)](https://www.npmjs.com/get-npm)    
[![Generic badge](https://img.shields.io/badge/IPG-pec-blue.svg)](https://pec.ir/)

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/amirrezagh75/pec_ir)


This is a Node Js package for using pec.ir APIs which will help you to make a payment request, payment verification request, and payment reversal request easily.
## How to install?
```
npm install pec_ir

```
## How to use?
```
let pec = require("pec_ir")("your PIN")

pec.sale.payment({"Amount":20000 ,  "OrderId" : 101112 , CallBackUrl: "https://example.com/confirmPayment"})
```
This package includes 3 main functions: ``` sale```, ``` confirm ``` and ``` reversal ``` and each one of them has its own sub-functions

## ```sale``` sub-functions

For these sub-functions, you have to send an object with named keys. **Be careful, all the keys are case sensitive**

| sub-function name| required keys :white_check_mark:| optional keys :large_blue_circle:|
| -------------         |    -------------      |  ------------- |
|    payment |   "Amount" , "OrderId" , "CallBackUrl"   |  "AdditionalData" , "Originator"   |
|   paymentWithDiscount |   "Amount" , "OrderId" , "CallBackUrl" and array of "Product" which include "PGroupId" and "Amount"  |  "AdditionalData" , "Originator"   |
|   paymentWithId |   "Amount" , "OrderId" , "CallBackUrl"   |  "AdditionalData" , "Originator"   |
|   udPaymentRequest |   "Amount" , "OrderId" , "CallBackUrl"   |  "AdditionalData" , "Originator"   |


### e.g.
```
let pec = require("pec_ir")("your PIN")

let data = pec.sale
.paymentWithDiscount({ 
    Amount :200000, 
    OrderId:101112,
    CallBackUrl : "https://example.com/confirmPayment", 
    Product : [  { PGroupId : 20221554 , Amount : 50000 } , { PGroupId : 20221553 , Amount : 40000 }]  })
.then(data=>{console.log(data)})
.catch(err=>{})

// { Token: 203040,  Message: '',  Status: 200,  link: 'https://pec.shaparak.ir/NewIPG/?token=203040' }
```
* for knowing more about the status code please read the official documents

## ```confirm``` sub-functions

For these sub-functions, you need to send the token except the last one which needs an object with the keys. **Be careful, all the keys are case sensitive**

| sub-function name| required keys :white_check_mark:| optional keys :large_blue_circle:|
| -------------         |    -------------      |  ------------- |
|  payment |  token |  -- |
|  paymentWithAddData |  token |  -- |
|  paymentWithAmount |  "Token" , "OrderId" , "Amount" |  -- |


### e.g. 
```
let pec = require("pec_ir")("your PIN")

pec.confirm
.payment(2022254)
.then(data=>{console.log(data)})
.catch(err=>{})

// { Status: 200,  Message: '', Token: 0 }
```
## ```reversal``` sub-function
This function includes only one sub-function which requires a token.


| sub-function name| required keys :white_check_mark:| optional keys :large_blue_circle:|
| -------------         |    -------------      |  ------------- |
|  request |  token |  -- |

### e.g. 

```
let pec = require("pec_ir")("your PIN")

pec.reversal
.request(2022254)
.then(data=>{console.log(data)})
.catch(err=>{})

// { Status: 200,  Message: '', Token: 0 }
```
