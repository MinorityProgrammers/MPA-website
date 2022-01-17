import React from 'react';

/*
  this will take it 4 props: image link, component empty description,
  function of what the button does, text on button
*/
const EmptyOverviewComponent = ({
  btnFunction, btnText, imgURL, description,
}) => (
  <div className="d-flex flex-column justify-content-center align-items-center" style={{ padding: '0 20px', height: '100%' }}>
    <img src={imgURL} style={{ width: '60px', height: '60px', marginBottom: '12px' }} alt="Empty Overview Component" />
    <p className="text-center" style={{ fontSize: '12px', marginBottom: '12px', lineHeight: '14px' }}>{description}</p>
    <button type="button" className="btn btn-primary" style={{ background: '#151371', width: '80%', fontSize: '12px' }} onClick={btnFunction}>{btnText}</button>
  </div>
);
export default EmptyOverviewComponent;
