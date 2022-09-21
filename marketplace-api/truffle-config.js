/* eslint-disable max-len */
const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
}

module.exports = {
  contracts_directory: './src/smart-contracts/contracts',
  contracts_build_directory: './src/smart-contracts/build',
  migrations_directory: './src/smart-contracts/migrations',
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: 5777,
      gas: 4612388,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, 'https://rinkeby.infura.io/v3/c91b3318090544299c446a05dd64bc94'),
      network_id: 4, // Rinkeby's id
      gas: 5500000,
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    production: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, 'https://mainnet.infura.io/v3/0fac5112667f431ca458f6bd1b2790b0'),
      network_id: 1, // Ethereum id.
      gas: 5500000,
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: '^0.8.0',
    },
  },
};
