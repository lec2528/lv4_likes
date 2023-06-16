const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsSchema = new Schema({
  user: {
    type: String,
    required : true
  },
  password: {
    type: String,
    required : true
  },
  title : {
    type: String,

  },
  content : {
    type: String,

  },
  timestamp:{
    type:Date,
    default: Date.now.getTime()+(3600000*9)
  },

  // 좋아요기능 구현?
//   like:{
//     type:
//   },
//   dislike{

//   },

});

module.exports = mongoose.model("Posts", postsSchema);