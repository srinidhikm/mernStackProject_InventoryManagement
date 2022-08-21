const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
    {
        vendorname:
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
        vphno:
        {
            type: String,
            require: true
        }
        
    }
)

const Vendors = mongoose.model('VENDOR', vendorSchema);
module.exports = Vendors;