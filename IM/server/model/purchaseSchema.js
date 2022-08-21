const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
    {
        vendorname:
        {
            type: String,
            require: true
        },
        itemname:
        {
            type: String,
            require: true
        },
        pquantity:
        {
            type: Number,
            require: true
        },
        purchamt:
        {
            type:Number,
            require: false,
        }
        
    }
)

const Purchases = mongoose.model('PURCHASE', purchaseSchema);
module.exports = Purchases;