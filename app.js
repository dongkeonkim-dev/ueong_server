// Server/app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const myVillageRoutes = require('./routes/my-village-routes');

app.use(express.json());

// 라우트 설정
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/my-village', myVillageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
