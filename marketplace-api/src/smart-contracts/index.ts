import Nft from './build/Nft.json'
import Marketplace from './build/Marketplace.json'

const marketplaceNetworkId = Object.keys(Marketplace.networks)[0]
const marketScData = {
  abi: Marketplace.abi,
  address: Marketplace.networks[marketplaceNetworkId].address
}

const nftNetworkId = Object.keys(Nft.networks)[0]
const nftScData = {
  abi: Nft.abi,
  address: Nft.networks[nftNetworkId].address
}

export {marketScData, nftScData}