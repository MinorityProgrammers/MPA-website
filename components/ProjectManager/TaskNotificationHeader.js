const TaskNotificationHeader = function () {
  return (
    <div className="tw-bg-black tw-flex tw-justify-around tw-items-center xs:tw-grid xs:tw-grid-cols-1">
      <div>
        <p className="tw-font-bold tw-text-6xl tw-text-white tw-text-center">
          Task notifications
        </p>
        <p className="tw-text-center tw-text-white tw-text-xl tw-mt-5">
          You have
          {' '}
          <span style={{ color: 'goldenrod', fontSize: '20px' }}>7</span>
          {' '}
          new
          task notifications
        </p>
      </div>
      <div>
        <img src="assets/images/project/Illustration.png" alt="project" />
      </div>
    </div>
  );
};

export default TaskNotificationHeader;
