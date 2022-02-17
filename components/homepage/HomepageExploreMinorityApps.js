import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { AiOutlineDownload } from 'react-icons/ai';
import Countdown from 'react-countdown';

const HomepageExploreMinorityApps = () => {
  const dropDate = new Date(1645160400000);
  const [loading, setLoading] = useState(false);
  const saveFile = () => {
    saveAs('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'example.pdf');
  };
  const Completionist = () => <span>You are good to go!</span>;
  const renderer = (
    {
      days, hours, minutes, seconds, completed,
    },
  ) => {
    if (completed) { // Render a completed state
      return <Completionist />;
    } // Render a countdown
    return (
      <span>
        {days}
        d
        {' '}
        {hours}
        hr
        {' '}
        {minutes}
        m
        {' '}
        {seconds}
        s
      </span>
    );
  };

  return (
    <section className="homepage__about tw-relative tw-overflow-x-clip">
      <div className="homepage-background " style={{ width: '100%', position: 'absolute' }}>
        <img src="/assets/images/home-page/about-us-bg.svg" alt="about-us bg" style={{ overflow: 'hidden' }} />
      </div>
      <div className="container tw-relative tw-w-full tw-h-full">
        <div className="d-flex flex-column justify-content-between" style={{ marginBottom: '100px' }}>
          {/* title section */}
          <h2 className="about-us__title top__part__title d-flex flex-column align-items-center" style={{ fontWeight: 700, letterSpacing: '0.2px', lineHeight: '72px' }}>
            <div className="d-flex flex-row">
              <img
                src="/assets/images/home-page/about-title-icon.svg"
                alt="blockchain"
              />
              Explore Minority Apps
            </div>
            <strong className="tw-text-center tw-text-4xl lg:tw-text-xl">
              We love NFTs
            </strong>
          </h2>
          <div
            className="tw-flex tw-flex-row md:tw-flex-col"
            style={{
              background: 'white', padding: '10px', borderRadius: '40px', margin: '5px', width: '100%',
            }}
          >
            <div className="tw-flex tw-flex-col tw-w-1/2 lg:tw-w-full tw-p-5">
              <p
                className="tw-text-3xl tw-text-gray-600 tw-mb-10 lg:tw-text-xl "
                style={
                {
                  margin: '0', color: '#926DC2', fontWeight: '500',
                }
              }
              >
                GET IN EARLY !!!
              </p>
              <p
                className="tw-text-2xl tw-text-gray-600 tw-mb-10 lg:tw-text-xl "
              >
                The official NFT drop for creative and builders promoting diversity
              </p>
              <div className="tw-flex tw-flex-row lg:tw-flex-col justify-content-between align-items-center">
                <a
                  className=" tw-text-lg tw-p-5 tw-w-10/12 hover:tw-opacity-70"
                  href="https://discord.gg/wmCtA4xAgd"
                  target="_blank"
                  rel="noreferrer"
                  style={
                    {
                      background: '#8040D2', borderRadius: '40px', fontWeight: '500', textAlign: 'center',
                    }
                  }
                >
                  <p className="tw-text-white hover:tw-text-gray-300 ">Join Our Discord</p>
                </a>
                <a
                  href="https://genadrop.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  style={
                  {
                    margin: 0, fontSize: '20px', textAlign: 'center', width: '50%',
                  }
                }
                >
                  <p
                    className="tw-text-gray-700 hover:tw-text-gray-500 tw-font-medium tw-cursor-pointer tw-text-lg"
                  >
                    Learn More
                  </p>
                </a>
              </div>
            </div>

            <div
              className="tw--flex tw-flex-col justify-content-between align-items-center tw-p-5 tw-w-1/2 lg:tw-w-full"
              style={
                { background: 'linear-gradient(180deg, #009CDF 0%, #A259FF 100%)', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }
              }
            >
              <img src="/assets/images/MinorityDropLogo.svg" alt="mdl" />
              <p style={
                {
                  margin: 0, color: 'white', weight: '500', fontSize: '32px',
                }
              }
              >
                <Countdown date={dropDate} renderer={renderer} intervalDelay={1000} />
              </p>
              <p style={
                {
                  margin: 0, color: 'white', weight: '500', fontSize: '24px',
                }
              }
              >
                Until the Minority drop mint
              </p>
            </div>
          </div>
        </div>
        {/* nft generator introduction */}
        <div className="tw-flex tw-flex-row md:tw-flex-col justify-content-between" style={{ padding: '20px' }}>
          <div
            className="d-flex justify-content-center align-items-center tw-w-1/2 lg:tw-w-full"
            style={
              {
                padding: '30px', background: 'linear-gradient(180deg, #009CDF 0%, #A259FF 100%)', borderRadius: '40px',
              }
            }
          >
            <img src="/assets/images/GenadropLogo_White.svg" alt="gdl" />
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center tw-w-2/5 lg:tw-w-full" style={{ padding: '40px', paddingTop: '0px' }}>
            <p
              className="tw-text-4xl lg:tw-text-xl"
              style={
              {
                color: 'white', fontWeight: '900', marginBottom: '20px', marginTop: '20px',
              }
            }
            >
              The no code NFT generative
              art creator tool & minter.
            </p>
            <a href="https://genadrop.vercel.app/" target="_blank" rel="noreferrer">
              <button
                className="tw-bg-black hover:tw-bg-transparent lg:tw-w-full"
                type="button"
                style={
                  {
                    border: '3px solid white', fontSize: '24px', fontWeight: '700', padding: '20px 20px', borderRadius: '100px',
                  }
                }
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
