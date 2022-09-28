// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// ERRORES //
error PriceNotMet(address nfAddress, uint256 tokenId, uint256 price);
error PriceMustBeAboveZero();
error NotApprovedForMarketPlace();
error NotOwner();
error NoProceeds();
error AlreadyListed(address nftAddress, uint tokenId);
error NotListed(address nftAddress, uint tokenId);


contract Marketplace is ReentrancyGuard {

  struct Listing {
    uint price;
    address seller;
  }

  // EVENTOS //
  event ItemListed(
    address indexed seller,
    address indexed nftAddress,
    uint indexed tokenId,
    uint price
  );

  event ItemCanceled(
    address indexed seller,
    address indexed nftAddress,
    uint indexed tokenId
  );

  event ItemBought(
    address indexed buyer,
    address indexed nftAddress,
    uint indexed tokenId,
    uint price
  );

  // MAPPINGS //

  mapping(address => mapping(uint => Listing)) private s_listings;
  mapping(address => uint256) private s_proceeds;

  // MODIFIERS //

  modifier isOwner(
    address nftAddress,
    uint tokenId,
    address spender
  ) {
    IERC721 nft = IERC721(nftAddress);
    address owner = nft.ownerOf(tokenId);
    if (spender != owner) {
      revert NotOwner();
    }
    _;
  }

  modifier notListed(
    address nftAddress,
    uint tokenId,
    address owner
  ) {
    Listing memory listing = s_listings[nftAddress][tokenId];
    if (listing.price > 0) {
      revert AlreadyListed(nftAddress, tokenId);
    }
    _;
  }

  modifier isListed(
    address nftAddress,
    uint tokenId
  ) {
    Listing memory listing = s_listings[nftAddress][tokenId];
    if (listing.price <= 0) {
      revert NotListed(nftAddress, tokenId);
    }
    _;
  }


  // MAIN FUNCTIONS //

  // 2: Que no esté ya listado.  --> nftAddress, tokenId, msg.sender
  function listItem(
    address nftAddress,
    uint tokenId,
    uint price
  ) external
    isOwner(nftAddress, tokenId, msg.sender)
    notListed(nftAddress, tokenId, msg.sender)
  {
    if (price <= 0) {
      revert PriceMustBeAboveZero();
    }
    IERC721 nft = IERC721(nftAddress);
    if(nft.getApproved(tokenId) != address(this)) {
      revert NotApprovedForMarketPlace();
    }
    s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
    emit ItemListed(msg.sender, nftAddress, tokenId, price);
  }

  function cancelListing(address nftAddress, uint tokenId)
    external
    isOwner(nftAddress, tokenId, msg.sender)
    isListed(nftAddress,tokenId)
  {
    delete(s_listings[nftAddress][tokenId]);
    emit ItemCanceled(msg.sender, nftAddress, tokenId);
  }

  function buyItem(address nftAddress, uint tokenId)
    external
    payable
    isListed(nftAddress, tokenId)
    nonReentrant
  {
    Listing memory listedItem = s_listings[nftAddress][tokenId];

    if(msg.value < listedItem.price) {
      revert PriceNotMet(nftAddress, tokenId, listedItem.price);
    }

    s_proceeds[listedItem.seller] += msg.value;

    delete(s_listings[nftAddress][tokenId]);
    IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);
    emit ItemBought(msg.sender, nftAddress, tokenId, listedItem.price);
  }

  function updateListing(
    address nftAddress,
    uint tokenId,
    uint newPrice
  )
    external
    isListed(nftAddress, tokenId)
    nonReentrant
    isOwner(nftAddress, tokenId, msg.sender)
  {
    s_listings[nftAddress][tokenId].price = newPrice;
    emit ItemListed(msg.sender, nftAddress, tokenId, newPrice);
  }

  function withdrawProceeds() external {
    uint proceeds = s_proceeds[msg.sender];
    if (proceeds <= 0) {
      revert NoProceeds();
    }
    s_proceeds[msg.sender] = 0;
    (bool success, ) = payable(msg.sender).call{value: proceeds}("");
    require(success, "Transfer failed");

  }

  function getListItem(address nftAddress, uint tokenId)
    external
    view
    returns (Listing memory)
  {
    return s_listings[nftAddress][tokenId];
  }

  function getProceeds(address seller) external view returns(uint){
    return s_proceeds[seller];
  }

}
