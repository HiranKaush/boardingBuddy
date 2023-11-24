const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
   
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  boarding: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boarding',
    required: true,
  },
  userimage:{
    type:String,
    
  },
 
  // You can add more fields like date, likes, etc. as needed
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
