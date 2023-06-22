const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Posts", postsSchema);
