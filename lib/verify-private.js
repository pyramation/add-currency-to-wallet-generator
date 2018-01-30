const bitcoin = require('bitcoinjs-lib');
module.exports = (privateKey, pubKeyHash, wif) => {
  const network = require('./get-network')(pubKeyHash, wif);
  const pair = bitcoin.ECPair.fromWIF(privateKey, network);
  console.log(pair.getAddress());
};
