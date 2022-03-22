import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { AiOutlineDownload } from 'react-icons/ai';
import Countdown from 'react-countdown';

const HomepageExploreMinorityApps = () => {
  const dropDate = new Date('3/08/2022');
  const [loading, setLoading] = useState(false);
  const saveFile = () => {
    saveAs(
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      'example.pdf'
    );
  };
  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } // Render a countdown
    return (
      <span>
        {days}d {hours}
        hr {minutes}m {seconds}s
      </span>
    );
  };

  return (
    <section className="homepage__about tw-relative tw-overflow-x-clip">
      <div
        className="homepage-background "
        style={{ width: '100%', position: 'absolute' }}
      >
        <img
          src="/assets/images/home-page/about-us-bg.svg"
          alt="about-us bg"
          style={{ overflow: 'hidden' }}
        />
      </div>
      <div className="container tw-relative tw-w-full tw-h-full">
        <div
          className="d-flex flex-column justify-content-between"
          style={{ marginBottom: '100px' }}
        >
          {/* title section */}
          <h2
            className="about-us__title top__part__title d-flex flex-column align-items-center"
            style={{
              fontWeight: 700,
              letterSpacing: '0.2px',
              lineHeight: '72px',
            }}
          >
            <div className="d-flex flex-row">
              <img
                src="/assets/images/home-page/about-title-icon.svg"
                alt="blockchain"
              />
              Use GenaDrop
            </div>
            <strong className="tw-text-center tw-text-4xl lg:tw-text-xl">
              The no code nft tool
            </strong>
          </h2>
        </div>
        {/* nft generator introduction */}
        <div
          className="tw-flex tw-flex-row md:tw-flex-col justify-content-between"
          style={{ padding: '20px' }}
        >
          <div
            className="d-flex justify-content-center align-items-center tw-w-1/2 lg:tw-w-full"
            style={{
              padding: '30px',
              background: 'linear-gradient(180deg, #009CDF 0%, #A259FF 100%)',
              borderRadius: '40px',
            }}
          >
            <img src="/assets/images/GenadropLogo_White.svg" alt="GenaDrop logo" />
          </div>
          <div
            className="d-flex flex-column justify-content-between align-items-center tw-w-2/5 lg:tw-w-full"
            style={{ padding: '40px', paddingTop: '0px' }}
          >
            <p
              className="tw-text-4xl lg:tw-text-xl"
              style={{
                color: 'white',
                fontWeight: '900',
                marginBottom: '20px',
                marginTop: '20px',
              }}
            >
              The no code NFT generative art creator tool & minter.
            </p>
            <a
              href="https://genadrop.com/"
              target="_blank"
              rel="noreferrer"
            >
              <button
                className="tw-bg-black hover:tw-bg-transparent lg:tw-w-full"
                type="button"
                style={{
                  border: '3px solid white',
                  fontSize: '24px',
                  fontWeight: '700',
                  padding: '20px 20px',
                  borderRadius: '100px',
                }}
              >
                Get Started
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageExploreMinorityApps;
