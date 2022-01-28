import React from 'react';
import Modal from 'react-modal';

const ModalComp = ({ modalIsOpen, setIsOpen }) => {
  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="tw-bg-green-100">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          <h2
            ref={(_subtitle) => {
              subtitle = _subtitle;
            }}
          >
            Hello
          </h2>
          <div className="tw-flex tw-justify-end tw-text-black">
            <button type="button" onClick={closeModal}>
              close
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComp;
