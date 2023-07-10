const express = require('express');
const router = express.Router();
const { Posts, Users, Likes } = require('../models');
const middleware = require('../Middleware/loginmiddleware.js');

router.post('/post/:postId/like', middleware, async (req, res) => {
  try {
    const postId = req.params.postId; // postId를 paramater에서 가져오기
    const { userId } = res.locals.user; // 미들웨어에서 검증된 userId 가져오기

    const like = await Likes.findOne({
      where: { postId: postId, userId },
    });

    //좋아요가 있는지 if문을 확인한다. 좋아요가 있다면 좋아요를 destroy해서 취소한다.
    if (like) {
      await Likes.destroy({ where: { postId, userId } });
      res.status(200).json({ message: '좋아요 취소' });
    }
    //좋아요가 없다면 create를 통해서 postId와 userId가 담긴 데이터를 만들어 Likes테이블로 전달한다.
    if (!like) {
      await Likes.create({ postId, userId });
      res.status(200).json({ message: '좋아요' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

router.get('/like/post', middleware, async (req, res) => {
  const { userId } = res.locals.user; // 로그인한 사용자의 userId
  try {
    // 좋아요한 게시물을 가져오기 위해 Likes 테이블과 Posts 테이블을 조인합니다.
    const likedPosts = await Likes.findAll({
      where: { userId },
      include: {
        model: Posts,
      },
    });
    console.log(likedPosts);
    res.status(200).json({ likedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류입니다.' });
  }
});

module.exports = router;
