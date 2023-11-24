const Boarding = require('../models/landlord-boardings'); 
const User = require("../models/user");


const addNewBoarding = async (req, res) => {
  try {
    const { boardingLocation, gender, price, description ,userId,imgURL } = req.body;
    const boarding = new Boarding({ boardingLocation, gender, price, description,userId,imgURL});
    const savedBoarding = await boarding.save();

    try {
      const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    user.ownboardings.push(savedBoarding._id);
    await user.save();
    
    } catch (error) {
      console.log(error)
    }

    res.status(201).json(savedBoarding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBoarding = async (req, res) => {
  try {
    const { boardingLocation, gender, price, description  } = req.body;
    const { id } = req.params;
    const updatedBoarding = await Boarding.findByIdAndUpdate(id, { boardingLocation, gender, price, description }, { new: true });
    res.json(updatedBoarding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a boarding by ID
const deleteBoarding = async (req, res) => {
  try {
    const { id } = req.params;
    await Boarding.findByIdAndRemove(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a boarding by ID
const getByIDBoarding = async (req, res) => {
  try {
    const { id } = req.params;
    const boarding = await Boarding.findById(id);
    if (!boarding) {
      res.status(404).json({ error: 'Boarding not found' });
    } else {
      res.json(boarding);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBoardings = async (req, res) => {
    try {
      const boardings = await Boarding.find();
      res.json(boardings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const viewBoarding = async (req, res) => {
    try {
      const boardingId = req.params.id;
      const boarding = await Boarding.findById(boardingId);
      if (!boarding) {
        return res.status(404).json({ message: 'Boarding not found' });
      }
  
      res.status(200).json(boarding);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const addTenantToBoarding = async (req, res) => {
    const { boardingId } = req.params;
    const { tenantId } = req.body;
  
    try {
      const boarding = await Boarding.findById(boardingId);
      if (!boarding) {
        return res.status(404).json({ error: 'Boarding not found' });
      }
  
      boarding.tenants.push(tenantId);
      await boarding.save();

      try {
        const user = await User.findById(tenantId);
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
      user.myboarding = boardingId;
      await user.save();
      
      } catch (error) {
        console.log(error)
      }
      return res.status(200).json(boarding);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const updateBoardingImage = async (req, res) => {
    const { uid } = req.params;
    const {imgURL} = req.body;
    try {
      const boarding = await Boarding.findOne({userId: uid});
      if (!boarding) {
        return res.status(404).json({ error: 'Boarding not found' });
      }
      boarding.imgURL = imgURL;
  
      await boarding.save();
  
      res.status(200).json(store);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {
  addNewBoarding,
  updateBoarding,
  deleteBoarding,
  getByIDBoarding,
  getBoardings,
  viewBoarding,
  addTenantToBoarding,
  updateBoardingImage
};