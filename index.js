'use strict'

let {sale} = require("./services/sale"),
    {confirm} = require("./services/confirm"),
    {reversal} = require("./services/reversal")


module.exports = (PIN)=>{
    module.sale = sale(PIN),
    module.confirm = confirm(PIN),
    module.reversal =reversal(PIN)
    return module
}