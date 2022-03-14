import React from 'react';

const HomePageGetStarted = () => (
  <section className="homepage__get-started tw-pb-28">
    <div className="tw-relative tw-w-full tw-h-full">
      <div className="homepage__get-started-bg">
        <img src="/assets/images/home-page/about-us-bg.svg" alt="about-us bg" />
      </div>
      <div className="container top-part tw-mb-36">
        <h2 className="top__part__title">Become a blockchain developer</h2>
        <p className="tw-text-2xl tw-text-center md:tw-w-full tw-mt-5 tw-mx-auto md:tw-text-base tw-text-white">
          Learn the hottest skills in Blockchain and Web3. Earn NFT credentials
          that recruiters from the top technology companies will see through our
          decentralized talent sourcing system.
        </p>
      </div>
      <div className="get-started__learn tw-text-white">
        <div className="container">
          <div className="row tw-mb-20">
            <div className="col-lg-6">
              <img
                style={{ marginTop: '-50px' }}
                src="/assets/images/home-page/get-started1.png"
                alt="learn"
              />
            </div>
            <div className="col-lg-6 card-text">
              <h3 className="tw-text-4xl rw tw-mb-6 tw-mt-10 tw-font-bold tw-text-white">
                Learn without limits
              </h3>
              <p className="tw-text-xl lg:tw-text-lg tw-pr-32 md:tw-pr-0 sm:tw-text-base">
                MPA is one of the fastest-growing Blockchain learning platforms.
                We’re proud that the helpfulness of the platform and a wealth of
                online resources are frequently cited as reasons our students
                love learning with us. There are 80+ web3 courses and
                Hackathons.
              </p>
              <div className="">
                <a href="/learn">
                  <button
                    type="button"
                    className="md:tw-w-11/12 md:tw-my-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-10/12 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-my-4"
                  >
                    <p className="tw-text-white tw-text-md tw-text-center">
                      Start Learning
                    </p>
                  </button>
                </a>
                {/* <p>Explore Hackathons</p> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 card-text learn-card-bottom">
              <h3 className="tw-text-4xl tw-mb-6 tw-mt-10 tw-font-bold tw-text-white">
                Mentorship Program
              </h3>
              <p className="tw-text-xl card-text lg:tw-text-lg tw-pr-32 md:tw-pr-0 sm:tw-text-base">
                We take learning and rewards for learning or teaching to the
                next level. Wether you are a student looking for a one-one
                mentorship, or you are a mentor seeking for opportunity to help
                a student learn a course. There is a reward for everyone. Sign
                up for our mentorship Program.
              </p>
              <div className="">
                <a href="/mentorship">
                  <button
                    type="button"
                    className="md:tw-w-11/12 md:tw-my-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-10/12 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-my-4"
                  >
                    <p className="tw-text-white tw-text-md tw-text-center">
                      Get started
                    </p>
                  </button>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                style={{ marginBottom: '-140px' }}
                src="/assets/images/home-page/get-started2.png"
                alt="learn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomePageGetStarted;
