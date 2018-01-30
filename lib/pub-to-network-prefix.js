const Bitcoin = require('bitcoinjs-lib');
module.exports = publicAddr => {
  return Bitcoin.address.fromBase58Check(publicAddr).version.toString(16);
};
