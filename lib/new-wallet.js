const bitcoin = require('bitcoinjs-lib');

module.exports = (pubKeyHash, wif) => {
  const network = require('./get-network')(pubKeyHash, wif);
  var pair = bitcoin.ECPair.makeRandom({ network });
  return {
    public: pair.getAddress(),
    private: pair.toWIF()
  };
};
