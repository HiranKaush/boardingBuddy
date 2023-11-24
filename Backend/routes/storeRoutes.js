const express = require('express');
const router = express.Router();
const { createStore, getAllStores, addItemToMenu, addOfferToStore, addReviewToStore, updateStoreImage, getStoreById, deleteItemFromMenu, getStoreByStoreId} = require('../controllers/storeController');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Don't forget to import the 'fs' module

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, image, cb) {

    const uploadDir = path.join(__dirname, '../controllers/uploads');
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir); // Specify the directory to store uploaded images
    },
    filename: function (req, image, cb) {
      cb(null, Date.now() + '-' + image.originalname); // Generate a unique filename
    },
  });

const upload = multer({ storage: storage });

// Create a new store
router.post('/create-store', createStore);

// Get all stores
router.get('/get-all-stores', getAllStores);

//Get store by Id
router.get('/getStore/:uid', getStoreById);

// Add Item to menu
router.post('/stores/:uid/menu',  addItemToMenu);

// Add Offer to store
router.post('/stores/:uid/offer', addOfferToStore);

// Add Review to store
router.post('/stores/:uid/review', addReviewToStore);

//Update Store Image 
router.post('/updateStoreImage/:uid', updateStoreImage);

//Delete Item from Store
router.delete('/deleteItemFromMenu/:uid/:itemId', deleteItemFromMenu); 

router.get('/getStoreByStoreId/:storeId', getStoreByStoreId);

module.exports = router;
