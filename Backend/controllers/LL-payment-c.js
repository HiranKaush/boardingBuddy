const Payment = require('../models/LL-payment');

const makePayment = async (req, res) => {
    try {
      const { cardNumber  } = req.body;
      const payments = new Payment({ cardNumber });
      const savedPayment = await payments.save();
      res.status(201).json(savedPayment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports = {makePayment};