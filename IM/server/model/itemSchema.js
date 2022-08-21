const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema(
    {
        itemname:
        {
            type: String,
            require: true
        },
        unit:
        {
            type: String,
            require: true
        },
        sellingprice:
        {
            type: Number,
            require: true
        },
        costprice:
        {
            type: Number,
            require: true
        },
        dimension:
        {
            type: String,
            require: true
        },
        weight:
        {
            type: String,
            require: true
        },
        manufacturer:
        {
            type: String,
            require: true
        },
        brand:
        {
            type: String,
            require: true
        },
        description:
        {
            type: String,
            require: false
        },
        openingstock:
        {
            type: Number,
            require: true
        },
        reorderpoint:
        {
            type: Number,
            require: true
        },
        quantity:
        {
            type: Number,
            require: true
        },

        preferredvendor:
        {
            type: String,
            require: false
        },
        category:
        {
            type: String,
            require: true
        },
        edate:
        {
            type: Date,
            require: false
        },
        itemimg:
        {
            type: String,
            require: true
        },
        ereason:
        {
            type: String,
            required: false
        }
    }
)





// Creating collection
const AllItems = mongoose.model('ITEM', itemSchema);
module.exports = AllItems;