import React from 'react';

const AvatarMaker = () => (
  <section id="avatar" className="cta-four">
    <img
      src="assets/images/circle-stripe-1.png"
      className="cta-four__stripe"
      alt=""
    />
    <img
      src="assets/images/line-stripe-1.png"
      className="cta-four__line"
      alt=""
    />
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="countdown-one__content">
            <h2 className="countdown-one__title block-title__title">
              Join
              {' '}
              <br />
              {' '}
              Blockchain
              <br />
              with your NFT
            </h2>
            <p className="countdown-one__tag-line">Create your own avatar!</p>
            <div />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <iframe
          title="Avatar Maker"
          src="https://avatarmaker.com/"
          style={({ height: '600px' }, { width: '600px' })}
        />
        <br />
        <br />
      </div>
    </div>
  </section>
);

export default AvatarMaker;
