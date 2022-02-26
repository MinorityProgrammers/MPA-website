import React from 'react';
import Link from 'next/link';

const EmptyOverviewComponent = ({
  btnText,
  imgURL,
  description,
}) => (
  <div
    className="d-flex flex-column justify-content-center align-items-center"
    style={{ padding: '0 20px', height: '100%' }}
  >
    <img
      src={imgURL}
      style={{ width: '60px', height: '60px', marginBottom: '12px' }}
      alt="Empty Overview Component"
    />
    <p
      className="text-center"
      style={{ fontSize: '12px', marginBottom: '12px', lineHeight: '14px' }}
    >
      {description}
    </p>
    <Link href="/learn">
      <a
        type="button"
        className="button-more"
      >
        {btnText}
      </a>
    </Link>
  </div>
);
export default EmptyOverviewComponent;
