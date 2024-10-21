require('dotenv').config();
require('express-async-errors');

const express = require('express');
const knex = require('./utils/knex');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
//SocketEvents
const setupSocketEvents = require('./utils/setupSocketEvents'); 


// 커스텀 미들웨어
const requestLogger = require('./middlewares/request-logger');
const responseLogger = require('./middlewares/response-logger');
const errorHandler = require('./middlewares/error-handler');

const log = require('./utils/log'); // 로깅 유틸리티

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { allowEIO3: true });

// 미들웨어 설정

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(requestLogger);
app.use(responseLogger);


// 라우트 설정
app.use('/auth', require('./routes/auth-routes'));
app.use('/user', require('./routes/user-routes'));
app.use('/chat', require('./routes/chat-routes'));
app.use('/post', require('./routes/post-routes'));
app.use('/photo', require('./routes/photo-routes'));
app.use('/message', require('./routes/message-routes'));
app.use('/my-village', require('./routes/my-village-routes'));
app.use('/address', require('./routes/address-routes'));
app.use('/history',require('./routes/post-search-history-routes'));
app.use('/favorite',require('./routes/favorite-routes'));

//DB 연결 확인
(async () => {
    try {
      await knex.raw('SELECT 1+1 AS result');
      console.log('Successfully connected to MySQL database.');
    } catch (err) {
      console.error('Failed to connect to MySQL database:', err);
      process.exit(1); // 연결 실패 시 서버 종료
    }
  })();

// 소켓 연결 기본(성공, ERROR) 이벤트 처리
io.on('connection', (socket) => {
    console.log(`소켓 ${socket.id}가 연결되었습니다.`);

    // /utils/setupSocketEvents.js 에서 소켓 이벤트를 설정합니다.
    setupSocketEvents(socket, io); // 소켓 이벤트 설정
});

// 10. 에러 처리 미들웨어 (마지막에 위치)
app.use(errorHandler);


// 서버 실행
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
