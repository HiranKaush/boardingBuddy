const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
  cardHolderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: Number,
    required:true, 
  },
  expireDate:{
    type:String,
    required:true,
  },
  cvv:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model('card', cardSchema);



