const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const loginmiddleware = require('../Middleware/loginmiddleware.js');

//내 정보조회 api
router.get('/signup/me', loginmiddleware, async (req, res) => {
  const { nickName } = res.locals.signin;
  console.log(nickName);
  res.status(200).json({
    signups: { nickName },
  });
});

//회원가입 api
router.post('/signup', async (req, res) => {
  const { nickname, password, email, confirm } = req.body;

  if (!nickname.match(/^[a-zA-Z0-9]{3,50}$/)) {
    res.status(412).json({
      errorMessage:
        '닉네임은 영어와 숫자만 포함한 3자리 이상 50자리 아하의 문자로 입력해주세요.',
    });
    return;
  }
  const existNickname = await Users.findOne({ where: { nickname } });
  if (existNickname) {
    res.status(412).json({ errorMessage: '중복된 닉네임입니다.' });
    return;
  }
  if (password !== confirm) {
    res.status(412).json({ errorMessage: '패스워드가 일치하지 않습니다.' });
    return;
  }
  if (password.length < 4) {
    res
      .status(412)
      .json({ errorMessage: '비밀번호는 4자리 이상 입력해주세요.' });
    return;
  }

  const signup = new Users({ nickname, email, password });
  await signup.save();
  res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
});

// 로그인 api
router.post('/login', async (req, res) => {
  const { nickname, email, password } = req.body;

  const uesr = await Users.findOne({ where: { nickname } });
  if (!uesr || password !== uesr.password) {
    res.status(412).json({
      errorMessage: '닉네임 또는 패스워드를 확인해주세요 ',
    });
    return;
  }

  // 로그인시 쿠키 생성
  const token = jwt.sign({ Users }, 'custom-secret-key');
  res.cookie('Authorization', `Bearer ${token}`);
  res.status(200).json({
    token,
    success: `안녕하세요${nickname}님 오늘도 행복한 하루 되세요!`,
  });
});
module.exports = router;
