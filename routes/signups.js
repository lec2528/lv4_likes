const express = require("express");

const router = express.Router();
const Signup = require("../schema/signup.js");

//회원가입 api
router.post("/signups", async (req, res) => {
  const { nickName, passWord, confirmPassword } = req.body;

  if (!nickName.match(/^[a-zA-Z0-9]{3,50}$/)) {
    res
      .status(412)
      .json({ errorMessage: "닉네임은 영어와 숫자만 포함한 3자리 이상 50자리 아하의 문자로 입력해주세요." });
    return;
  }
  const existNickname = await Signup.findOne({ nickName: nickName });
  if (existNickname) {
    res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
    return;
  }
  if (passWord !== confirmPassword) {
    res.status(412).json({ errorMessage: "패스워드가 일치하지 않습니다." });
    return;
  }
  if(passWord.length < 4){
    res
    .status(412)
    .json({ errorMessage: "비밀번호는 4자리 이상 입력해주세요." });
  return;
}

// 수정 필요
//   if (!passWord.match(/^[$(nickName)]$/)) {
//     res
//       .status(412)
//       .json({ errorMessage: "비밀번호에 닉네임이 포함될 수 없습니다." });
//     return;
//   }

  const signup = new Signup({ nickName, passWord });
  await signup.save();
  res.status(201).json({ message: "회원 가입에 성공하였습니다." });
});

module.exports = router;
