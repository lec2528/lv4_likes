const express = require("express");
const jwt = require("jsonwebtoken");
const router = express();

const Singup = require("../schema/signup.js");

router.post("/login", async (req, res) => {
  const { nickName, passWord } = req.body;

  const existsignup = await Singup.findOne({ nickName });
  if(!existsignup || passWord !== existsignup.passWord){
    res.status(412).json({
        errorMessage : "닉네임 또는 패스워드를 확인해주세요 "
    })
    return;
  }

const token = jwt.sign(
    {userId : existsignup.userId},
    "custom-secret-key"
)
console.log({"token" : token})
res.cookie("Authorization",`Bearer ${token}`)
res.status(200).json({success : "로그인에 성공하였습니다."})
})
module.exports = router;

