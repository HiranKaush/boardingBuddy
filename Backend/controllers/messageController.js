const Message = require("../models/message");

//endpoint to post Messages and store it in the backend
const postmessage = async (req, res) => {
    try {
      const { senderId, recepientId, messageType, messageText } = req.body;
  
      const newMessage = new Message({
        senderId,
        recepientId,
        messageType,
        message: messageText,
        timestamp: new Date(),
        imageUrl: messageType === "image" ? req.file.path : null,
      });
  
      await newMessage.save();
      res.status(200).json({ Message: newMessage});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

//endpoint to fetch the messages between two users in the chatRoom
const getMessages = async (req, res) => {
    try {
      const { senderId, recepientId } = req.params;
  
      const messages = await Message.find({
        $or: [
          { senderId: senderId, recepientId: recepientId },
          { senderId: recepientId, recepientId: senderId },
        ],
      }).populate("senderId", "_id name");
  
      res.json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //endpoint to delete the messages!
const deleteMessage = async (req, res) => {
    try {
      const { messages } = req.body;
  
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "invalid req body!" });
      }
  
      await Message.deleteMany({ _id: { $in: messages } });
  
      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server" });
    }
  };


  module.exports = {
    postmessage,
    getMessages,
    deleteMessage,
  };