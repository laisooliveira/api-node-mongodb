const mongoose = require('../../bin/db');

const RecicleSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
      },
});



const Recicle = mongoose.model('Recicle', RecicleSchema);

module.exports = Recicle;
