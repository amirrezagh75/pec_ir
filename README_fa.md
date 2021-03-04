فارسی | [English](./README.md)

# Parsian E-commerce(PEC.ir) bank api

[![Generic badge](https://img.shields.io/badge/Requirment-npm-green.svg)](https://www.npmjs.com/get-npm)  
[![Generic badge](https://img.shields.io/badge/IPG-pec-blue.svg)](https://pec.ir/)

این پکیج برای استفاده از درگاه پرداختی تجارت الکترونیک پارسیان می باشد و به شما امکان درخواست پرداخت، درخواست تاییدیه و درخواست بازگشت پرداخت را می دهد.

## چگونه نصب کنیم؟

```
npm install pec_ir

```

## چگونه استفاده کنیم؟

```
let pec = require("pec_ir")("your PIN")

pec.sale.payment({"Amount":20000 ,  "OrderId" : 101112 , CallBackUrl: "https://example.com/confirmPayment"})
```

این پکیج شامل سه عملکرد اصلی می باشد که در زیر به آنها اشاره کرده ایم. هریک از توابع دارای توابع درونی می باشند.

## `sale` sub-functions

برای این توابع که در جدول زیر به آنها اشاره کرده ایم باید آبجکتی به همراه کلید های ذکر شده ارسال شوند. _ توجه داشته باشید که کلیدها به حروف بزرگ کوچک حساس اند _

| sub-function name        | required keys :white_check_mark:                                                                  | optional keys :large_blue_circle: |
| ------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------- |
| payment                  | "Amount" , "OrderId" , "CallBackUrl"                                                              | "AdditionalData" , "Originator"   |
| \*\* paymentWithDiscount | "Amount" , "OrderId" , "CallBackUrl" and array of "Product" which include "PGroupId" and "Amount" | "AdditionalData" , "Originator"   |
| \*\* paymentWithId       | "Amount" , "OrderId" , "CallBackUrl"                                                              | "AdditionalData" , "Originator"   |
| \*\* udPaymentRequest    | "Amount" , "OrderId" , "CallBackUrl"                                                              | "AdditionalData" , "Originator"   |

### مثال

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

- برای اطلاعات بیشتر در مورد کد وضعیت، لطفا مستندات رسمی مطالعه شوند

## `confirm` sub-functions

برای توابع زیر که در جدول آمده اند کافی است کلید دریافتی را ارسال نمایید. البته به غیر از مورد آخر که نیاز به ارسال آبجکت به همراه کلیدهای ذکر شده دارد. _ توجه داشته باشید که کلیدها به حروف بزرگ و کوچک حساس اند _

| sub-function name  | required keys :white_check_mark: | optional keys :large_blue_circle: |
| ------------------ | -------------------------------- | --------------------------------- |
| payment            | token                            | --                                |
| paymentWithAddData | token                            | --                                |
| paymentWithAmount  | "Token" , "OrderId" , "Amount"   | --                                |

### مثال

```
let pec = require("pec_ir")("your PIN")

pec.confirm
.payment(2022254)
.then(data=>{console.log(data)})
.catch(err=>{})

// { Status: 200,  Message: '', Token: 0 }
```

## `reversal` sub-functions

این تابع فقط شامل یک زیر تابع است که کافی است تا توکن دریافت شده را به آن بدهید.

| sub-function name | required keys :white_check_mark: | optional keys :large_blue_circle: |
| ----------------- | -------------------------------- | --------------------------------- |
| request           | token                            | --                                |

### مثال

```
let pec = require("pec_ir")("your PIN")

pec.reversal
.request(2022254)
.then(data=>{console.log(data)})
.catch(err=>{})

// { Status: 200,  Message: '', Token: 0 }
```
