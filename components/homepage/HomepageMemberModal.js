import React, { useEffect, useRef } from 'react';

const HomepageMemberModal = ({
  showModal,
  setShowModal,
  selectedMember,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <>
      {showModal ? (
        <>
          <div
            className="member__modal-overlay"
            ref={modalRef}
            onClick={closeModal}
          />

          <div className="member__modal-bg">
            <img
              src={
                selectedMember.AvatarLink !== null
                  ? selectedMember.AvatarLink
                  : 'https://github.com/MinorityProgrammers/mpa-avatars/blob/main/avatars/mysteryAvatar.png?raw=true'
              }
              alt={selectedMember.Employee}
              className="member__modal-img"
            />
            <div className="member__modal-content">
              <h3>{selectedMember.Employee}</h3>
              <h6>{selectedMember.Title}</h6>
              {/* Social media links still under construction */}
              <div className="member__modal-social">
                <a>
                  <i className="fab fa-linkedin-in" />
                </a>
                <a>
                  <i className="fab fa-github" />
                </a>
                <a>
                  <i className="fab fa-twitter" />
                </a>
              </div>
            </div>
            <button
              type="button"
              className="member__btn-close"
              onClick={() => setShowModal((prev) => !prev)}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default HomepageMemberModal;
