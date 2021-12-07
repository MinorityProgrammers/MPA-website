const JobsMainContent = function (props) {
  return (
    <div className="careers-main">
      <div className="careers-main-container">
        <div className="careers-main-container-all">{props.children}</div>
      </div>
    </div>
  );
};

export default JobsMainContent;
