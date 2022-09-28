const NFT = artifacts.require("../contracts/NFT.sol");

module.exports = function (deployer) {
  deployer.deploy(NFT);
};
