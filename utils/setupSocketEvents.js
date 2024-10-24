const db = require('./db/knex');

// 메시지 큐 선언 (FIFO 방식)
let messageQueue = [];

// 메시지 큐 처리 중인지 여부 플래그
let isProcessingQueue = false;

// 메시지 큐에 메시지 추가 및 처리 시작
function addToQueue(messageData, io) {
    messageQueue.push(messageData); // 메시지를 큐에 추가
    processQueue(io); // 큐 처리 시작
}

// 메시지 큐 처리 함수
async function processQueue(io) {
    if (isProcessingQueue) return; // 이미 처리 중이면 중단

    isProcessingQueue = true; // 처리 중으로 상태 변경

    while (messageQueue.length > 0) {
        const messageData = messageQueue.shift(); // 큐에서 첫 번째 메시지 꺼냄
        await processMessage(messageData, io); // 메시지 처리 시 io 전달
    }

    isProcessingQueue = false; // 처리 완료 후 상태 변경
}

// 실제 메시지 처리 로직
async function processMessage({ roomIdToSend, username, content }, io) {
    console.log(`메시지 처리 중: ${username} -> ${content}`);

    try {
        // username으로 user_id를 가져오는 쿼리
        const userIdQuery = 'SELECT user_id FROM users WHERE username = ?';
        const [userResults] = await db.query(userIdQuery, [username]);

        if (userResults.length === 0) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }

        const senderId = userResults[0].user_id;

        // 트랜잭션 시작
        const connection = await db.getConnection();
        await connection.beginTransaction();

        // 메시지를 messages 테이블에 저장하는 쿼리
        const insertMessageQuery = `
            INSERT INTO messages (sender_id, message_text, chat_id, sent_time)
            VALUES (?, ?, ?, NOW())
        `;
        const [insertResult] = await connection.execute(insertMessageQuery, [senderId, content, roomIdToSend]);

        // 생성된 메시지의 ID 가져오기
        const messageId = insertResult.insertId;

        // chats 테이블의 last_message_id 업데이트
        const updateChatQuery = 'UPDATE chats SET last_message_id = ? WHERE chat_id = ?';
        await connection.execute(updateChatQuery, [messageId, roomIdToSend]);

        // 트랜잭션 커밋
        await connection.commit();

        // 새로 저장된 메시지를 가져오는 쿼리
        const fetchMessageQuery = `
            SELECT
                m.message_id AS messageId,
                u.username AS username,
                u.nickname AS userNickname,
                u.profile_photo_url AS senderProfilePhotoURL,
                m.message_text AS messageText,
                m.sent_time AS sentTime,
                m.is_read AS isRead,
                m.chat_id AS chatId
            FROM messages m
            JOIN users u ON m.sender_id = u.user_id
            WHERE m.message_id = ?
        `;
        const [messageResults] = await connection.query(fetchMessageQuery, [messageId]);

        // 클라이언트에게 새로 저장된 메시지 전송
        io.to(roomIdToSend).emit('sendMessageResponse', {
            success: true,
            messages: messageResults.map(row => ({
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

        connection.release();
        console.log(`메시지 저장 및 전송 완료: ${messageId}`);
    } catch (error) {
        console.error('메시지 처리 중 오류 발생:', error);
    }
}

// 채팅 방 생성 함수
async function createNewChatRoom(username, partnerUsername, postId) {
    try {
        // 사용자 ID를 찾기 위한 쿼리
        const findUserIdsQuery = `
            SELECT user_id
            FROM users
            WHERE username IN (?, ?)
        `;

        const [users] = await db.query(findUserIdsQuery, [username, partnerUsername]);

        if (users.length < 2) {
            console.error("사용자를 찾을 수 없습니다.");
            return null; // 사용자 ID를 찾을 수 없을 경우 null 반환
        }

        const buyerId = users[0].user_id; // 첫 번째 사용자의 ID (username)
        const sellerId = users[1].user_id; // 두 번째 사용자의 ID (partnerUsername)

        // 새로운 채팅 방을 생성하는 SQL 쿼리
        const insertChatQuery = `
            INSERT INTO chats (seller_id, buyer_id, post_id)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.query(insertChatQuery, [sellerId, buyerId, postId]);
        return result.insertId; // 생성된 채팅 방의 ID 반환
    } catch (error) {
        console.error("채팅 방 생성 중 오류 발생:", error);
        return null; // 오류 발생 시 null 반환
    }
}


//-----------------------------------------------------------------------------------------------------------------------------

const setupSocketEvents = (socket, io) => {
    // 소켓 연결 성공 시 성공 메시지 수신과 전송
    socket.on('acknowledge', (message) => {
        console.log(`클라이언트로부터 확인 메시지: ${message}`);

        // 필요에 따라 클라이언트에게 추가 메시지를 보낼 수 있음
        socket.emit('response', '서버에서 메시지를 받았습니다.');
        console.log("서버연결 성공 메시지 클라이언트에게 보냈습니다.");
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

    // 채팅방 조인 이벤트 수신 (사용자가 처음 앱에 접속했을때 기존에 참여중인 채팅방 연결)
    // 여러 채팅방에 참가하는 이벤트
    socket.on('joinChatRoom', (roomIds) => {
        roomIds.forEach((roomId) => {
            socket.join(roomId);
            console.log(`사용자가 ${roomId} 방에 참가함: ${socket.id}`);
        });
    });


    // 채팅방 조인 이벤트 수신 (사용자가 새로운 채징방 입장시 채팅방 연결)?

    //createchat 소켓 수신을 받아 새로운 chats 레코드를 생성하고, 생성된 chats레코드의 id값을 join하여 클라이언트가 채팅방의 입장하게


    // 메시지 보내기 이벤트 처리
    socket.on('sendMessage', async (roomIdToSend, username, partnerUsername, content, postId) => {
        // 메시지 유효성 검증
        if (!content || content.trim() === '') {
            return socket.emit('messageError', '메시지가 비어있습니다.');
        }

        // 채팅방 ID가 유효한지 확인
        if (roomIdToSend == -1) {
            try {
                const newChatRoomId = await createNewChatRoom(username, partnerUsername, postId);
                if (!newChatRoomId) {
                    return socket.emit('newChatRoomError', '채팅 방 생성에 실패했습니다.');
                }
                roomIdToSend = newChatRoomId;
                socket.join(roomIdToSend);
                console.log(`새로운 채팅방 ${roomIdToSend}에 사용자가 참가했습니다.`);
            } catch (error) {
                console.error("채팅 방 생성 중 오류 발생:", error);
                return socket.emit('newChatRoomError', '채팅 방 생성 중 오류가 발생했습니다.');
            }
        }

        // 메시지 큐에 메시지 추가
        console.log(`전송된 메시지: ${roomIdToSend}, ${username}, ${content}`);
        addToQueue({ roomIdToSend, username, content }, io);
    });


};

module.exports = setupSocketEvents;


