This project was built to streamline the process outlined here https://github.com/MichaelMure/WalletGenerator.net/wiki/How-to-add-a-new-currency

# to run

We baked all commands into simply just running one program, it will prompt you interactively:

```sh
node ./index.js
```

## things you can do

### verify private keys

```sh
node ./index.js
<choose "verify private key">
```

### get the information needed to add a currency to WalletGenerator

```sh
node ./index.js
<choose "get info for WalletGenerator.net">
```

### generate wallets

Once a wallet has been added to `coins.js`, you can just add a wallet

```sh
node ./index.js
<choose "create wallet">
```

There is also a manual way to create wallets of coins not yet in the `coins.js` if you know the network key and private key address prefixes:

```sh
node ./index.js
<choose "create wallet from network hash">
```
