const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
    {
        customername:
        {
            type: String,
            require: true
        },
        address:
        {
            type: String,
            require: true
        },
        cid:
        {
            type: String
        },
        itemname:
        {
            type: String,
            require: true
        },
        squantity:
        {
            type: Number,
            require: true
        },
        shipcost:
        {
            type: Number,
            require: true
        },
        amount:
        {
            type: Number,
            require: true
        },
        pamount:
        {
            type: Number,
            require: true
        },
        sodate:
        {
            type: Date,
            require: true
        },
        status:
        {
            type: String,
            require: true
        }
    }
)

const Salesorders = mongoose.model('SALESORDER', salesSchema);
module.exports = Salesorders;