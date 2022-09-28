const Marketplace = artifacts.require("../contracts/Marketplace.sol");

module.exports = function (deployer) {
  deployer.deploy(Marketplace);
};
