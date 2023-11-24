const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/LL-payment-c')


router.post('/payments', paymentController.makePayment);

module.exports = router;
