const bcrypt = require("bcrypt");

function hashPassword(password) {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, existingUserPassword) {
  return bcrypt.compare(password, existingUserPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
