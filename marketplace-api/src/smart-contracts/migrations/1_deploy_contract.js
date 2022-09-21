/* eslint-disable no-undef */
const NFT = artifacts.require('../contracts/Nft.sol');

module.exports = async function (deployer) {
  await deployer.deploy(NFT);
};
