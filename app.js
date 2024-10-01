// Server/app.js
const express = require('express');
const cors = require('cors'); // cors 패키지 불러오기
const path = require('path'); // path 모듈 불러오기
const app = express();

const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const chatRoutes = require('./routes/chat-routes');
const postRoutes = require('./routes/post-routes');
const photoRoutes = require('./routes/photo-routes');
const messageRoutes = require('./routes/message-routes');
const myVillageRoutes = require('./routes/my-village-routes');
const addressRoutes = require('./routes/address-routes');

app.use(express.json({ limit: '10mb' })); // JSON 요청 본문 크기를 10MB로 설정
app.use(express.urlencoded({ limit: '10mb', extended: true })); // URL 인코딩된 데이터의 크기 제한 설정
app.use(cors()); // CORS 미들웨어 추가

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
