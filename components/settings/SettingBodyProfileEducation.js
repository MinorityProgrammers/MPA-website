import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../contexts/provider";
import { updateProfile } from "../../contexts/actions/profile/updateProfile";
import FormData from "form-data";
import { all } from "../../contexts/utils/settings/settingsInputFields";
import { useRouter } from "next/router";
import CreateSettingInput from "./CreateSettingInput";
import SettingBody from "./SettingBody";

function SettingBodyProfileEducation({ settingsPage, data, userID }) {
  const router = useRouter();

  const inputFields = [
    all.educationLevelField,
    all.schoolNameField,
    all.enteredHighSchoolYearField,
    all.expectedGraduationYearField,
    all.studentStatusField,
    all.degreeField,
  ];

  const initialInputState = {};

  inputFields.forEach(
    (field) => (initialInputState[field.name] = "")
    // ex. {someInputFieldName: "inputFieldValue", ...}
  );

  const [inputStates, setInputStates] = useState(initialInputState);

  useEffect(() => {
    inputFields.forEach(
      (field) =>
        (initialInputState[field.name] =
          field.name === "enteredHighSchoolYear"
            ? data?.enteredHighSchoolYear
              ? new Date(data.enteredHighSchoolYear)
              : ""
            : field.name === "expectedGraduationYear"
            ? data?.expectedGraduationYear
              ? new Date(data.expectedGraduationYear)
              : ""
            : data?.[field.name] || "")
    );

    setInputStates(initialInputState);
  }, [data]);

  // update userData
  const {
    profileDispatch,
    profileState: {
      profile: { profileLoading, profileError, profileData, profileIsUpdated },
    },
  } = useContext(GlobalContext);

  const formData = new FormData();
  Object.keys(inputStates).forEach((inputName) => {
    formData.append(inputName, inputStates[inputName]);
  });

  const handleChange = (name, value) => {
    setInputStates({ ...inputStates, [name]: value });
  };

  const handleSubmit = () => {
    // submit data
    updateProfile(userID, formData)(profileDispatch);

    const slug = data?.userName;
    slug && router.push(`/user/${slug}`);
  };

  const closeProfileSetup = () => {
    // discard changes
    const slug = data?.userName;
    slug && router.push(`/user/${slug}`);
  };

  // console.log(inputStates);
  return (
    <SettingBody
      settingsPage={settingsPage}
      data={data}
      userID={userID}
      handleSubmit={handleSubmit}
      closeProfileSetup={closeProfileSetup}
    >
      <div className='profileEducationContent'>
        {
          // display an input component for each input field
          [
            all.educationLevelField,
            all.schoolNameField,
            all.enteredHighSchoolYearField,
            all.expectedGraduationYearField,
            all.studentStatusField,
            all.degreeField,
          ].map((field, key) => {
            return (
              <CreateSettingInput
                name={field.name}
                type={field.type}
                label={field.label}
                options={field.options}
                required={field.required}
                halfWidth={field.halfWidth}
                rightSpaced={field.rightSpaced}
                value={inputStates[field.name]}
                setValue={(value) => {
                  handleChange(field.name, value);
                }}
                key={key}
              />
            );
          })
        }
      </div>
    </SettingBody>
  );
}

export default SettingBodyProfileEducation;
