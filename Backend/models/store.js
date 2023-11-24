const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    }
});

const reviewSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    }
});

const offerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false
    },
    from: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: false
    },
    details: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },    
});


const storeSchema = new Schema({

    userId: {
        type: String,
        required: false,
    },
    storeAddress: {
        type: String,
        required: false,
    },
    businessType: {
        type: String,
        required: false,
    },
    storeName: {
        type: String,
        required: false,
    },
    storeDescription: {
        type: String,
        required: false,
    },
    storeImage: {
        type: String,
        required: false,
    },
    storeRating: {
        type: String,
        required: false,
    },
    storeEmail: {
        type: String,
        required: false,
    },
    storeHotline: {
        type: String,
        required: false,
    },
    openingHours: {
        type: String,
        required: false,
    },
    closingHours: {
        type: String,
        required: false,
    },
    isPremium: {
        type: Boolean,
        required: false,
    },
    menu : [itemSchema],
    offer : [offerSchema],
    review : [reviewSchema],
 });

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
