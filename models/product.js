var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrdSchema = new Schema({
    asin: { type: String, required: true },
    title: String,
    imgUrl: String,
    stars: Number,
    reviews: Number,
    price: Number,
    listPrice: Number,
    categoryName: String,
    isBestSeller: Boolean,
    boughtInLastMonth: Number
});

module.exports = mongoose.model('Product', PrdSchema);
