const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type:String, required:true},
    price : {type:Number, required:true},
    description: {type:String},
    category: {type:String},
    image: {type:String},
    stock: {type:Number, default:1},
    createdAt: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Product', productSchema);