import React, { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import CreateProfileSidebar from './CreateProfileSidebar';
import CreateProfileBody from './CreateProfileBody';
import { GlobalContext } from '../../contexts/provider';
import { updateProfile } from '../../contexts/actions/profile/updateProfile';

import {
  all,
} from '../../contexts/utils/profileInputFields1';

import {
  topTypeField,
  accessoriesTypeField,
  facialHairTypeField,
  clotheTypeField,
  clotheColorField,
  eyeTypeField,
  eyebrowTypeField,
  mouthTypeField,
  skinColorField,
  hairColorField,
  backgroundColorField,
} from '../../contexts/utils/avatarFields';

const CreateProfile = function ({ userID, data }) {
  // allInputFields (contain the input fields for each step)
  const allInputFields = [
    {
      step: 1,
      stepName: 'Create Username',
      inputFields: [
        all.usernameField,
      ],
    },
    {
      step: 2,
      stepName: 'Education',
      inputFields: [
        all.educationLevelField,
        all.schoolNameField,
        all.expectedGraduationYearField,
        all.graduationStatusField,
        all.degreeField,
      ],
    },
    {
      step: 3,
      stepName: 'Personal Details',
      inputFields: [
        all.firstNameField,
        all.lastNameField,
        all.birthdateField,
        all.hometownField,
        all.primaryLanguageField,
      ],
    },
    {
      step: 4,
      stepName: 'Passions + Skills',
      inputFields: [
        all.passionsField,
        all.softSkillsField,
        all.programmingLanguagesField,
      ],
    },
    {
      step: 5,
      stepName: 'Create Avatar',
      inputFields: [
        {
          name: 'avatarOptions',
        },
        {
          name: 'profilePicture',
        },
      ],
    },
    {
      step: 6,
      stepName: 'Finished',
    },
  ];
    // set an initialInputState
  const initialInputState = {};
  // for each step add an object to state that contains the value of each field
  allInputFields.forEach((inputFieldsObj) => {
    initialInputState[inputFieldsObj.step] = {};
    // ex. {1: {}}
    inputFieldsObj.inputFields && inputFieldsObj.inputFields.forEach((field) => initialInputState[inputFieldsObj.step][field.name] = '');
    // ex. {1: {someInputFieldName: "inputFieldValue", ...}}
  });

  // add key to avatarOptions for each avatar input field
  initialInputState[5].avatarOptions = {};
  // add each avatarField with name as key and with a value of ""
  [...[
    topTypeField,
    accessoriesTypeField,
    facialHairTypeField,
    clotheTypeField,
    clotheColorField,
    eyeTypeField,
    eyebrowTypeField,
    mouthTypeField,
    skinColorField,
    hairColorField,
    backgroundColorField,
  ]].forEach((field) => {
    initialInputState[5].avatarOptions[field.name] = '';
  });
  // get name for each step to be displayed on sidebar
  const stepNames = Object.fromEntries(allInputFields.map((step) => ([step.step, step.stepName])));
  const [inputStates, setInputStates] = useState(initialInputState);
  const [activeStep, setActiveStep] = useState(1);
  const [state, setState] = useState({ datas: inputStates });

  useEffect(() => {
    initialInputState[3].firstName = data?.firstName;
    initialInputState[3].lastName = data?.lastName;

    setInputStates(initialInputState);
    localStorage.removeItem('datas');
    localStorage.removeItem('activeStep');
  }, [data]);

  // Save to LOCAL STORAGE.
  useEffect(() => {
    const data = localStorage.getItem('datas');
    const activeStepData = localStorage.getItem('activeStep');
    if (data) {
      setInputStates(JSON.parse(data));
    }
    if (activeStepData) {
      setActiveStep(JSON.parse(activeStepData));
    }
  }, []);

  // update userData
  const {
    profileDispatch,
    profileState: {
      profile: {
        profileLoading, profileError, profileData, profileIsUpdated,
      },
    },
  } = useContext(GlobalContext);

  const formData = new FormData();
  Object.values(inputStates).forEach((inputSection) => {
    Object.keys(inputSection).forEach((input) => {
      // console.log(input, inputSection[input])
      if (input === 'avatarOptions') {
        formData.append(input, JSON.stringify(inputSection[input]));
      } else {
        formData.append(input, inputSection[input]);
      }
    });
  });
  // console.log(inputStates)
  const handleSubmit = () => {
    // submit all data
    updateProfile(userID, formData)(profileDispatch);
    localStorage.removeItem('datas');
    localStorage.removeItem('activeStep');
  };
  const handleUsernameSubmit = () => {
    const userFormData = new FormData();
    userFormData.append('username', inputStates['3'].username);
    updateProfile(userID, userFormData)(profileDispatch);
  };

  const router = useRouter();
  const closeProfileSetup = () => {
    if (window.localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const slug = userInfo?.user?.userName || userInfo?.userName;
      slug && router.push(`/user/${slug}`);
    }
  };
  // console.log(inputStates)
  return (
    <div className="cp-container">
      <CreateProfileSidebar state={inputStates} setStep={setActiveStep} stepNames={stepNames} activeStep={activeStep} setActiveStep={setActiveStep} />
      <CreateProfileBody
        state={inputStates}
        userData={data}
        setState={setInputStates}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        inputStates={inputStates}
        handleSubmit={handleSubmit}
        handleUsernameSubmit={handleUsernameSubmit}
        closeProfileSetup={closeProfileSetup}
      />
    </div>
  );
};

export default CreateProfile;
