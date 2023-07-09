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
    const decodedToken = jwt.verify(loginToken, 'custom-secret-key');
    const userId = decodedToken.userId;
    console.log(userId);

    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      res.clearCookie('Authorization');
      return res
        .status(401)
        .json({ message: '토큰 사용자가 존재하지 않습니다.' });
    }
    res.locals.user = user;
    console.log(res.locals.user);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
};
