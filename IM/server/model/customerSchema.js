const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
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
        email:
        {
            type: String,
            require: true
        },
        sales:
        {
            type:Number,
            require: false,
            default: 0
        }
        
    }
)

const Customers = mongoose.model('CUSTOMER', customerSchema);
module.exports = Customers;