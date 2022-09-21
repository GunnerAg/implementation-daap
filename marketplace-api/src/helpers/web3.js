// import { nftScData, marketScData } from '../smart-contracts';

// const dotenv = require('dotenv');
// // Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// if (process.env.NODE_ENV === 'development') {
//   const envFound = dotenv.config();
//   if (envFound.error) {
//     // This error should crash whole process
//     throw new Error("⚠️  Couldn't find .env file  ⚠️");
//   }
// }

// // Get web3
// const Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/c91b3318090544299c446a05dd64bc94'));

// // get contract

// const markerContract = new web3.eth.Contract(marketScData.abi, marketScData.address);
// const nftContract = new web3.eth.Contract(nftScData.abi, nftScData.address);

// const nftAddress = nftScData.address;
// const marketAddress = marketScData.address;

// // await contract
// //   .getPastEvents('Transfer', {
// //     fromBlock: 0,
// //     toBlock: 'latest',
// //   })
// //   .then(function (events) {
// //     for (let i = 0; i < events.length; i++) {
// //       // const recipient = events[i].returnValues.to;
// //       console.log('✅ Events', events[i]);
// //     }
// //   });
// export const listItem = async (id, amount) => {
//   console.log('LIST', nftAddress, id, amount);

//   // return markerContract.methods
//   //   .listItem(nftAddress, id, amount)
//   //   .send({
//   //     from: process.env.PUBLIC_KEY,
//   //     gas: 5500000,
//   //   })
//   //   .on('transactionHash', function (hash) {
//   //     console.log('transaction ON', hash);
//   //   })
//   //   .then(receipt => {
//   //     console.log('transaction OK', receipt);
//   //     return receipt.events.Transfer.returnValues.tokenId;
//   //   })
//   //   .catch(error => {
//   //     console.log('transaction FAIL', error);
//   //   });

//   const price = await web3.eth.getGasPrice();
//   const weiAmount = await web3.utils.toWei(`${amount}`);
//   console.log(weiAmount);
//   const tx = {
//     from: process.env.PUBLIC_KEY,
//     to: marketAddress,
//     gas: 5500000,
//     gasPrice: price,
//     data: markerContract.methods.listItem(nftAddress, id, weiAmount).encodeABI(),
//   };

//   return await new Promise(async (resolve, reject) => {
//     await web3.eth.accounts
//       .signTransaction(tx, process.env.PRIVATE_KEY)
//       .then(signedTx => {
//         const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
//         sentTx.on('receipt', receipt => {
//           console.table('✅ Transaction receipt: ' + JSON.stringify(receipt, null, 4));
//           resolve();
//         });
//         sentTx.on('error', err => {
//           console.log('❌ Transaction error: ' + err);
//         });
//       })
//       .catch(err => {
//         console.log('❌ Signing error: ' + err);
//         reject();
//       });
//   });

//   // await new Promise(r => setTimeout(r, 1000 * 2));

//   // mint tokens
//   // for (let i = 0; i < validAddresses.length; i++) {
//   //   // Sleep()
//   //   console.log('⌛ Minting to: ' + validAddresses[i]);
//   //   //await new Promise((r) => setTimeout(r, 1000 * 10));

//   //   // Sleep()
//   //   // await new Promise((r) => setTimeout(r, 1000 * 60));
//   //   await new Promise(async (resolve, reject) => {
//   //     await web3.eth.accounts
//   //       .signTransaction(tx, process.env.PRIVATE_KEY)
//   //       .then(signedTx => {
//   //         const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
//   //         sentTx.on('receipt', receipt => {
//   //           console.table('✅ Transaction receipt: ' + JSON.stringify(receipt, null, 4));
//   //           resolve();
//   //         });
//   //         sentTx.on('error', err => {
//   //           console.log('❌ Transaction error: ' + err);
//   //         });
//   //       })
//   //       .catch(err => {
//   //         console.log('❌ Signing error: ' + err);
//   //         reject();
//   //       });
//   //   });

//   //   // console.log('✅ Succesfully minted to: ' + validAddresses[i]);
//   //   // await new Promise(r => setTimeout(r, 1000 * 2));

//   //   // CHECK FOR TOKEN URIS
//   //   await new Promise(async (resolve, reject) => {
//   //     await contract.methods
//   //       .tokenURI(i)
//   //       .call({ from: process.env.PUBLIC_KEY })
//   //       .then(result => {
//   //         console.log('✅ Token URI for ID ' + i + ':' + result);
//   //         resolve();
//   //       })
//   //       .catch(err => {
//   //         console.log('❌ Error getting token uri: ' + err);
//   //         reject();
//   //       });
//   //   });

//   //   await new Promise(r => setTimeout(r, 1000 * 2));
//   //   console.log('🔁 There are: ' + (validAddresses.length - 1 - i) + ' ' + 'itereations left');
//   // }
//   // console.log('Finished minting');
// };
