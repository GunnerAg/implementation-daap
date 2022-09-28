
const DefaultLoaderCreateOwner = {
  type: "Only the owner can Create new NFT's",
  message: "If you want some NFT's go and check our Marketplace!",
  buttonText: "Marketplace",
  redirect: true,
  redirectUrl: "/marketplace",
  redirectText: "Marketplace",
};

const DefaultLoaderCreate = {
  type: "Processing Create order.",
  message: "Please wait while processing the request.",
};

const DefaultLoaderMarket = {
  type: "Processing Purchase order.",
  message: "Please wait while processing the request.",
};

const DefaultLoaderSell = {
  type: "Processing Sell order.",
  message: "Please wait while processing the request.",
};

const DefaultCreateSuccess = {
  type: "The NFT was created!",
  message: "Your NFT should appear on your collection soon. ",
  buttonText: "Close",
};

const DefaultCreateError = {
  type: "Error while trying to create the NFT",
  message: "Please wait and try again later",
  buttonText: "Close",
};

const DefaultBuySuccess = {
  type: "Token Purchased!",
  message: "Congrats, you bought a new NFT, it woul soon appear in your collection",
  buttonText: "Close",
};

const DefaultBuyError = {
  type: "Error while trying to purchase the NFT",
  message: "If the order is still on the marketplace, try again later.",
  buttonText: "Close",
};

/* A variable that is not being used. */

const DefaultSaleSuccess = {
  type: "The order was created!",
  message:
    "Your order should appear on the marketplace soon",
  buttonText: "Close",
};

const DefaultSaleError = {
  type: "Error while trying to create the Sell Order.",
  message: "If your order is not on the marketplace, try again later.",
  buttonText: "Close",
};

const DefaultLoaderProceeds = {
  type: "Withdrawing proceeds from your Marketplace sales!",
  message: "Getting all your profits from NFT sales",
};

const DefaultProceedsSuccess = {
  type: "Proceeds withdrown, check your wallet balance",
  message: "If you did not get proceeds, your NFT/s might still for sale",
  buttonText: "Close",
};

const DefaultProceedsError = {
  type: "Error while trying to retrive Proceeds.",
  message: "If your are sure you own proceeds, try again later.",
  buttonText: "Close",
};

export {
  DefaultLoaderCreate,
  DefaultLoaderCreateOwner,
  DefaultLoaderMarket,
  DefaultLoaderSell,
  DefaultCreateSuccess,
  DefaultCreateError,
  DefaultBuySuccess,
  DefaultBuyError,
  DefaultSaleSuccess,
  DefaultSaleError,
  DefaultLoaderProceeds,
  DefaultProceedsSuccess,
  DefaultProceedsError,
};
