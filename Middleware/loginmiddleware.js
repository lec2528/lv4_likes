const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  const [loginType, loginToken] = (Authorization ?? '').split(' ');

  if (!loginToken || loginType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다11111.',
    });
    return;
  }

  try {
    const { userId } = jwt.verify(loginToken, 'custom-secret-key');
    const user = await Users.findOne(userId);
    res.locals.signin = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
};
