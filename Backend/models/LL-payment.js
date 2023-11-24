const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    default: 1500, 
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
