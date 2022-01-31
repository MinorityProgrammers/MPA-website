const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFT', () => {
  it('It should deploy the contract, mint a token, and resolve to the right URI', async () => {
    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy();
    const URI = 'ipfs://QmXzV9oavNqk4uYNK1dHbDNCvYtW5hLpkZTHmCtswTBKpB';
    await nft.deployed();
    await nft.mintNFT('0xC257274276a4E539741Ca11b590B9447B26A8051', URI);
    expect(await nft.tokenURI(1)).to.equal(URI);
  });

  it('gets the count of NFTs for this address', async () => {
    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy();
    const URI = 'ipfs://QmXzV9oavNqk4uYNK1dHbDNCvYtW5hLpkZTHmCtswTBKpB';
    await nft.deployed();
    expect(await nft.balanceOf('0xC257274276a4E539741Ca11b590B9447B26A8051')).to.eq('0');
    await nft.mintNFT('0xC257274276a4E539741Ca11b590B9447B26A8051', URI);
    expect(await nft.balanceOf('0xC257274276a4E539741Ca11b590B9447B26A8051')).to.eq('1');
  });

  it('cannot mint to address zero', async () => {
    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy();
    const URI = 'ipfs://QmXzV9oavNqk4uYNK1dHbDNCvYtW5hLpkZTHmCtswTBKpB';
    await nft.deployed();
    const TX = nft.mintNFT(ethers.constants.AddressZero, URI);
    await expect(TX).to.be.reverted;
  });

  it('returns the new item ID', async () => {
    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy();
    const URI = 'ipfs://QmXzV9oavNqk4uYNK1dHbDNCvYtW5hLpkZTHmCtswTBKpB';
    await nft.deployed();
    await expect(
      await nft.callStatic.mintNFT('0xC257274276a4E539741Ca11b590B9447B26A8051', URI),
    ).to.eq('1');
  });

  it('displays the minted NFTs', async () => {
    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy();
    const URI = 'ipfs://QmXzV9oavNqk4uYNK1dHbDNCvYtW5hLpkZTHmCtswTBKpB';
    await nft.deployed();
    await expect(
      nft.displayNFT(),
    );
  });
});
