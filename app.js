const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require('./routes/posts.js');
const commentRouter = require('./routes/comments.js');
const signupRouter = require('./routes/users.js');
const likesRouter = require('./routes/likes.js');
const cookieParser = require('cookie-parser');

// 전역객체 body parser에 사용

// 미들웨어

app.use(express.json());
app.use(cookieParser());
app.use('/api', [postsRouter, commentRouter, signupRouter, likesRouter]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
