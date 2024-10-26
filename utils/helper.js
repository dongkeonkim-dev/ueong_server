const { User } = require('./db/models');
const usernameToId = (input) => {
  input.user_id = User.user_id(input.username);
  delete input.username;
  return input;
}

module.exports = { usernameToId };
