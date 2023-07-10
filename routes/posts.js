const express = require('express');
const router = express.Router();
const { Posts, Users } = require('../models');

const loginmiddleware = require('../Middleware/loginmiddleware.js');

//게시글 조회
router.get('/post', async (req, res) => {
  try {
    const posts = await Posts.findAll({ where: {} });
    if (!posts) {
      res.status(400).json({
        errorMessage: '게시글이 없습니다.',
      });
    }
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

//게시글 생성 POST
router.post('/post', loginmiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { title, content, nickname, password } = req.body;

    const verify = await Posts.findOne({ nickname, password });

    if (!verify) {
      res.status(412).json({
        errorMessage: '게시글을 작성하려면 로그인 해주세요.',
      });
    }
    if (!content) {
      res.status(412).json({
        errorMessage: '게시글을 내용을 입력해주세요.',
      });
    }

    const post = await Posts.create({
      userId,
      nickname,
      password,
      title,
      content,
      careatedAt: new Date(),
    });

    res.status(201).json({
      post,
      message: '게시글을 생성하였습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});
//--------------------------------------------------------

//게시글 상세 조회 GET
router.get('/post/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    console.log({ postId });
    //api로 호출된 postid만 조회합니다.
    const detailpost = await Posts.findAll({ where: { postId } });
    if (!detailpost.length) {
      return res.json({
        errorMessage: '해당 게시글이 존재하지 않습니다.',
      });
    }
    res.status(200).json({ detailpost }); //posts: [result]
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});
// 게시글 수정
router.put('/post/:postId', loginmiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const { nickname, title, content, updatedAt } = req.body;

    //where문을 사용해서 postId와 일치하는 게시물을 찾습니다.
    const isExistPost = await Posts.findOne({ where: { postId: postId } });
    if (!isExistPost) {
      return res.status(412).json({
        errorMessage: '수정할 게시글이 존재하지 않습니다.',
      });
    }
    //update 메소드를 사용하여 api로 호출된 postId를 수정하고 updatedAt을 새로운 시간으로 업데이트 합니다.
    await Posts.update(
      { nickname, title, content, updatedAt: new Date() },
      { where: { postId } }
    );
    res.status(200).json({ success: '게시글이 수정되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

//게시글 삭제
router.delete('/post/:postId', loginmiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    //where문을 사용해서 postId와 일치하는 게시물을 찾습니다.
    const isExistPost = await Posts.findOne({ where: { postId: postId } });
    if (!isExistPost) {
      return res.status(400).json({
        errorMessage: '이미 삭제되었거나 존재하지 않습니다.',
      });
    }
    //destroy 메소드를 사용하여 api로 호출된 postId를 삭제합니다.
    await Posts.destroy({ where: { postId } });
    res.status(200).json({ success: '데이터 삭제에 성공했습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

module.exports = router;
