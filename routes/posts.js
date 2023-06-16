const express = require("express");
const router = express.Router();
const connect = require("../schema/index.js");
const Posts = require("../schema/posts.js");

connect();

//게시글 생성 POST

router.post("/posts", async (req, res) => {
  const posts = await Posts.create({
    user: req.body.user,
    password: req.body.password,
    title: req.body.title,
    content: req.body.content,
    timestamp: req.body.timestamp,
  });

  res
    .status(200)
    .json({ posts: posts, success: true, message: "게시글을 생성하였습니다." });
});


//게시글 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({});
  res.status(200).json({ posts });
});

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
});

// 게시글 수정
router.put("/posts/:postid", async (req, res) => {
  const { postid } = req.params;
  const { user, password, title, content, timestamp } = req.body;

  const existpostid = await Posts.find({ _id: postid, password: password });
  if (!existpostid.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "해당 게시글이 존재하지 않습니다.",
    });
  }
  await Posts.updateOne(
    { _id: postid, user: user, password: password },
    { $set: { title: title, content: content, timestamp: timestamp } }
  );
  res.status(200).json({ success :"게시글이 수정되었습니다." });
});

//게시글 삭제
router.delete("/posts/:postid", async (req, res) => {
  const { postid } = req.params;

  const existpostid = await Posts.find({ _id: postid });
  if (!existpostid.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "삭제할 게시글이 없습니다.",
    });
  }
  await Posts.deleteOne({ _id: postid });
  res.status(200).json({ success: "데이터 삭제에 성공했습니다." });
});

module.exports = router;
