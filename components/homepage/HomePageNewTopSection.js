import React from 'react';
import ButtonComponent from '../profile/ButtonComponent';

// tw-pt-52
const HomepageNewTopSection = () => (
  <section style={{ backgroundImage: "url('/assets/images/home-page/hero-bg.png')" }} className="homepage__hero">
    {/* <div className="tw-absolute tw-bottom-10 tw-left-0 tw-z-0">
      <img
        src="/assets/images/home-page/hero-bg.png"
        alt=""
        className="tw-w-1/3 tw-opacity-30"
      />
    </div> */}
    <div className="container top__part tw-relative tw-justify-between tw-flex tw-flex-row tw-w-full tw-h-full lg:tw-flex-col-reverse">
      <div className="tw-flex tw-flex-col tw-pb-20 top__part__content lg:tw-pt-2 tw-z-10">
        {/* content sections */}
        <div className="tw-mt-4">
          <p className="top__part__title">Minority Programmers Association</p>
        </div>
        <div className="tw-mt-4 tw-font-medium">
          <p className="tw-text-xl tw-pr-32 md:tw-text-base tw-text-white sm:tw-pr-0">
            Join an international network of developers unifying together
            to build socially impactful projects & spread STEM education
            to marginalized communities
            <br />
            <br />
            Connect your wallet to
            {' '}
            <a href="/auth"><span className="hover:tw-text-gray-300">REGISTER FOR FREE!</span></a>
          </p>
        </div>
        <div className="tw-mt-11 tw-w-full tw-grid tw-grid-cols-2">
          <div className="tw-w-full">
            {' '}
            <a href="https://snapshot.org/#/minorityprogrammers.eth">
              <button type="button" className="md:tw-w-11/12 md:tw-my-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-10/12 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2">
                <p className="tw-text-white tw-text-md tw-text-center ">
                  Join Us
                </p>
              </button>
            </a>
          </div>
          <div>
            {' '}
            <a href="https://docs.metamask.io/guide/" target="_blank" rel="noreferrer">
              <button type="button" className="md:tw-w-11/12 md:tw-my-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-10/12 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2">
                <p className="tw-text-white tw-text-md tw-text-center ">
                  Learn how to connect
                </p>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="tw-pt-20 tw-z-10 tw-h-full homepage__hero__img">
        {/* image sections */}
        <img
          src="/assets/images/home-page/MPA-image.png"
          alt="blockchain"
          className="tw-w-full tw-h-ful tw-max-w-lg"
        />
        
        */}
        </div>
        <div className="container top__part tw-relative tw-flex tw-flex-row tw-w-full tw-h-full lg:tw-flex-col-reverse" style={{ backgroundImage: 'url(../public/images/bg/Rectangle.png)' }}>
                <div className="tw-flex tw-flex-col tw-pt-20 tw-pb-20 tw-px-4 lg:tw-pt-2 tw-z-10" style={{width: '100%'}}>
                        {/* content sections */}
                        <div className="tw-w-3/3 tw-mt-4">
                        <p className={styles.text}>Minority Programmers Associations</p>
                        </div>
                        <div className="tw-w-2/3 tw-font-medium" style={{fontFamily: "poppins"}}>
                        
                                <p className="tw-text-base lg:tw-text-sm mt-9" style={{marginTop: "1.5rem", fontSize: "30px"}}>Diversity meets <span className={styles.text_within}>Web3.</span></p>

                                <p className="tw-text-base lg:tw-text-sm mt-9" style={{marginTop: "1.5rem"}}>Join the Coding revolution! Learn, code, and build socially impactiful projects with other creative minorities </p>

                                <p className="tw-text-base lg:tw-text-sm mt-9" style={{marginTop: "1.5rem"}}>Connect your wallet to  REGISTER FOR FREE!</p>

                        </div>
                        <div className="tw-mt-4">
                        <a href="https://snapshot.org/#/minorityprogrammers.eth" target="_blank" rel="noreferrer">
                        <button
                        type="button"
                        className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
                        style={{ background: '#8040D2', borderRadius: '100px', padding: '10px 0px', width: '200px', marginTop: '1.5rem' }}
                        >
                        Join Us
                        </button>
                        </a>
                        </div>
                </div>
                <div className="tw-w-11/12 lg:tw-p-2 tw-z-10 tw-h-full homepage__hero__img">
                        {/* image sections */}
                        <img
                        src="/assets/images/world.png"
                        alt=""
                        width={450}
                        />
                </div>
        </div>
        </div>
  </section>
);

export default HomepageNewTopSection;
