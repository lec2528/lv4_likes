const express = require("express");
const jwt = require("jsonwebtoken");
const router = express();

const SignUp = require("../schema/signup.js");

// 로그인 api
router.post("/login", async (req, res) => {
  const { nickName, passWord } = req.body;

  const signIn = await SignUp.findOne({ nickName });
  if (!signIn || passWord !== signIn.passWord) {
    res.status(412).json({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요 ",
    });
    return;
  }

  // 로그인시 쿠키 생성
  const token = jwt.sign({ signIn }, "custom-secret-key");
  res.cookie("Authorization", `Bearer ${token}`);
  res.status(200).json({ token, success: "로그인에 성공하였습니다." });
});
module.exports = router;
