const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const messageController = require("../controllers/messageController")

//------------------------------------------------------
const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/"); // Specify the desired destination folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
//------------------------------------------------------

// user register
router.post("/register", userController.registerUser);

// user login
router.post("/login", userController.login);
router.put('/upuser/:userId', userController.updateUser);
router.put('/upuserpass/:userId', userController.updatePassword);
router.put('/upboarding/:userId/:boardingId', userController.updateUserboarding);
router.delete('/deleteuser/:userId', userController.deleteUser);
router.get('/getownboardings/:userId', userController.getUserBoardings);



router.get("/users/:userId", userController.alllogedinUsers)

router.post("/friend-request/accept", userController.acceptFriendReq)
router.get("/accepted-friends/:userId", userController.allFriends)
router.post("/messages", upload.single("imageFile"), messageController.postmessage)
router.get("/user/:userId", userController.getUserdetails)

router.get("/messages/:senderId/:recepientId", messageController.getMessages)
router.delete("/deleteMessages", messageController.deleteMessage)

// router.get("/friend-requests/sent/:userId", userController.friend_requests_sent)
// router.get("/friends/:userId", userController.friends_uaserid)
// router.post("/friend-request", userController.sendreq)
// router.get("/friend-request/:userId", userController.allFriendreq)

module.exports = router;
