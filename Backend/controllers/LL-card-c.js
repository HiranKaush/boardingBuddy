// controllers/cardController.js
const Card = require('../models/LL_card');

// Add a new card
const addNewCard = async (req, res) => {
    try {
      const { email, cardHolderName, cardNumber, expireDate, cvv } = req.body;
      const card = new Card({ email, cardHolderName, cardNumber, expireDate, cvv});
      const savedCard= await card.save();
      res.status(201).json(savedCard);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Delete a card by ID
const deleteCard= async (req, res) => {
  try {
    const { id } = req.params;
    await Card.findByIdAndRemove(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all cards
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a card by ID
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    addNewCard,
  deleteCard,
  getAllCards,
  getCardById,
};
