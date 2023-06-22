const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  careatedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model("Posts", postsSchema);
