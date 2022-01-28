/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { QuizContext } from '../courseDetails/ActivityDetails';

export default function QuizResult(props) {
  const { setIsOpen, singleUserModuleInfo, lastAdvancedModules } = useContext(QuizContext);
  const router = useRouter();
  const { courseId, moduleId } = router.query;
  const { _id } = singleUserModuleInfo;
  const userModuleId = singleUserModuleInfo.moduleId;
  const score = ((props.correct / props.questionLength) * 100).toFixed();
  const [congrats, setCongrats] = useState(false);

  const handleSubmit = () => {
    const userToken = JSON.parse(localStorage.getItem('userInfo')).token;
    fetch(`${process.env.BASE_URI}/learn/${courseId}/${moduleId}/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        completed: true,
        completionStatus: 'completed',
        completionRate: 100,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (!lastAdvancedModules._id.includes(userModuleId._id)) {
            setTimeout(() => {
              window.location.href = router.asPath;
            }, 1000);
          }
        }
      });

    if (lastAdvancedModules._id.includes(userModuleId._id)) {
      setCongrats(true);
      fetch(`${process.env.BASE_URI}/certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          id: `${courseId}`,
        }),
      }).then((res) => res.json());
    } else {
      props.startOver();
      setIsOpen(false);
      props.startOver();
      props.setWatched(false);
    }
  };

  const handleCongratsModal = () => {
    setIsOpen(false);
    window.location.href = '/learn/certificates';
  };

  const congratsClose = {
    textAlign: 'center',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '18px',
    color: '#ff6435e0',
    '&:hover': {
      color: '#fff',
    },
  };

  return (
    <>
      {congrats === false ? (
        <div className="results fade-in">
          <div className="score">
            <h1>
              Your score:
              {score}
              %
            </h1>
            {score > 80 ? (
              <button onClick={handleSubmit} type="button">
                Submit
                {' '}
                <i className="fa fa-arrow-right" />
              </button>
            ) : (
              <button type="button" onClick={props.startOver}>
                Try again
                {' '}
                <i className="fas fa-redo" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="results fade-in">
            <div className="score">
              <button type="button">Congratulations!</button>
              <p className="mt-2">
                You have successfully completed this course!
              </p>
            </div>
          </div>

          <h5 onClick={handleCongratsModal} style={congratsClose}>
            Close
          </h5>
        </div>
      )}
    </>
  );
}
