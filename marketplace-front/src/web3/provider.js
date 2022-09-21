import Web3 from "web3";

window.web3 = new Web3(window.ethereum);

export const metamaskInstalled = () => {
  if (typeof window.ethereum !== "undefined") {
    return "MetaMask esta instalado";
  } else return "Metamask no instalado";
};

const networks = {
  binance: {
    id: "0x38",
    chainName: "Binance Smart Chain",
    tokenName: "BNB",
    tokenSymbol: "BNB",
    decimals: 18,
    rpcList: ["https://bsc-dataseed.binance.org/"],
    explorerList: ["https://bscscan.com/"],
  },
  binanceTestnet: {
    id: "0x61",
    chainName: "BSCT",
    tokenName: "tBNB",
    tokenSymbol: "Binance Chain Native Token",
    decimals: 18,
    rpcList: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    explorerList: ["https://bscscan.com/"],
  },
  rinkeby: {
    id: "0x4",
    chainName: "Ethereum Rinkeby",
    tokenName: "Rinkeby Ether",
    tokenSymbol: "ETH",
    decimals: 18,
    rpcList: ["https://rinkeby.infura.io/v3/"],
    explorerList: ["https://rinkeby.etherscan.io"],
  },
};

// NFT CONTRACT PROVIDER //
export class NFT {
  constructor(contractData) {
    this.contractData = contractData;
    this.abi = contractData.abi;
    this.address = contractData.address;
    this.contract = new window.web3.eth.Contract(this.abi, this.address);
  }

  status() {
    if (window.ethereum === undefined) {
      return false;
    } else {
      return true;
    }
  }

  async addNetwork(network) {
    const {
      id,
      chainName,
      tokenName,
      tokenSymbol,
      decimals,
      rpcList,
      explorerList,
    } = network;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: id }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: id,
                chainName: chainName,
                nativeCurrency: {
                  name: tokenName,
                  symbol: tokenSymbol,
                  decimals: decimals,
                },
                rpcUrls: rpcList,
                blockExplorerUrls: explorerList,
                iconUrls: [""],
              },
            ],
          });
        } catch (addError) {
          throw new Error(`Only ${chainName} should work`);
        }
      } else throw new Error(`Web3 provider error.`);
    }
  }

  async getAccount() {
    await this.addNetwork(networks.rinkeby);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return account;
  }

  async balanceOf() {
    await this.addNetwork(networks.rinkeby);
    const account = await this.getAccount();
    return await this.contract.methods.balanceOf(account).call(
      {
        from: account,
      },
      function (error, result) {
        if (error) {
          console.log(error);
          return error;
        } else {
          return result;
        }
      }
    );
  }

  async tokenOfOwnerByIndex(index) {
    await this.addNetwork(networks.rinkeby);

    try {
      const account = await this.getAccount();
      const tokenID = await this.contract.methods
        .tokenOfOwnerByIndex(account, index)
        .call();
      return tokenID;
    } catch (error) {
      return error;
    }
  }

  async tokenURI(id) {
    await this.addNetwork(networks.rinkeby);
    return await this.contract.methods.tokenURI(id).call();
  }

  async fromWei(amount) {
    // await test(chain);
    await this.addNetwork(networks.rinkeby);
    return Number(Web3.utils.fromWei(amount, "ether"));
  }

  async mint(tokenURI) {
    await this.addNetwork(networks.rinkeby);
    const account = await this.getAccount();
    return this.contract.methods
      .safeMint(account, tokenURI)
      .send({
        from: account,
        gas: 5500000,
      })
      .on("transactionHash", function (hash) {
        console.log("METAMASK TRANSACTION ACCEPT", hash);
      })
      .then((receipt) => {
        console.log("Metamask transaction OK", receipt);
        return receipt.events.Transfer.returnValues.tokenId;
      })
      .catch((error) => {
        console.log("Metamask transaction FAIL", error);
        return error;
      });
  }

  async approve(address, id) {
    await this.addNetwork(networks.rinkeby);

    const account = await this.getAccount();
    return this.contract.methods
      .approve(address, id)
      .send({
        from: account,
        // gas: 210000,
      })
      .on("transactionHash", function (hash) {
        console.log("METAMASK TRANSACTION ACCEPT", hash);
      })
      .then((receipt) => {
        console.log("Metamask transaction OK", receipt);
      })
      .catch((error) => {
        console.log("Metamask transaction FAIL", error);
        return error;
      });
  }

  async onClickConnect(chain) {
    await test(chain);
    window.ethereum.request({ method: "eth_requestAccounts" });
  }
}

