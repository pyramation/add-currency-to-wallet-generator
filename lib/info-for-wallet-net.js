module.exports = function(pub, priv) {
  var networkVersion = require('./pub-to-network-prefix')(pub);
  var privateKeyPrefix = require('./priv-to-priv-prefix')(priv);

  var { compressed, uncompressed } = require('./get-chars')(
    parseInt(networkVersion, 16),
    parseInt(privateKeyPrefix, 16)
  );

  if (uncompressed.length > 1) uncompressed = `[${uncompressed.join('')}]`;
  else uncompressed = uncompressed[0];
  if (compressed.length > 1) compressed = `[${compressed.join('')}]`;
  else compressed = compressed[0];

  console.log('array to add to WalletGenerator.net:');

  console.log(
    '<nameOfCoin>',
    `0x${networkVersion}`,
    `0x${privateKeyPrefix}`,
    `'${uncompressed}'`,
    `'${compressed}'`,
    '<donationAddr>'
  );

  var coins = require('./coins');
  var similar = coins
    .filter(c => {
      if (
        c[1] === parseInt(networkVersion, 16) &&
        c[2] === parseInt(privateKeyPrefix, 16)
      ) {
        return true;
      }
    })
    .map(c => c[0]);

  if (similar.length) {
    console.log(`\nyour coin is similar to ${similar.join(', ')}`);
  }
};
