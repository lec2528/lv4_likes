const jwt = require("jsonwebtoken");
const Signup = require("../schema/signup.js");

module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  console.dir(req.cookies);
  const [loginType, loginToken] = (Authorization ?? "").split(" ");
  console.log(loginToken);
  if (!loginToken || loginType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다11111.",
    });
    return;
  }

  try {
    const { nickName } = jwt.verify(loginToken, "custom-secret-key");
    const signin = await Signup.findOne(nickName);
    console.log(signin)
    res.locals.signin = signin;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
