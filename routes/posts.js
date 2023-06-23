const express = require("express");
const router = express.Router();

const connect = require("../schema/index.js");
const Posts = require("../schema/posts.js");

const loginmiddleware = require("../Middleware/loginmiddleware.js");

connect();

//게시글 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({}).sort("date").exec();
  if (!posts) {
    res.status(400).json({
      errorMessage: "게시글 조회에 실패하였습니다.",
    });
  }
  res.status(200).json({ posts });
});

//게시글 생성 POST
router.post("/posts", loginmiddleware, async (req, res) => {
  const { nickName, passWord } = res.locals.signin;
  const { title, content } = req.body;

  const verify = await Posts.findOne({ nickName, passWord });

  if (!verify) {
    res.status(412).json({
      errorMessage: "게시글을 작성하려면 로그인 해주세요",
    });
  }
  if (!content) {
    res.status(412).json({
      errorMessage: "게시글을 작성해주세요",
    });
  }

  await Posts.create({
    nickName,
    passWord,
    title,
    content,
    careatedAt: new Date(),
  });

  res.status(201).json({
    success: true,
    message: "게시글을 생성하였습니다.",
  });
});
//--------------------------------------------------------

//게시글 상세 조회 GET
router.get("/posts/:postid", async (req, res) => {
  const { postid } = req.params;
  console.log({ postid });
  const detailpost = await Posts.find({ _id: postid });
  if (!detailpost.length) {
    return res.json({
      success: false,
      errorMessage: "해당 게시글이 존재하지 않습니다.",
    });
  }
  res.status(200).json({ detailpost }); //posts: [result]
})
// 게시글 수정
router.put("/posts/:postid", loginmiddleware, async (req, res) => {
  const { nickName, password } = res.locals.signin;
  const { postId } = req.params;
  console.log(postId);
  console.log(nickName);
  const { title, content, updatedAt } = req.body;

  const verify = await Posts.find({ nickName, password, _id:postId });
  if (!verify) {
    return res.status(412).json({
      success: false,
      errorMessage: "수정권한이 없습니다.",
    });
  }
  await Posts.updateOne(
    { nickName, password },
    { $set: { title, content, updatedAt } }
  );
  res.status(200).json({ success: "게시글이 수정되었습니다." });
});

//게시글 삭제
router.delete("/posts/:postid", loginmiddleware, async (req, res) => {
  const { nickName, passWord } = res.locals.signin;

  const verify = await Posts.find({ nickName, passWord });
  if (!verify) {
    return res.status(400).json({
      success: false,
      errorMessage: "삭제 권한이 없습니다.",
    });
  }
  await Posts.deleteOne({ nickName });
  res.status(200).json({ success: "데이터 삭제에 성공했습니다." });
});

module.exports = router;
