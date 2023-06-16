const mongoose = require("mongoose");
const { Schema } = mongoose;

const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  user: {
    type: String,
    required : true,
  },
  password: {
    type: String,
    required : true
  },
  comment : {
    type: String,

  },
  timestamp:{
    type:Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Comment", commentSchema);