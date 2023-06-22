const mongoose = require("mongoose")


const signupScahema = new mongoose.Schema({
    nickName : {
        type:String,
        require : true,
        unique:true

        
    },
    passWord:{
        type:String,
        require : true,

    },
})
signupScahema.virtual("userId").get(function () {
    return this._id.toHexString();
  });
  
  // user 정보를 JSON으로 형변환 할 때 virtual 값이 출력되도록 설정
  signupScahema.set("toJSON", {
    virtuals: true,
  });

module.exports = mongoose.model("signup", signupScahema)