import Web3 from "web3";

if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
  window.web3 = new Web3(window.ethereum);
} else {
  console.error("Metamask not installed.");
}

const networks = {
  rinkeby: {
    id: "0x4",
    chainName: "Ethereum Rinkeby",
    tokenName: "Rinkeby ETH",
    tokenSymbol: "ETH",
    decimals: 18,
    rpcList: ["https://rinkeby.infura.io/v3/"],
    explorerList: ["https://rinkeby.etherscan.io"],
  },
};

export class NFT {
  constructor(contractData) {
    this.contractData = contractData;
    this.abi = contractData.abi;
    this.address = contractData.address;
    this.contract = new window.web3.eth.Contract(this.abi, this.address);
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
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: id,
                chainName: chainName,
                nativeCurrency: {
                  name: tokenName,
                  Symbol: tokenSymbol,
                  decimals: decimals,
                },
                rpcUrls: rpcList,
                blockExplorerUrls: explorerList,
                iconUrls: [""],
              },
            ],
          });
        } catch (addErr) {
          throw new Error(`Only ${chainName} should work`);
        }
      } else throw new Error(`Web3 provider error`);
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
    const account = await this.getAccount();

    try {
      const tokenID = await this.contract.methods
        .tokenOfOwnerByIndex(account, index)
        .call();
      return tokenID;
    } catch (error) {
      return error;
    }
  }

  async fromWei(amount) {
    await this.addNetwork(networks.rinkeby);
    return Number(Web3.utils.fromWei(amount, "ether"));
  }

  // EJECUCION BASADA EN EVENTOS, LOS USAMOS CON LOS WEBSOCKETS EN EL TEMA 6 PARA COMUNICAR SERVER Y CLIENTS. (MAS EN EL LINK)
  // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#events,
  // En cada .on escuchamos a un evento distinto, es preferible a .then . catch ya que nos permite filtrar mejor las respuestas,
  // y nos aporta flexibilidad, ya que podemos usar los datos de cualquier evento instantes despues de que se emita.

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
        console.log("METAMASK TRANSACTION HASH", hash);
      })
      .on("receipt", function (receipt) {
        return receipt;
      })
      .on("error", function (error) {
        return error;
      });
  }

  // EJECUCION ASINCRONA BASADA EN LAS PROMISE (MAS EN EL LINK)
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch),
  // En el .then capturamos los resultados positivos y en el .catch los errores.
  //
  // async mint(tokenURI) {
  //   await this.addNetwork(networks.rinkeby);
  //   const account = await this.getAccount();

  //   return this.contract.methods
  //     .safeMint(account, tokenURI)
  //     .send({
  //       from: account,
  //       gas: 5500000,
  //     })
  //     .on("transactionHash", function (hash) {
  //       console.log("METAMASK TRANSACTION HASH", hash);
  //     })
  //     .then((receipt) => {
  //       console.log(
  //         "METAMASK TRANSACTION receipt",
  //         receipt.events.Transfer.returnValues.tokenId
  //       );
  //       return receipt.events.Transfer.returnValues.tokenId;
  //     })
  //     .catch((error) => {
  //       console.log("METAMASK TRANSACTION ERROR", error);
  //       return error;
  //     });
  // }

  async approve(address, id) {
    await this.addNetwork(networks.rinkeby);
    const account = await this.getAccount();

    return this.contract.methods
      .approve(address, id)
      .send({
        from: account,
      })
      .on("transactionHash", function (hash) {
        console.log("METAMASK TRANSACTION HASH", hash);
      })
      .then((receipt) => {
        console.log("METAMASK TRANSACTION receipt", receipt);
      })
      .catch((error) => {
        console.log("METAMASK TRANSACTION ERROR", error);
        return error;
      });
  }

  async tokenURI(id) {
    await this.addNetwork(networks.rinkeby);
    console.log(id);
    try {
      return await this.contract.methods.tokenURI(id).call();
    } catch (error) {
      return error;
    }
  }

  async isOwner() {
    await this.addNetwork(networks.rinkeby);
    const account = await this.getAccount();

    try {
      const owner = await this.contract.methods.owner().call();
      return owner.toUpperCase() === account.toUpperCase();
    } catch (error) {
      return error;
    }
  }
}

export class Marketplace {
  constructor(contractData) {
    this.contractData = contractData;
    this.abi = contractData.abi;
    this.address = contractData.address;
    this.contract = new window.web3.eth.Contract(this.abi, this.address);
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
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: id,
                chainName: chainName,
                nativeCurrency: {
                  name: tokenName,
                  Symbol: tokenSymbol,
                  decimals: decimals,
                },
                rpcUrls: rpcList,
                blockExplorerUrls: explorerList,
                iconUrls: [""],
              },
            ],
          });
        } catch (addErr) {
          throw new Error(`Only ${chainName} should work`);
        }
      } else throw new Error(`Web3 provider error`);
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
    await this.addNetwork(networks.rinkeby);
    return Number(Web3.utils.fromWei(amount, "ether"));
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
      .on("receipt", function (receipt) {
        return receipt;
      })
      .on("error", function (error) {
        return error;
      });
    // .then((receipt) => {
    //   console.log("Metamask transaction OK", receipt);
    //   return receipt.events.ItemBought.returnValues.tokenId;
    // })
    // .catch((error) => {
    //   console.log("Metamask transaction FAIL", error);
    //   return error;
    // });
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
      .on("receipt", function (receipt) {
        return receipt;
      })
      .on("error", function (error) {
        return error;
      });

    // .then((receipt) => {
    //   console.log("Metamask transaction OK", receipt);
    //   return receipt.events.ItemListed.returnValues.tokenId;
    // })
    // .catch((error) => {
    //   console.log("Metamask transaction FAIL", error);
    //   return error;
    // });
  }

  async withdrawProceeds() {
    await this.addNetwork(networks.rinkeby);
    const account = await this.getAccount();

    return this.contract.methods
      .withdrawProceeds()
      .send({ from: account })
      .on("transactionHash", function (hash) {
        console.log("METAMASK TRANSACTION ACCEPT", hash);
      })
      .on("receipt", function (receipt) {
        return receipt;
      })
      .on("error", function (error) {
        return error;
      });

    // .then((receipt) => {
    //   console.log("Metamask transaction OK", receipt);
    // })
    // .catch((error) => {
    //   console.log("Metamask transaction FAIL", error);
    //   return error;
    // });
  }
}
