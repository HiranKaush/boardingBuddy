const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
   
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  nic: {
    type: String,
   
  },
  phoneNum: {
    type: String,
    
  },
  image: {
    type: String,
    // required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  role:{
    type: String,
  },
  myboarding:{
    type: Schema.Types.ObjectId,
    ref: "Boarding",
    required: false,
  },
  ownboardings:[{
    type: Schema.Types.ObjectId,
    ref: "Boarding",
  }]
  
});

module.exports = mongoose.model("User", userSchema);

// freindRequests: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  // sentFriendRequests: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],