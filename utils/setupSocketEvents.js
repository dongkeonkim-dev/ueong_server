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
        console.log(`chatList수신데이터 - username: ${username}`);
        try {
            // 채팅 정보를 가져오기 위한 SQL 쿼리
            const query = `
            SELECT 
            c.chat_id,
            u2.nickname AS partnerNickname,
            u2.username AS partnerUsername,
            u2.profile_photo_url AS partnerProfilePhotoURL,
            m.message_text AS lastMessageText,
            m.sent_time AS rawLastSentTime,
            c.post_id AS relatedPostId,
            COUNT(m_unread.message_id) AS unreadMessages,
            u_last_sender.nickname AS lastSenderNickname  -- 마지막 메시지 보낸 유저의 닉네임 추가
            FROM 
                chats c
            JOIN 
                users u1 ON c.seller_id = u1.user_id OR c.buyer_id = u1.user_id
            JOIN 
                users u2 ON (c.seller_id = u2.user_id OR c.buyer_id = u2.user_id) AND u1.user_id <> u2.user_id
            LEFT JOIN 
                messages m ON c.last_message_id = m.message_id
            LEFT JOIN 
                messages m_unread ON c.chat_id = m_unread.chat_id AND m_unread.sender_id <> u1.user_id AND m_unread.is_read = 0
            LEFT JOIN 
                users u_last_sender ON m.sender_id = u_last_sender.user_id  -- 마지막 메시지를 보낸 유저의 정보를 가져오기 위한 조인
            WHERE 
                u1.username = ?  -- username을 바인딩 변수로 사용
            GROUP BY 
                c.chat_id, u2.nickname, u2.username, u2.profile_photo_url, m.message_text, m.sent_time, c.post_id, u_last_sender.nickname;  -- 마지막 메시지 보낸 유저의 닉네임을 GROUP BY에 추가
            `;

            const [results] = await db.execute(query, [username]);
            console.log("채팅리스트 불러오기 쿼리 실행 완료!")
            //쿼리문 결과값 출력
            console.log(`results: ${JSON.stringify(results, null, 2)}`); 

            // 클라이언트에 채팅 데이터를 전송
            socket.emit('chatListResponse', {
                    success: true,
                    chats: results.map(row => ({
                    id: row.chat_id,  // "id"로 변경
                    partnerUsername: row.partnerUsername,
                    partnerNickname: row.partnerNickname,
                    partnerProfilePhotoURL: row.partnerProfilePhotoURL,
                    lastMessageText: row.lastMessageText,
                    rawLastSentTime: row.rawLastSentTime,
                    relatedPostId: row.relatedPostId,
                    unreadMessages: row.unreadMessages,
                    lastSenderNickname: row.lastSenderNickname
                }))
            });
        } catch (error) {
            console.error("채팅 리스트 가져오기 중 에러 발생:", error);
            socket.emit('chatListResponse', { success: false });
        }
    });

    // 메시지 리스너 이벤트 수신
    socket.on('loadExistingMessages', async (chatId) => {
        console.log(`message불러오기: ${chatId}`);
    
        try {
            // 메시지 정보를 가져오기 위한 SQL 쿼리
            const query = `
                SELECT 
                    m.message_id AS messageId,
                    u.username AS username,
                    u.nickname AS userNickname,
                    u.profile_photo_url AS senderProfilePhotoURL,
                    m.message_text AS messageText,
                    m.sent_time AS sentTime,
                    m.is_read AS isRead,
                    m.chat_id AS chatId
                FROM 
                    messages m
                JOIN 
                    users u ON m.sender_id = u.user_id
                WHERE 
                    m.chat_id = ?;
            `;
    
            const [results] = await db.execute(query, [chatId]);
            console.log("채팅 메시지 불러오기 쿼리 실행 완료!");
            // 쿼리 결과값 출력
            console.log(`results: ${JSON.stringify(results, null, 2)}`);
    
            // 클라이언트에 메시지 데이터를 전송
            socket.emit('loadExistingMessagesResponse', {
                success: true,
                messages: results.map(row => ({
                    messageId: row.messageId,  // 메시지 ID
                    username: row.username,  // 메시지 보낸 사용자 이름
                    userNickname: row.userNickname,  // 보낸 사용자 닉네임
                    senderProfilePhotoURL: row.senderProfilePhotoURL,  // 사용자 프로필 사진 URL
                    messageText: row.messageText,  // 메시지 내용
                    sentTime: row.sentTime,  // 메시지 보낸 시간
                    isRead: row.isRead,  // 메시지 읽음 여부
                    chatId: row.chatId  // 채팅방 ID
                }))
            });
        } catch (error) {
            console.error("채팅 메시지 가져오기 중 에러 발생:", error);
            socket.emit('loadExistingMessagesResponse', { success: false });
        }
    });

};

module.exports = setupSocketEvents;
