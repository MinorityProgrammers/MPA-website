import React, { useState } from 'react';
import { Modal } from 'antd';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import ReactPaginate from 'react-paginate';
import CoursesSkeleton from './CoursesSkeleton';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';

const Certificates = ({ certificates, loading }) => {
  const pageCount = Math.ceil(certificates.length / 4);
  const [currentCertificates, setCurrentCertificates] = useState(
    certificates.slice(0, 4),
  );
  const [isMinting, setIsMinting] = useState(false);
  const [, setDoneMinting] = useState(false);

  const { Moralis } = useMoralis();
  const nftaddress = process.env.CERTIFICATES_ADDRESS;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % certificates.length;
    setCurrentCertificates(certificates.slice(newOffset, newOffset + 4));
  };

  function countDown(mintedURL, tx) {
    let secondsToGo = 30;
    const modal = Modal.success({
      title: 'Successfully minted Your certificate',
      content: `Checkout your minted certificate metadata ${mintedURL}, transaction id: ${process.env.NETWORK_URL}/tx/${tx.transactionHash}`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }

  const mintCertificate = async (ipfs, course) => {
    const metadata = {
      name: `${course.name}`,
      image: ipfs,
      description: course?.description || '',
      attributes: course.tags,
    };

    try {
      setIsMinting(true);
      const JsonFormat = JSON.stringify(metadata);

      const mintedMetadata = new Moralis.File('metadata.json', {
        base64: btoa(JsonFormat),
      });
      await mintedMetadata.saveIPFS();

      if (mintedMetadata.ipfs()) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
        let transaction = await contract.mintNFT(
          nftaddress,
          mintedMetadata.ipfs(),
        );
        const tx = await transaction.wait();
        const event = tx.events[0];
        const value = event.args[2];
        const tokenId = value.toNumber();
        contract = new ethers.Contract(nftaddress, NFT.abi, signer);
        transaction = await contract.giveOwnership(nftaddress, tokenId, {
          value: 10,
        });
        await transaction.wait();
        setDoneMinting(true);
        setIsMinting(false);
        countDown(mintedMetadata.ipfs(), tx);
      }
    } catch (e) {
      setIsMinting(false);
      console.log(e);
    }
  };

  return (
    <div className="courses">
      <div>
        {loading ? (
          <CoursesSkeleton title="My Certificates" />
        ) : certificates.length > 0 ? (
          <div className="tw-flex tw-flex-col tw-justify-start tw-items-center">
            <div className="tw-grid tw-gap-4 tw-grid-cols-2 tw-grid-rows-2 sm:tw-grid-cols-1 sm:tw-grid-rows-1 tw-h-100 tw-w-100 tw-mb-5">
              {currentCertificates.map((each) => (
                <div
                  className="courses tw-flex tw-flex-col tw-cursor-pointer tw-mx-2"
                  key={each._id}
                >
                  <a href={each.ipfsURL} target="_blank" rel="noreferrer">
                    <img
                      className="tw-rounded-md"
                      src={each.ipfsURL}
                      alt="certificate"
                    />
                  </a>
                  <button
                    type="button"
                    className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-content-center tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-w-100 tw-my-2"
                    onClick={() => {
                      mintCertificate(each.ipfsURL, each.courseId);
                    }}
                  >
                    {isMinting ? 'Minting...' : 'Mint Certificate'}
                  </button>
                </div>
              ))}
            </div>
            <ReactPaginate
              className="tw-flex tw-flex-row tw-text-xl"
              nextClassName="btn btn-primary tw-bg-blue-700"
              previousClassName="btn btn-primary tw-bg-blue-700"
              pageClassName="btn btn-primary tw-mx-2 tw-bg-blue-700"
              pageLinkClassName=" tw-p-1 "
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
            />
          </div>
        ) : (
          <div className="mb-5 pb-3">
            <div className="course-category d-flex font-weight-bold">
              <h1 className="tw-text-white" style={{ fontSize: '30px' }}>
                My Certificates
              </h1>
            </div>
            <div className="mt-3 courses-info">
              <h1 className="tw-text-white">
                You do not have any certificate
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
