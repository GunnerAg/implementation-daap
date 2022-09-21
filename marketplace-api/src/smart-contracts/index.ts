import nft from './build/Nft.json'
import market from './build/Marketplace.json'

const marketNetworkId = Object.keys(market.networks)[0]
export const marketScData= {
  abi: market.abi,
  address: market.networks[marketNetworkId].address
};

const nftNetworkId = Object.keys(nft.networks)[0]
export const nftScData = {
  abi: nft.abi,
  address: nft.networks[nftNetworkId].address
};