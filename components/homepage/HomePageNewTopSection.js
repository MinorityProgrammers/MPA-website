import React from 'react';
// the main stylesheet
import styles from '../module-css/body/home_page_new_top_section.module.css';

// tw-pt-52
const HomepageNewTopSection = () => (
        <section className="homepage__hero">
        <div className={styles.bg_image}>
        <div className="tw-absolute tw-bottom-10 tw-left-0 tw-z-0">
        {/**
        
        <img
                src="/assets/images/bg/Yellow.png"
                alt=""
                className="tw-w-1/3 tw-opacity-30"
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
