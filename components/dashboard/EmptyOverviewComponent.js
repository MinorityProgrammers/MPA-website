const EmptyOverviewComponent = (props) =>
  // this will take it 4 props: image link, component empty description, function of what the button does, text on button
  (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ padding: '0 20px', height: '100%' }}>
      <img src={props.imgURL} style={{ width: '60px', height: '60px', marginBottom: '12px' }} alt="Empty Overview Component" />
      <p className="text-center" style={{ fontSize: '12px', marginBottom: '12px', lineHeight: '14px' }}>{props.description}</p>
      <button className="btn btn-primary" style={{ background: '#151371', width: '80%', fontSize: '12px' }} onClick={props.btnFunction}>{props.btnText}</button>
    </div>
  );
export default EmptyOverviewComponent;
