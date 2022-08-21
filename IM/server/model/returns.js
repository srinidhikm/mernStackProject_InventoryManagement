const mongoose = require('mongoose');

const returns = new mongoose.Schema(
    {
        customername:
        {
            type: String,
            require: true
        },
        
        itemname:
        {
            type: String,
            require: true
        },
        rquantity:
        {
            type: Number,
            require: true
        },
        amountret:
        {
            type: Number,
            require: true
        },
        reasonret:
        {
            type: String
        }
    }
)

const Returns = mongoose.model('RETURN', returns);
module.exports = Returns;