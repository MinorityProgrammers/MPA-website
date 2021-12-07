import React, { useState } from 'react';
import { AiFillCloseCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Avatar from 'avataaars';
import { useRouter } from 'next/router';
import CreateProfileForm from './CreateProfileForm';

const ProfileDone = function ({
  state, setState, step, setStep, closeProfileSetup,
}) {
  const userName = Object.values(state)[2].username;
  const [displayWarning, setDisplayWarning] = useState(false);
  const toggleWarning = (on) => {
    if (on) {
      if (!displayWarning) {
        const warning = "<p class='cp-warning'>Fill in Required Slots</p>";
        document.getElementsByClassName('cp-form')[0].insertAdjacentHTML('afterbegin', warning);
        setDisplayWarning(true);
      }
    } else if (displayWarning) {
      document.getElementsByClassName('cp-warning')[0].remove();
      setDisplayWarning(false);
    }
  };
  // go back one step
  const handlePrev = () => {
    setStep(step - 1);
    toggleWarning(false);
  };
  // go forward one step
  const router = useRouter();
  const handleNext = () => {
    router.push(`/user/${Object.values(state)[0].userName}`);
  };
  return (
    <div className="cp-body">
      <AiFillCloseCircle className="cp-close" onClick={closeProfileSetup} style={{ cursor: 'pointer' }} />
      <div className="cp-top">
        <h1>
          Congratulations
          {Object.values(state)[0].userName}
          !
          {' '}
        </h1>
        <h2>You sucessfully made your MPA profile</h2>
      </div>
      <CreateProfileForm>
        <div className="cp__profile--container">
          <div className="cp-formGrid1">
            <div className="cp__profile--done">
              <Avatar
                style={{
                    width: '250px', height: '250px', background: state[5].avatarOptions.backgroundColor || '#fff', borderRadius: '100%',
                  }}
                {...state[5].avatarOptions}
              />
            </div>
            <p>
              You are now able to review your own profile
              as well as your MPA community. Cheers!
            </p>
            <div className="cp__done--btn">
              <button className="cp-navButton tw-outline-none" onClick={handleNext}>Done</button>
            </div>
          </div>
        </div>
      </CreateProfileForm>
    </div>
  );
};

export default ProfileDone;
