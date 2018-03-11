const mongoose = require('../../bin/db');

const ProductSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});



const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
