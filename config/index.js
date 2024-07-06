//config/index.js
const config = {
    port: 3000,
    secretKey: 'your_secret_key', // JWT 서명에 사용되는 비밀 키
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '11223344',
        database: 'ueong'
    }
};

module.exports = config;