// NFT CONTRACT PROVIDER //
export class Marketplace {
  constructor(contractData) {
    this.contractData = contractData;
    this.abi = contractData.abi;
    this.address = contractData.address;
    this.contract = new window.web3.eth.Contract(this.abi, this.address);
  }

  status() {
    if (window.ethereum === undefined) {
      return false;
    } else {
      return true;
    }
  }

  async addNetwork(network) {
    const {
      id,
      chainName,
      tokenName,
      tokenSymbol,
      decimals,
      rpcList,
      explorerList,
    } = network;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: id }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: id,
                chainName: chainName,
                nativeCurrency: {
                  name: tokenName,
                  symbol: tokenSymbol,
                  decimals: decimals,
                },
                rpcUrls: rpcList,
                blockExplorerUrls: explorerList,
                iconUrls: [""],
              },
            ],
          });
        } catch (addError) {
          throw new Error(`Only ${chainName} should work`);
        }
      } else throw new Error(`Web3 provider error.`);
    }
  }

  async getAccount() {
    await this.addNetwork(networks.rinkeby);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return account;
  }

  async fromWei(amount) {
    // await test(chain);
    await this.addNetwork(networks.rinkeby);
    return Number(Web3.utils.fromWei(amount, "ether"));
  }

  async toWei(amount) {
    // await test(chain);
    await this.addNetwork(networks.rinkeby);
    return await window.web3.utils.toWei(amount);
  }

  async buyItem(tokenId, amount, address) {
    await this.addNetwork(networks.rinkeby);

    const account = await this.getAccount();
    const weiAmount = await window.web3.utils.toWei(`${amount}`, "ether");

    return this.contract.methods
      .buyItem(address, tokenId)
      .send({
        from: account,
        value: weiAmount,
        gas: 5500000,
      })
      .on("transactionHash", function (hash) {
        console.log("METAMASK TRANSACTION ACCEPT", hash);
      })
      .then((receipt) => {
        console.log("Metamask transaction OK", receipt);
        return receipt.events.ItemBought.returnValues.tokenId;
      })
      .catch((error) => {
        console.log("Metamask transaction FAIL", error);
        return error;
      });
  }

  async listItem(tokenId, amount, address) {
    await this.addNetwork(networks.rinkeby);

    const account = await this.getAccount();
    const weiAmount = await window.web3.utils.toWei(`${amount}`, "ether");

    return this.contract.methods
      .listItem(address, tokenId, weiAmount)
      .send({
        from: account,
        gas: 5500000,
      })
      .on("transactionHash", function (hash) {
        console.log("METAMASK TRANSACTION ACCEPT", hash);
      })
      .then((receipt) => {
        console.log("Metamask transaction OK", receipt);
        return receipt.events.ItemListed.returnValues.tokenId;
      })
      .catch((error) => {
        console.log("Metamask transaction FAIL", error);
        return error;
      });
  }

  async withdrawProceeds() {
    console.log('FUNCTION CALLED')
    await this.addNetwork(networks.rinkeby);
    const account = await this.getAccount();
    console.log("FUNCTION CALLED 2");

    return this.contract.methods.withdrawProceeds().send(
      {
        from: account,
      })
     .on("transactionHash", function (hash) {
        console.log("METAMASK TRANSACTION ACCEPT", hash);
      })
      .then((receipt) => {
        console.log("Metamask transaction OK", receipt);
        // return receipt.events.ItemListed.returnValues.tokenId;
      })
      .catch((error) => {
        console.log("Metamask transaction FAIL", error);
        return error;
      });
  }
}
