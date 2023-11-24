// routes/cardRoutes.js
const express = require('express');
const cardController = require('../controllers/LL-card-c');
const router = express.Router();

// Add a new card
router.post('/cards', cardController.addNewCard);

// Delete a card by ID
router.delete('/cards/:id', cardController.deleteCard);

// Get all cards
router.get('/cards', cardController.getAllCards);

// Get a card by ID
router.get('/cards/:id', cardController.getCardById);

module.exports = router;
