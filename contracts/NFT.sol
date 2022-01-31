//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol" ;

contract NFT is ERC721URIStorage , ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemIds;

    struct NFTitem {
    uint itemId;
    uint256 tokenId;
    address payable owner;
  }

  mapping(uint256 => NFTitem) private idToNFTitem;

    event TransferSuccessfull(
  uint256 indexed tokenId,
  address owner
);
    constructor() public ERC721("dResume", "dResume") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function giveOwnership(address nftaddress , uint tokenId) public payable nonReentrant  {
      uint listprice = msg.value ;
      _itemIds.increment();
      uint256 itemId = _itemIds.current();

      idToNFTitem[itemId] =  NFTitem(
        itemId,
        tokenId,
        payable(msg.sender)
      );
      IERC721(nftaddress).transferFrom(address(this), msg.sender, tokenId);
      payable(msg.sender).transfer(listprice);

      emit TransferSuccessfull(
        tokenId,
        msg.sender
        );
    }

    function displayNFT() public view returns (NFTitem[] memory) {
      uint itemCount = _itemIds.current();
      uint currentIndex = 0 ;

    NFTitem[] memory nfts = new NFTitem[](itemCount);
    for (uint i = 0; i < itemCount; i++) {
        uint currentId = i + 1;
        NFTitem storage currentItem = idToNFTitem[currentId];
        nfts[currentIndex] = currentItem;
        currentIndex += 1;
    }
    return nfts;
  }

 function displayMyNFTs() public view returns (NFTitem[] memory) {
   uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToNFTitem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    NFTitem[] memory nfts = new NFTitem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToNFTitem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        NFTitem storage currentItem = idToNFTitem[currentId];
        nfts[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return nfts;
 }
    }