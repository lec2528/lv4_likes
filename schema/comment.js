const mongoose = require("mongoose");
const { Schema } = mongoose;

const {
  Types: { ObjectId },
} = Schema;
const commentSchema = new Schema(
  {
    nickName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    createAt:{
      type:Date,
      default:Date.now
    },
    updateAt:{
      type:Date,
      default:Date.now
  },
  }  
);

module.exports = mongoose.model("Comment", commentSchema);
