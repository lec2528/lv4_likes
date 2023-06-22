const jwt = require("jsonwebtoken");
const Signup = require("../schema/signup.js");

module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  console.log(Authorization);

  const [ loginToken, loginType ] = (Authorization ?? "").split(" ");

  if (!loginToken || loginType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(Authorization, "custom-secret-key");
    const signup = await Signup.findById(userId);
    res.locals.signup = signup;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
