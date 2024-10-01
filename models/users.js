// Server/Models/Users.js
const db = require('../utils/db');

class Users {
    static async getUserByUsername(username) {
        const query = `
            SELECT username, nickname, email, profile_photo_url
            FROM users 
            WHERE username = ?
        `;
        const [rows] = await db.query(query, [username]);
        return rows[0];
    }

    static async deleteProfilePhoto(profilePhotoUrl) {
        if (!profilePhotoUrl) return;

        const photoPath = path.join(__dirname, '..', profilePhotoUrl);
        fs.unlink(photoPath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${photoPath}`, err);
            } else {
                console.log(`File deleted: ${photoPath}`);
            }
        });
    }

    static async updateUser(userData) {
        const { username, email, nickname, profilePhotoUrl, password } = userData;

        // 기본 UPDATE
        let updateQuery = `UPDATE users`;

        // SET 문 구성
        let setFields = []; 
        let values = [];

        if (email) { setFields.push(`email = ?`); values.push(email); }
        if (nickname) { setFields.push(`nickname = ?`); values.push(nickname);}
        if (profilePhotoUrl) { setFields.push(`profile_photo_url = ?`); values.push(profilePhotoUrl); }

        // SET 문이 비어있지 않은 경우에만 쿼리를 실행
        if (setFields.length > 0) {
            let setQuery = ` SET ` + setFields.join(', ');
            let finalQuery = updateQuery + setQuery + whereQuery;

            // WHERE 조건에 해당하는 username 추가
            let whereQuery = ` WHERE username = ?`;
            values.push(username);

            try {
                const [result] = await db.query(finalQuery, values);
                return result.affectedRows > 0; // 업데이트 성공 여부 확인
            } catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        } else {
            throw new Error('No fields to update');
        }
    }
}

module.exports = Users;
