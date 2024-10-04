const db = require('./db');

const setupSocketEvents = (socket, io) => {
    // 소켓 연결 성공 시 성공 메시지 수신과 전송
    socket.on('acknowledge', (message) => {
        console.log(`클라이언트로부터 확인 메시지: ${message}`);

        // 필요에 따라 클라이언트에게 추가 메시지를 보낼 수 있음
        socket.emit('response', '서버에서 메시지를 받았습니다.');
        console.log("메시지를 보냈습니다.");
    });

    // 소켓 연결 ERROR 처리
    socket.on('error', (error) => {
        console.log(`소켓 ${socket.id}에서 오류 발생: ${error}`);
    });

    // 채팅방 존재 확인
    socket.on('checkChat', async (username, postId) => {
        console.log("서버 checkChat 확인");
        console.log(`username: ${username}, postId: ${postId}`);

        try {
            // username으로 user_id 가져오기
            const userIdQuery = 'SELECT user_id FROM users WHERE username = ?';
            console.log("서버 쿼리 확인");

            const [userResults] = await db.query(userIdQuery, [username]);

            if (userResults.length === 0) {
                console.log("사용자를 찾을 수 없습니다.");
                socket.emit('checkChatResponse', false); // 사용자 없으면 false 반환
                return;
            }

            const userId = userResults[0].user_id; // user_id 추출

            // chatExists 쿼리 수행
            const chatExistsQuery = `
                SELECT EXISTS(
                    SELECT 1 
                    FROM chats 
                    WHERE (seller_id = ? OR buyer_id = ?) 
                    AND post_id = ?
                ) AS chatExists;
            `;

            const [chatResults] = await db.query(chatExistsQuery, [userId, userId, postId]);
            const chatExists = chatResults[0].chatExists === 1; // 채팅방 존재 여부
            socket.emit('checkChatResponse', chatExists); // 클라이언트에 응답 전송
            console.log("채팅룸 유무 전송완료");
        } catch (error) {
            console.error("쿼리 실행 중 에러 발생:", error);
            socket.emit('checkChatResponse', false); // 에러 발생 시 클라이언트에 false 응답
        }
    });

    // 채팅 리스트 이벤트 수신
    socket.on('chatList', async (username) => {
        try {
            // 데이터베이스에 대한 연결 생성
            const connection = await createDbConnection();

            // 채팅 정보를 가져오기 위한 SQL 쿼리
            const query = `
            SELECT 
            c.chat_id AS id, 
            CASE 
                WHEN c.buyer_id = u.user_id THEN u2.nickname 
                ELSE u.nickname 
            END AS partnerNickname,
            CASE 
                WHEN c.buyer_id = u.user_id THEN u2.profile_photo_url 
                ELSE u.profile_photo_url 
            END AS partnerProfilePhotoURL,
            m.message_text AS lastMessageText,
            m.sent_time AS rawLastSentTime,
            c.post_id AS relatedPostId,
            (SELECT COUNT(*) 
            FROM messages 
            WHERE chat_id = c.chat_id AND is_read = 0 AND sender_id != u.user_id) AS unreadMessages,
            CASE 
                WHEN c.buyer_id = u.user_id THEN c.seller_id 
                ELSE c.buyer_id 
            END AS partnerId -- 상대방의 ID 추가
            FROM 
                chats c
            JOIN 
                users u ON u.user_id = ? -- 로그인한 사용자 ID
            LEFT JOIN 
                users u2 ON u2.user_id = 
                    CASE 
                        WHEN c.buyer_id = u.user_id THEN c.seller_id 
                        ELSE c.buyer_id 
                    END
            LEFT JOIN 
                messages m ON m.message_id = c.last_message_id -- last_message_id로 조인
            WHERE 
                u.username = ? -- 특정 username으로 검색
            ORDER BY 
                m.sent_time DESC;
            `;

            const [results] = await connection.execute(query, [username, username]);

            // 클라이언트에 채팅 데이터를 전송
            socket.emit('chatListResponse', {
                success: true,
                chats: results.map(row => ({
                    id: row.chat_id,
                    buyerUsername: row.buyerUsername,
                    buyerNickname: row.buyerNickname,
                    sellerNickname: row.sellerNickname,
                    sellerProfilePhotoURL: row.sellerProfilePhotoURL,
                    lastMessageText: row.lastMessageText,
                    rawLastSentTime: row.rawLastSentTime,
                    unreadMessages: row.unreadMessages
                }))
            });
        } catch (error) {
            console.error("채팅 리스트 가져오기 중 에러 발생:", error);
            socket.emit('chatListResponse', { success: false });
        }
    });
};

module.exports = setupSocketEvents;
