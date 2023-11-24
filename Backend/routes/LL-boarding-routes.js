const express = require('express');
const router = express.Router();
const boardingsController = require('../controllers/LL-boarding-c');


router.post('/boardings', boardingsController.addNewBoarding);
router.get('/boardings', boardingsController.getBoardings);
router.get('/boardings/:id', boardingsController.viewBoarding);

// Update a boarding by ID
router.put('/boardings/:id', boardingsController.updateBoarding);
router.put('/boardings/:boardingId/addtenant', boardingsController.addTenantToBoarding);

router.post('/boardings/:id', boardingsController.updateBoardingImage);


// Delete a boarding by ID
router.delete('/boardings/:id', boardingsController.deleteBoarding);

// Get a boarding by ID
router.get('/boardings/:id', boardingsController.getByIDBoarding);

module.exports = router;


