import React from 'react';
import Link from 'next/link';

const JoinHerosection = () => (
  <div className="row hero-container">
    <div className="col-md-6">
      <img
        src="./assets/images/join/Rectangle 94.png"
        className="img-fluid"
        alt=""
      />
    </div>
    <div className="col-md-6">
      <h1>Code, Culture, Community</h1>
      <p>
        We are an international network of developers{' '}
        <span style={{ color: '#474bfd' }}>unifying together</span> to build
        socially impactful products & spread STEM education to marginalized
        communities.
      </p>
      <div className="join-hero-btn">
        <Link href="/auth">
          <button type="button" className="btn-join-mpa">
            Join MPA
          </button>
        </Link>
        <Link href="/auth">
          <button type="button" className="btn-join-login">
            Log In
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default JoinHerosection;
