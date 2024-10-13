// Server/Models/Posts.js
const db = require('../utils/db');

class Photos {
    static async getPhotosByPostId(postId) {
        const query = `
            SELECT *
            FROM photo
            WHERE post_id = ?
        `;
        const [rows] = await db.query(query, [postId]);
        return rows;
    }

    static async getPhotoById(postId) {
        const query = `
            SELECT *
            FROM photo
            WHERE post_id = ?
        `;
        const [rows] = await db.query(query, [postId]);
        return rows;
    }

    // 여러 사진을 한 번에 저장하는 함수 (최대 10개)
    static async savePhotos(photoDataArray) {
        if (photoDataArray.length === 0 || photoDataArray.length > 10) {
            throw new Error('You must provide between 1 and 10 photos.');
        }

        try {
            // VALUES (?, ?, ?), (?, ?, ?) ... 형식의 쿼리 생성
            const query = `
                INSERT INTO photo (photo_name, photo_directory, post_id) 
                VALUES ${photoDataArray.map(() => '(?, ?, ?)').join(', ')}
            `;

            // 값 배열 생성 (플랫하게 펼침)
            const values = photoDataArray.flatMap(photoData => [
                photoData.photo_name,
                photoData.photo_directory,
                photoData.post_id
            ]);

            // 쿼리 실행
            const [result] = await db.execute(query, values);

            // 삽입된 각 사진의 ID를 계산하여 반환
            return photoDataArray.map((photo, index) => ({
                photo_id: result.insertId + index,
                ...photo
            }));
        } catch (error) {
            console.error('Error saving photos:', error);
            throw error;
        }
    }
}
module.exports = Photos;
