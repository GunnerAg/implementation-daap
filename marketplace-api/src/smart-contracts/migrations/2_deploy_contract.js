/* eslint-disable no-undef */
const MarketPlace = artifacts.require('../contracts/Marketplace.sol');

module.exports = async function (deployer) {
  await deployer.deploy(MarketPlace);
};
