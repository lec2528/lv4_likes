const mongoose = require("mongoose");// 몽구스 변수에 몽구스 패키지 연결

const connect = () => {
  mongoose  //db       //저장소  //포트 // db명           
    .connect("mongodb://127.0.0.1:27017/message_board") // 몽고 db랑 연결
    .catch(err => console.log(err)); //에러 발생시 처리방법
};
// localhost //루프백
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
}); // err 변수 할당해서 에러와 에러메세지 출력

mongoose.connection.on('disconnected', disconnected => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.',disconnected);
    // connect(); // 연결 재시도
  });

module.exports = connect; // 모듈 내보내기

// localhost