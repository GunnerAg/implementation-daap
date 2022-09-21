var axios = require("axios");

/**
 * It takes in a name, rarity, and imgURL, and returns the IPFS hash of the image
 * @param string - name
 * @param number - The number of the card
 * @param string - name
 * @returns {
 *   "IpfsHash": "QmZQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
 */
export default async function ipfsHelper({ name, rarity, image }) {
  let data = {
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name,
    },
    pinataContent: {
      name,
      rarity,
      image,
    },
  };

  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZmY4MDBkNy01ZGY4LTRmZGUtYjE3MC1hNGFhNjU3ZDY2NjciLCJlbWFpbCI6Imd1bm5lci5hbmRlcnNlbi5naWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImMxMTZhYjYxYzhmNTU3ODE1ZmI2Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDc0MTI2MGViYTI1NjY4ZjM1NGJiNWRhMjFiODg2ODM5Mjk2ZmQ1Y2RhMGNhZGJmN2NlYWI1N2Q2MDEyODk0NiIsImlhdCI6MTY2MzE0NjE3M30.W57E-vULBkPEpPpwcoAubVcMOmYh3J3Q7BKUgqsqGqs",
      pinata_api_key: "c116ab61c8f557815fb6",
      pinata_secret_api_key:
        "4741260eba25668f354bb5da21b886839296fd5cda0cadbf7ceab57d60128946",
    },
    data: data,
  };

  const res = await axios(config);


  return res.data;
}

// var config = {
//   method: "post",
//   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZmY4MDBkNy01ZGY4LTRmZGUtYjE3MC1hNGFhNjU3ZDY2NjciLCJlbWFpbCI6Imd1bm5lci5hbmRlcnNlbi5naWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJhZjZmNTVkOWIyZTc3MjgxMDhlIiwic2NvcGVkS2V5U2VjcmV0IjoiYzhmOTlhMTc1NDYwMmIwMTUxMjY5Y2EzNDVhNDg1NWJhMDkyMDIzOWVhZWZlZDVjZmY4ODU0YjA1ZDIyZWJmMSIsImlhdCI6MTY2MzE0NTU3MH0.FennSoUzSp_nLGD066fvZmapPnUFur5p2trFN1lchRE",
//     pinata_api_key: "baf6f55d9b2e7728108e",
//     pinata_secret_api_key:
//       "c8f99a1754602b0151269ca345a4855ba0920239eaefed5cff8854b05d22ebf1",
//   },
//   data: data,
// };


// API Key
// c116ab61c8f557815fb6
// API Secret
// 4741260eba25668f354bb5da21b886839296fd5cda0cadbf7ceab57d60128946
// JWT
// (Secret access token)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZmY4MDBkNy01ZGY4LTRmZGUtYjE3MC1hNGFhNjU3ZDY2NjciLCJlbWFpbCI6Imd1bm5lci5hbmRlcnNlbi5naWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImMxMTZhYjYxYzhmNTU3ODE1ZmI2Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDc0MTI2MGViYTI1NjY4ZjM1NGJiNWRhMjFiODg2ODM5Mjk2ZmQ1Y2RhMGNhZGJmN2NlYWI1N2Q2MDEyODk0NiIsImlhdCI6MTY2MzE0NjE3M30.W57E-vULBkPEpPpwcoAubVcMOmYh3J3Q7BKUgqsqGqs