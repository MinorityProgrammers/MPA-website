import React, { useRef, useEffect } from 'react';

const VoteModal = function ({ showModal, setShowModal, selectedCard }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  // console.log(selectedCard)
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
      {showModal
        ? (
          <div className="vote__modal" ref={modalRef} onClick={closeModal}>
            <div className="vote__modal-content">
              <button type="button" className="vote__btn-close" onClick={() => setShowModal((prev) => !prev)}><i className="fas fa-times" /></button>
              {selectedCard.detail === 'no' ? (
                <div className="vote__modal-header">
                  <h2>Detail coming soon...</h2>
                </div>
              ) : (
                <>
                  <div className="vote__modal-header">
                    <h1>{selectedCard.modalTitle ? selectedCard.modalTitle : ''}</h1>
                    <h2>{selectedCard.modalSubTitle ? selectedCard.modalSubTitle : ''}</h2>
                  </div>
                  <div className="vote__modal-body">
                    <p>{selectedCard.modalDescription ? selectedCard.modalDescription : ''}</p>
                  </div>
                  <div className="vote__modal-footer">
                    {selectedCard.btn1 ? (
                      <button type="button" className="vote__modal-btn pink">
                        <p>1</p>
                        <span className="arrow-right" />
                        <p>{selectedCard.btn1}</p>
                      </button>
                    ) : ''}
                    {selectedCard.btn2 ? (
                      <button type="button" className="vote__modal-btn blue">
                        <p>2</p>
                        <span className="arrow-right" />
                        <p>{selectedCard.btn2}</p>
                      </button>
                    ) : ''}
                    {selectedCard.btn3 ? (
                      <button type="button" className="vote__modal-btn gray">
                        <p>3</p>
                        <span className="arrow-right" />
                        <p>{selectedCard.btn3}</p>
                      </button>
                    ) : ''}

                    {selectedCard.btnGradient ? <button type="button" className="vote__modal-btn gradient">{selectedCard.btnGradient}</button> : ''}
                  </div>
                </>
              )}
            </div>

          </div>
        ) : ''}

    </>
  );
};

export default VoteModal;
