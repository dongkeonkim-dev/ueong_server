const db = require('./db');
const bcrypt = require('bcrypt');

async function hashPasswords() {
  const [users] = await db.query('SELECT user_id, password FROM users');
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db.query('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, user.user_id]);
  }
  console.log('All passwords have been hashed.');
  process.exit(0);
}

hashPasswords().catch(err => {
  console.error('Error hashing passwords:', err);
  process.exit(1);
});
