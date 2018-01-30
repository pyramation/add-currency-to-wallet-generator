module.exports = (pubKeyHash, wif) => {
  return {
    messagePrefix: '',
    bip32: {
      public: 0x0, // TODO DONT USE
      private: 0x0 // TODO DONT USE
    },
    pubKeyHash,
    scriptHash: 0x0, // TODO DONT USE
    wif
  };
};
