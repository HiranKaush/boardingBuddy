const User = require("../models/user");
const Message = require("../models/message");
const Boarding = require('../models/landlord-boardings'); 

const jwt = require("jsonwebtoken");

// --------- registration of the user --------- //
const registerUser = async (req, res) => {
  const { name, username, password, image, role } = req.body;
  let user;
  // create a new User object
  const newUser = new User({
    name,
    username,
    email:'',
    password,
    gender:'', 
    nic:'', 
    phoneNum:'',
    image,
    role
  });

  user = await User.findOne({ username });
  

  if (user) {
    

    res.status(404).json({ message: "username alredy used" });
  } else {

    try {
      await newUser.save();
    } catch (err) {
      console.log("Error registering user", err);
      res.status(500).json({ message: "Error registering the user!" });
    }
  
    //res.status(200).json({ message: "User registered successfully" });
    res.status(201).json({ user: newUser });
  }
  
};

// --------- create a token for the user --------- //
const createToken = (userId) => {
  // Set the token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

  return token;
};

// --------- logging in of that particular user --------- //
const login = async (req, res) => {
  const { username, password } = req.body;
  let user;

  //check if the username and password are provided
  if (!username || !password) {
    return res
      .status(404)
      .json({ message: "username and the password are required" });
  }

  try {
    user = await User.findOne({ username });
    if(!user){
      return res.status(404).json({ message: "Invalid username!" });

    }
  } catch (error) {
    console.log("error in finding the user", error);
    res.status(500).json({ message: "Internal server Error!" });
  }
  if (user.password !== password) {
    return res.status(404).json({ message: "Invalid Password!" });
  } else {
    const token = createToken(user._id);
    const u_role = user.role;
    res.status(200).json({ token, u_role });
  }
};

// --------- access all the users except the user who's is currently logged in! --------- //
const alllogedinUsers = async (req, res) => {
    const loggedInUserId = req.params.userId;
  
    User.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log("Error retrieving users", err);
        res.status(500).json({ message: "Error retrieving users" });
      });
  };

  //endpoint to accept a friend-request of a particular person
const acceptFriendReq = async (req, res) => {
    try {
      const { senderId, recepientId } = req.body;
  
      //retrieve the documents of sender and the recipient
      const sender = await User.findById(senderId);
      const recepient = await User.findById(recepientId);

      if(!recepient.friends.includes(senderId)){

       
        sender.friends.push(recepientId);
        recepient.friends.push(senderId);

        await sender.save();
        await recepient.save();
        res.status(200).json({ message: "Friend Request accepted successfully" });

      }
      else{
        res.status(200).json({ message: "You allready have a chat with this user" });

      }
  
    
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  //endpoint to access all the friends of the logged in user!
const allFriends = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate(
        "friends",
        "name  image"
      );
      const acceptedFriends = user.friends;
      res.json(acceptedFriends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  

  ///endpoint to get the userDetails to design the chat Room header
const getUserdetails = async (req, res) => {
    try {
      const { userId } = req.params;
  
      //fetch the user data from the user ID
      const recepientId = await User.findById(userId);
  
      res.json(recepientId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const updateUser = async (req, res) => {
    const { userId } = req.params; // Assuming userId is passed as a parameter
  
    // Assuming the User model is defined somewhere in your code
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const { name, email, gender, nic, phoneNum, image } = req.body;
  
      // Update the user object with the new values
      user.name = name 
      user.email = email 
      user.gender = gender 
      user.nic = nic 
      user.phoneNum = phoneNum 
      user.image = image 
    
  
      await user.save();
  
      res.status(200).json({ user: user, message: "User updated successfully" });
    } catch (err) {
      console.log("Error updating user", err);
      res.status(500).json({ message: "Error updating the user!" });
    }
  };

  const updatePassword = async (req, res) => {
    const { userId } = req.params; 
    
   
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const { password } = req.body;
        
        // Update the user object with the new password
        user.password = password;
        
        await user.save();
        
        res.status(200).json({ user: user, message: "Password updated successfully" });
    } catch (err) {
        console.log("Error updating password", err);
        res.status(500).json({ message: "Error updating the password!" });
    }
};

  

  const updateUserboarding = async (req, res) => {
    const { userId, boardingId } = req.params; // Assuming userId is passed as a parameter
  
    // Assuming the User model is defined somewhere in your code
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Update the user object with the new values
      user.myboarding = null
      await user.save();

      try {
        if (!boardingId) {
          return res.status(404).json({ error: 'Boarding not found' });
        }
        const result = await Boarding.updateOne(
          { _id: boardingId },
          { $pull: { tenants: userId } }
        );
        console.log(result);
      } catch (error) {
        console.log(error)
      }
      
  
      res.status(200).json({ user: user, message: "boarding updated successfully" });
    } catch (err) {
      console.log("Error updating user", err);
      res.status(500).json({ message: "Error updating the boarding!" });
    }
  };

  const deleteUser = async (req, res) => {
    const { userId } = req.params;
    console.log("user -- ", userId);
    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

const getUserBoardings = async (req, res) => {
  const { userId } = req.params;
  try {
      const user = await User.findById(userId).populate('ownboardings', 'boardingLocation');

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const ownBoardings = user.ownboardings.map(boarding => {
          return {
              id: boarding._id,
              name: boarding.boardingLocation
          };
      });

      res.status(200).json(ownBoardings);
  } catch (error) {
      res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

  

module.exports = {
  registerUser,
  login,
  updateUser,
  updatePassword,
  alllogedinUsers,
  acceptFriendReq,
  allFriends,
  getUserdetails,
  updateUserboarding,
  deleteUser,
  getUserBoardings,
};


//endpoint to send a request to a user
// const sendreq = async (req, res) => {
//     const { currentUserId, selectedUserId } = req.body;
  
//     try {
//       //update the recepient's friendRequestsArray!
//       await User.findByIdAndUpdate(selectedUserId, {
//         $push: { freindRequests: currentUserId },
//       });
  
//       //update the sender's sentFriendRequests array
//       await User.findByIdAndUpdate(currentUserId, {
//         $push: { sentFriendRequests: selectedUserId },
//       });
  
//       res.sendStatus(200);
//     } catch (error) {
//       res.sendStatus(500);
//     }
//   };
//endpoint to show all the friend-requests of a particular user
// const allFriendreq = async (req, res) => {
//     try {
//       const { userId } = req.params;
  
//       //fetch the user document based on the User id
//       const user = await User.findById(userId)
//         .populate("freindRequests", "name email image")
//         .lean();
  
//       const freindRequests = user.freindRequests;
  
//       res.json(freindRequests);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };

//-------------#########################----------------------------------

 // recepient.freindRequests = recepient.freindRequests.filter(
      //   (request) => request.toString() !== senderId.toString()
      // );
  
      // sender.sentFriendRequests = sender.sentFriendRequests.filter(
      //   (request) => request.toString() !== recepientId.toString
      // );