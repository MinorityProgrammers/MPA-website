import React, { useContext } from 'react';
import Modal from 'react-modal';
import { QuizContext } from '../courseDetails/ActivityDetails';
import SimpleQuiz from './SimpleQuiz';

export default function QuizModal() {
  const { isOpen/* , setIsOpen  */ } = useContext(QuizContext);

  return (
    <Modal
      isOpen={isOpen}
      className="Modal"
      overlayClassName="CustomOverlay"
      ariaHideApp={false}
      contentLabel="Quiz Modal"
    >
      <SimpleQuiz />
    </Modal>
  );
}
