const Store = require('../models/store');


// Create a new store
exports.createStore = async (req, res) => {
  try {
    
    const {userId, storeAddress, businessType, storeName, storeDescription, storeImage, storeRating, storeEmail, storeHotline, openingHours, closingHours} = req.body;

    const isPremium = false;

    const newMenu = [];
    const newOffer = [];
    const newReview = [];

    const store = Store({
        userId, 
        storeAddress, 
        businessType, 
        storeName, 
        storeDescription, 
        storeImage, 
        storeRating, 
        storeEmail, 
        storeHotline, 
        openingHours, 
        closingHours, 
        isPremium,
        menu: newMenu,
        offer: newOffer,
        review: newReview,
    });
    
    const savedStore = await store.save();
    res.status(201).json(savedStore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Item to menu
exports.addItemToMenu = async (req, res) => {
  const { uid } = req.params;
  const { name, price, image} = req.body;

  try {
    const store = await Store.findOne({userId: uid});

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    // Create a new menu item
    const newItem = { image, name, price};

    store.menu.push(newItem);

    // Save the updated store with the new menu item
    await store.save();

    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addOfferToStore = async (req, res) => {
  const { uid } = req.params;
  const { image, from, to, details, price } = req.body;

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const newOffer = { image, from, to, details, price };
    store.offer.push(newOffer);

    await store.save();

    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReviewToStore = async (req, res) => {
  const { uid } = req.params;
  const { userid, name, message } = req.body;

  try {
    const store = await Store.findOne({userId: uid});
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const newReview = { userid, name, message };
    store.review.push(newReview);

    await store.save();

    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStoreImage = async (req, res) => {
  const { uid } = req.params;
  const {imgURL} = req.body;
  try {
    const store = await Store.findOne({userId: uid});
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }
    store.storeImage = imgURL;

    await store.save();

    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStoreById = async (req, res) => {
  const { uid } = req.params;

  console.log(uid)
  try {
    const store = await Store.findOne({userId: uid});

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStoreByStoreId = async (req, res) => {
  const { storeId } = req.params;

  try {
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItemFromMenu = async (req, res) => {
  const { uid, itemId } = req.params;

  try {
    const store = await Store.findOne({userId: uid});

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const updatedMenu = store.menu.filter((item) => item._id != itemId);

    store.menu = updatedMenu;

    await store.save();

    res.status(200).json("Item Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { uid, itemI } = req.body;
}