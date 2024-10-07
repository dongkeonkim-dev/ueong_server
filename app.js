const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const chatRoutes = require('./routes/chat-routes');
const postRoutes = require('./routes/post-routes');
const photoRoutes = require('./routes/photo-routes');
const messageRoutes = require('./routes/message-routes');
const myVillageRoutes = require('./routes/my-village-routes');
const addressRoutes = require('./routes/address-routes');
const postSearchHistoryRoutes = require('./routes/post-search-history-routes');
const favoriteRoutes = require('./routes/favorite-routes');

//SocketEvents
const setupSocketEvents = require('./utils/setupSocketEvents'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { allowEIO3: true });

// 미들웨어 설정
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => { 
    console.log(`${req.method} ${req.url}`);
    next(); 
});

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/post', postRoutes);
app.use('/photo', photoRoutes);
app.use('/message', messageRoutes);
app.use('/my-village', myVillageRoutes);
app.use('/address', addressRoutes);
app.use('/history',postSearchHistoryRoutes);
app.use('/favorite',favoriteRoutes);

// 소켓 연결 기본(성공, ERROR) 이벤트 처리
io.on('connection', (socket) => {
    console.log(`소켓 ${socket.id}가 연결되었습니다.`);

    // /utils/setupSocketEvents.js 에서 소켓 이벤트를 설정합니다.
    setupSocketEvents(socket, io); // 소켓 이벤트 설정
});



// 에러 처리 미들웨어(서버 실행 직전 위치)
app.use((err, req, res, next) => {
    console.error(err); // 에러를 콘솔에 출력
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' }); // 에러 메시지와 상태 코드 응답
});

// 서버 실행
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
