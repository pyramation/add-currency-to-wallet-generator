const bs58check = require('bs58check');
module.exports = privateKey => {
  return bs58check.decode(privateKey)[0].toString(16);
};
