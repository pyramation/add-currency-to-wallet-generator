var inquirer = require('inquirer');
var fuzzy = require('fuzzy');
inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
);

var coins = require('./lib/coins').map(c => {
  return c[0];
});

const searchCoins = (answers, input) => {
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, coins);
      resolve(
        fuzzyResult.map(function(el) {
          return el.original;
        })
      );
    }, 25);
  });
};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'cmd',
      message: 'what do you want to do?',
      choices: [
        { name: 'verify private key', value: 'verify' },
        { name: 'create a wallet', value: 'wallet' },
        { name: 'create a wallet from network hash', value: 'customwallet' },
        { name: 'get info for WalletGenerator.net', value: 'newcoin' }
      ]
    }
  ])
  .then(a => {
    if (a.cmd === 'wallet') {
      inquirer
        .prompt([
          {
            type: 'autocomplete',
            name: 'coin',
            message: 'pick a coin',
            source: searchCoins,
            required: true
          }
        ])
        .then(answer => {
          var i = coins.indexOf(answer.coin);
          if (i > -1) {
            var picked = require('./lib/coins')[i];
            console.log(require('./lib/new-wallet')(picked[1], picked[2]));
          }
        });
    } else if (a.cmd === 'customwallet') {
      inquirer
        .prompt([
          {
            type: 'string',
            name: 'publicKeyHash',
            message: 'enter a public key hash hex (without preceeding 0x)',
            required: true
          },
          {
            type: 'string',
            name: 'privateKeyHash',
            message: 'enter a private key hash hex (without preceeding 0x)',
            required: true
          }
        ])
        .then(answer => {
          console.log(
            require('./lib/new-wallet')(
              parseInt(answer.publicKeyHash, 16),
              parseInt(answer.privateKeyHash, 16)
            )
          );
        });
    } else if (a.cmd === 'verify') {
      inquirer
        .prompt([
          {
            type: 'autocomplete',
            name: 'coin',
            message: 'pick a coin',
            source: searchCoins,
            required: true
          },
          {
            type: 'password',
            name: 'privateKey',
            message: 'enter a private key',
            required: true
          }
        ])
        .then(answer => {
          var i = coins.indexOf(answer.coin);
          if (i > -1) {
            var picked = require('./lib/coins')[i];
            require('./lib/verify-private')(
              answer.privateKey,
              picked[1],
              picked[2]
            );
          }
        });
    } else if (a.cmd === 'newcoin') {
      inquirer
        .prompt([
          {
            type: 'string',
            name: 'publicKey',
            message: 'enter a public key',
            required: true
          },
          {
            type: 'password',
            name: 'privateKey',
            message: 'enter a private key',
            required: true
          }
        ])
        .then(answer => {
          require('./lib/info-for-wallet-net')(
            answer.publicKey,
            answer.privateKey
          );
        });
    }
  });
