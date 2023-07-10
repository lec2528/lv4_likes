const express = require('express');
const router = express.Router();
const { Comments, Posts } = require('../models');
const middleware = require('../Middleware/loginmiddleware.js');

//댓글 생성
router.post('/post/:postId/comment', middleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { nickname, content } = req.body;

    //댓글을 작성하려는 게시글이 존재하는지 확인합니다.
    const isExistPost = await Posts.findOne({ where: { postId } });
    if (!isExistPost) {
      res.status(412).json({
        errorMessage:
          '게시글이 존재하지 않거나 삭제되었기 때문에 댓글을 생성할 수 없습니다.',
      });
    }

    if (!content.length) {
      res.status(412).json({
        errorMessage: '댓글 내용을 입력해주세요',
      });
    }
    // create 메소드를 사용하여 게시글을 생성하고 게시물의 postId와 작성자의 userId를 가져와 저장합니다.
    const comments = await Comments.create({
      postId,
      userId,
      nickname,
      content,
      createAt: Date.now(),
    });

    res.status(200).json({ comments, result: '댓글이 생성 되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

// 댓글 조회
router.get('/post/:postId/comment', async (req, res) => {
  try {
    const comment = await Comments.findAll({
      where: { postId: req.params.postId },
      attributes: [
        'commentId',
        'postId',
        'userId',
        'nickname',
        'content',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

// 댓글 수정
router.put('/post/:postId/comment/:commentId', middleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { nickname, content } = req.body;

    const isExistComment = await Comments.findOne({
      where: { commentId },
    });
    console.log(isExistComment);
    if (!isExistComment) {
      return res.status(400).json({
        success: false,
        errorMessage: '해당 댓글이 존재하지 않습니다.',
      });
    }

    if (!content.length) {
      res.status(412).json({
        errorMessage: '수정할 내용을 입력해주세요',
      });
    }
    const updateComment = await Comments.update(
      { nickname, content, updateAt: Date.now() },
      { where: { commentId } }
    );
    res.status(200).json({ updateComment, success: '댓글이 수정되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

//댓글 삭제
router.delete(
  '/post/:postId/comment/:commentId',
  middleware,
  async (req, res) => {
    try {
      const { commentId } = req.params;
      // 삭제하려는 댓글이 존재하는지 확인합니다.
      const isExistComment = await Comments.findOne({ where: { commentId } });
      if (!isExistComment) {
        return res.status(400).json({
          success: false,
          errorMessage: '삭제할 댓글이 없습니다.',
        });
      }
      // 댓글을 확인하고 destor 메소드를 이용하여 삭제합니다.
      await Comments.destroy({ where: { commentId } });
      res.status(200).json({ success: '댓글이 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errorMessage: '서버 오류' });
    }
  }
);
module.exports = router;
