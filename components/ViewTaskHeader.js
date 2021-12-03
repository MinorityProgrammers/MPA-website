const ViewTaskHeader = () => {
  return (
    <div className="tw-bg-black tw-flex tw-justify-around tw-items-center xs:tw-grid xs:tw-grid-cols-1">
      <div>
        <p className="tw-font-bold tw-text-6xl tw-text-white tw-text-center">
          View Tasks
        </p>
        <p className="tw-text-center tw-text-white tw-text-xl tw-mt-5">
          View, organize and access your tasks here.
        </p>
      </div>
      <div>
        <img src="../assets/images/project/Illustration.png" alt="project" />
      </div>
    </div>
  );
};

export default ViewTaskHeader;
