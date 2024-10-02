// Server/app.js
const express = require('express');
const cors = require('cors'); // cors 패키지 불러오기
const path = require('path'); // path 모듈 불러오기
const app = express();
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

// 소켓 설정
const server = http.createServer(app);
const io = socketIo(server);

// CORS 설정
const corsOptions = {
    origin: 'http://localhost:3000', // 허용할 도메인
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 쿠키 및 인증 정보 전송 허용
    optionsSuccessStatus: 204 // IE 11 및 이전 버전 지원을 위한 설정
};

app.use(express.json({ limit: '10mb' })); // JSON 요청 본문 크기를 10MB로 설정
app.use(express.urlencoded({ limit: '10mb', extended: true })); // URL 인코딩된 데이터의 크기 제한 설정
app.use(cors(corsOptions)); // CORS 미들웨어 추가

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // uploads 폴더의 파일을 정적 파일로 제공

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/post', postRoutes);
app.use('/photo', photoRoutes);
app.use('/message', messageRoutes);
app.use('/my-village', myVillageRoutes);
app.use('/address', addressRoutes);

// 소켓 연결 이벤트 처리
io.on('connection', (socket) => {
    console.log(`소켓 ${socket.id}가 연결되었습니다.`);

    // ack를 사용하여 클라이언트에서 보낸 확인 응답을 처리
    socket.on('acknowledge', (message) => {
        console.log(`클라이언트로부터 확인 메시지: ${message}`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
