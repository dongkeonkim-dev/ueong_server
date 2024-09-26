// Server/app.js
const express = require('express');
const cors = require('cors'); // cors 패키지 불러오기
const app = express();
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const chatRoutes = require('./routes/chat-routes');
const messageRoutes = require('./routes/message-routes');
const myVillageRoutes = require('./routes/my-village-routes');

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json());

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);
app.use('/my-village', myVillageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
