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
  res.status(200).json({ token, success: `안녕하세요${nickName}님 오늘도 행복한 하루 되세요!` });
});
module.exports = router;
