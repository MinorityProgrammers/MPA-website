const ProposalHeader = () => {
  return (
    <div className="mycompaniesMain tw-flex tw-justify-around tw-p-6 tw-items-center sm:tw-grid sm:tw-grid-cols-1">
      <div>
        <p className="tw-font-bold tw-text-6xl sm:tw-text-4xl sm:tw-mt-12 tw-text-blue-800 tw-text-center">
          Approved proposals
        </p>
        <p className="tw-text-center tw-text-xl tw-text-black tw-mt-5 sm:tw-text-md">
          Create tasks from proposals approved by core team.
        </p>
      </div>
      <div className="tw-self-place-center tw-mt-20 sm:tw-m-10">
        <img src="assets/images/project/projectHeader.png" alt="project" />
      </div>
    </div>
  );
};

export default ProposalHeader;
