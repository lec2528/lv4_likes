const express = require("express");
const router = express.Router();

const Comment = require("../schema/comment.js");
const Posts = require("../schema/posts.js");

//댓글 생성
router.post("/posts/:postid/comment", async (req, res) => {
  const { commentid } = req.params;
  const { user, password, comment, timestamp } = req.body;

  const existscomments = await Comment.find({ _id: commentid });
  if (existscomments.length) {
    return res.json({
      success: false,
      errorMessage: "댓글을 작성해주세요!.",
    });
  }

  await Comment.create({ user, password, comment, timestamp });

  res.status(200).json({ result: "댓글이 생성 되었습니다." });
});

// 댓글 조회
router.get("/posts/:postid/comment", async (req, res) => {
  const comments = await Comment.find({});
  res.status(200).json({ comments });
});
//-----------------------------------------------------------------------------------------------------

//   //게시글 상세 조회 GET
router.get("/posts/:postid/comment/:postid", async (req, res) => {
  const { commentid } = req.params;
  const detailcomment = await Comment.find({ _id: commentid });
  if (!detailcomment.length) {
    return res.json({
      success: false,
      errorMessage: "해당 댓글이 존재하지 않습니다.",
    });
  }
  res.status(200).json({ detailcomment }); //posts: [result]
});

// 게시글 수정
router.put("/posts/:postid/comment/:commentid", async (req, res) => {
  const { commentid } = req.params;
  const { user, password, comment, timestamp } = req.body;

  const existcommentid = await Comment.find({ _id: commentid, password: password });
  if (!existcommentid.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "해당 댓글이 존재하지 않습니다.",
    });
  }
  await Comment.updateOne(
    { _id: commentid, user: user, password: password },
    { $set: { comment: comment, timestamp: timestamp } }
  );
  res.status(200).json({ success: "댓글이 수정되었습니다." });
});

  //게시글 삭제
  router.delete("/posts/:postid/comment/:commentid", async (req, res) => {
    const { commentid } = req.params;

    const existcommentid = await Comment.find({ _id: commentid });
    if (!existcommentid.length) {
      return res.status(400).json({
        success: false,
        errorMessage: "삭제할 댓글이 없습니다.",
      });
    }
    await Posts.deleteOne({ _id: commentid });
    res.status(200).json({ success: "데이터 삭제에 성공했습니다." });
  });
module.exports = router;

