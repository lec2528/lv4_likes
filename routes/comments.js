const express = require("express");
const router = express.Router();
const { Comments, Posts } = require("../models");
const loginmiddleware = require("../Middleware/loginmiddleware.js");

//댓글 생성
router.post("/posts/:postid/comment", loginmiddleware, async (req, res) => {
  const { nickName } = res.locals.signin;
  const { postId } = req.params;
  const { comment } = req.body;

  const verify = await Posts.findOne({ nickName, postId });
  console.log(verify);
  if (!nickName) {
    res.status(412).json({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
  }

  await Comment.create({ nickName, comment, createAt: Date.now() });

  res.status(200).json({ result: "댓글이 생성 되었습니다." });
});

// 댓글 조회
router.get("/posts/:postid/comment", async (req, res) => {
  const comment = await Comments.find({});
  res.status(200).json({ comment });
});
//-----------------------------------------------------------------------------------------------------

//   //댓글 상세 조회 GET
router.get(
  "/posts/:postid/comment/:commentid",
  loginmiddleware,
  async (req, res) => {
    const { nickName } = res.locals.signin;
    const { commentid } = req.params;
    const detailcomment = await Comments.find({ _id: commentid });
    if (!detailcomment.length) {
      return res.json({
        success: false,
        errorMessage: "해당 댓글이 존재하지 않습니다.",
      });
    }
    res.status(200).json({ nickName, detailcomment }); //posts: [result]
  }
);

// 댓글 수정
router.put(
  "/posts/:postid/comment/:commentid",
  loginmiddleware,
  async (req, res) => {
    const { nickName, password } = res.locals.signin;
    const { comment } = req.body;

    const existcommentid = await CommCommentsent.find({ nickName, password });
    if (!existcommentid.length) {
      return res.status(400).json({
        success: false,
        errorMessage: "해당 댓글이 존재하지 않습니다.",
      });
    }
    await Comments.updateOne(
      { nickName, password },
      { $set: { comment, updateAt: Date.now() } }
    );
    res.status(200).json({ success: "댓글이 수정되었습니다." });
  }
);

//게시글 삭제
router.delete(
  "/posts/:postid/comment/:commentid",
  loginmiddleware,
  async (req, res) => {
    const { nickName } = res.locals.signin;
    const { commentid } = req.params;

    const existcommentid = await Comments.find({ _id: commentid });
    if (!existcommentid.length) {
      return res.status(400).json({
        success: false,
        errorMessage: "삭제할 댓글이 없습니다.",
      });
    }

    if (!nickName) {
      res.status(412).json({
        errorMessage: "삭제하려면 로그인 해주세요",
      });
    }
    await Posts.deleteOne({ _id: commentid });
    res.status(200).json({ success: "데이터 삭제에 성공했습니다." });
  }
);
module.exports = router;
