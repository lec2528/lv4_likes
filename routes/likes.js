const express = require('express');
const router = express.Router();
const { Posts, Users, Likes } = require('../models');
const middleware = require('../Middleware/loginmiddleware.js');

router.post('/post/:postId/like', middleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log('post', postId);
    const userId = res.locals.signin;
    console.log('user', userId);

    const like = await Likes.findOne({
      where: { postId: postId, userId: userId },
    });

    if (like) {
      await Likes.destroy({ where: { postId, userId } });
      res.status(200).json({ message: '좋아요 취소' });
    }
    if (!like) {
      await Likes.create({ postId, userId });
      res.status(200).json({ message: '좋아요' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
