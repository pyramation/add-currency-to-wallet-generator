const bitcoin = require('bitcoinjs-lib');
module.exports = (pubKeyHash, wif) => {
  const network = require('./get-network')(pubKeyHash, wif);

  var cmp = {};
  for (var i = 0; i < 250; i++) {
    var pair = bitcoin.ECPair.makeRandom({ network, compressed: true });
    cmp[pair.toWIF()[0]] = 1;
  }

  var uncmp = {};
  for (var i = 0; i < 250; i++) {
    var pair = bitcoin.ECPair.makeRandom({ network, compressed: false });
    uncmp[pair.toWIF()[0]] = 1;
  }

  return {
    compressed: Object.keys(cmp).sort(),
    uncompressed: Object.keys(uncmp).sort()
  };
};
