import React, { useEffect, useState } from 'react';
import { saveAs } from "file-saver";
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
    }
  ) => {
    if (completed) { // Render a completed state
      return <Completionist />;
    } else { // Render a countdown
      return <span>{days}d  {hours}hr  {minutes}m  {seconds}s</span>;
    }
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
            <strong style={{ fontSize: '52px', textAlign: 'center' }}>
              We love NFTs
            </strong>
          </h2>
          <div
            className="d-flex flex-row"
            style={{
              background: 'white', padding: '20px', borderRadius: '40px', margin: '20px', width: '100%',
            }}
          >
            <div className="d-flex flex-column" style={{ width: '55%', padding: '30px' }}>
              <p style={
                {
                  fontSize: '52px', margin: '0', color: '#926DC2', fontWeight: '500', lineHeight: '72px', marginBottom: '20px',
                }
              }
              >
                GET IN EARLY !!!
              </p>
              <p style={
                {
                  fontSize: '32px', margin: '0', color: 'black', lineHeight: '60px', marginBottom: '20px'
                }
              }
              >
                The official NFT drop for creative and builders promoting diversity
              </p>
              <div className="d-flex flex-row justify-content-between align-items-center">
                <a
                  className="hover:tw-text-black hover:tw-bg-color-[A259FF]"
                  href="https://discord.gg/wmCtA4xAgd"
                  target="_blank"
                  rel="noreferrer"
                  style={
                    {
                      background: '#8040D2', borderRadius: '40px', fontSize: '24px', padding: '20px', fontWeight: '700', width: '50%', textAlign: 'center',
                    }
                  }
                >
                  Join Our Discord
                </a>
                <p style={
                  {
                    margin: 0, color: 'black', fontSize: '20px', textAlign: 'center', width: '50%', fontWeight: '700',
                  }
                }
                >
                  Learn More
                </p>
              </div>
            </div>

            <div
              className="d-flex flex-column justify-content-between align-items-center"
              style={
                {
                  width: '45%', background: 'linear-gradient(180deg, #009CDF 0%, #A259FF 100%)', padding: '20px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px',
                }
              }
            >
              <img src="/assets/images/MinorityDropLogo.svg" alt="mdl" />
              <p style={
                {
                  margin: 0, color: 'white', weight: '500', fontSize: '42px'
                }
              }
              >
                <Countdown date={dropDate} renderer={renderer} intervalDelay={1000} />
              </p>
              <p style={
                {
                  margin: 0, color: 'white', weight: '500', fontSize: '32px'
                }
              }
              >
                Until the Minority drop mint
              </p>
            </div>
          </div>
        </div>
        {/* nft generator introduction */}
        <div className="d-flex flex-row justify-content-between" style={{ padding: '20px' }}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={
              {
                width: '55%', padding: '30px', background: 'linear-gradient(180deg, #009CDF 0%, #A259FF 100%)', borderRadius: '40px',
              }
            }
          >
            <img src="/assets/images/GenadropLogo_White.svg" alt="gdl" />
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center" style={{ width: '45%', padding: '40px', paddingTop: '0px' }}>
            <p style={
              {
                color: 'white', fontWeight: '900', fontSize: '42px', marginBottom: '20px'
              }
            }
            >
              The no code NFT generative
              art creator tool & minter.
            </p>
            <a href="https://genadrop.vercel.app/" target="_blank" rel="noreferrer">
              <button
                className="tw-bg-black hover:tw-bg-transparent"
                type="button"
                style={
                  {
                    border: '3px solid white', fontSize: '24px', fontWeight: '700', padding: '20px 50px', borderRadius: '100px',
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
