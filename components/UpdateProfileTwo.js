import FormData from 'form-data';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import 'react-toastify/dist/ReactToastify.css';
import updateProfile from '../contexts/actions/profile/updateProfile';
import { GlobalContext } from '../contexts/provider';
import { storeOne, storeThree, storeTwo } from '../contexts/utils/fields';
import { CustomInput } from './form-elements/inputs';

const UpdateProfileTwo = function ({ open = true, setOpen = () => {}, userData }) {
  const {
    profileDispatch,
    profileState: {
      profile: {
        profileError, profileData,
      },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (open === true) {
      document.getElementById('up-modal').classList.add('up-modal');
      document.getElementById('up-modal').classList.remove('up-hide-modal');
      document.getElementById('up-overlay').classList.add('up-overlay');
      document.getElementById('up-overlay').classList.remove('up-hide-overlay');
    } else {
      document.getElementById('up-modal').classList.add('up-hide-modal');
      document.getElementById('up-modal').classList.remove('up-modal');
      document.getElementById('up-overlay').classList.add('up-hide-overlay');
      document.getElementById('up-overlay').classList.remove('up-overlay');
    }
  });

  const [newFirstName, setNewFirstName] = useState(userData.firstName || '');
  const [newlastName, setNewLastName] = useState(userData.lastName || '');
  const [newEmail, setNewEmail] = useState(userData.email || '');
  const [newPhoneNumber, setNewPhoneNumber] = useState(
    userData.phoneNumber || '',
  );
  const [newLocation, setNewLocation] = useState(userData.location || '');
  const [newBirthDate, setNewBirthDate] = useState(userData.birthday || '');
  const [newNationality, setNewNationality] = useState(
    userData.Nationality || '',
  );
  const [newEthnicity, setNewEthnicity] = useState(userData.Ethnicity || '');
  const [newGender, setNewGender] = useState(userData.Gender || '');

  const [newGithub, setNewGithub] = useState(userData.GithubLink || '');
  const [newLinkedin, setNewLinkedin] = useState(userData.LinkedinLink || '');
  const [newMedium, setNewMedium] = useState(userData.MediumLink || '');
  const [newFacebook, setNewFacebook] = useState(userData.FacebookLink || '');

  const [newBio, setNewBio] = useState(userData.bio);

  useEffect(() => {
    setNewFirstName(userData.firstName);
    setNewLastName(userData.lastName);
    setNewEmail(userData.email);
    setNewPhoneNumber(userData.phoneNumber);
    setNewLocation(userData.location);
    setNewBirthDate(userData.birthday);
    setNewNationality(userData.Nationality);
    setNewEthnicity(userData.Ethnicity);
    setNewGender(userData.Gender);
    setNewGithub(userData.GithubLink);
    setNewLinkedin(userData.LinkedinLink);
    setNewMedium(userData.MediumLink);
    setNewFacebook(userData.FacebookLink);
    setNewBio(userData.bio);
  }, [userData]);

  const formData = new FormData();
  formData.append('firstName', newFirstName || userData.firstName || '');
  formData.append('lastName', newlastName || userData.lastName || '');
  formData.append('email', newEmail || userData.email || '');
  formData.append('phoneNumber', newPhoneNumber || userData.phoneNumber || '');
  formData.append('location', newLocation || userData.location || '');
  formData.append('birthday', newBirthDate || '');
  formData.append('Nationality', newNationality || userData.Nationality || '');
  formData.append('Ethnicity', newEthnicity || userData.Ethnicity || '');
  formData.append('Gender', newGender || userData.Gender || '');

  formData.append('GithubLink', newGithub || userData.GithubLink || '');
  formData.append('LinkedinLink', newLinkedin || userData.LinkedinLink || '');
  formData.append('MediumLink', newMedium || userData.MediumLink || '');
  formData.append('FacebookLink', newFacebook || userData.FacebookLink || '');

  formData.append('bio', newBio || userData.bio || '');

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (profileData && submit && !profileError) {
      setTimeout(() => {
        window.location.href = '/dashboard/user/singleProfile';
        setSubmit(false);
      }, 3000);
    }
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(userData._id, formData)(profileDispatch);
    setOpen(false);
    setSubmit(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setNewFirstName(userData.firstName);
    setNewLastName(userData.lastName);
    setNewEmail(userData.email);
    setNewPhoneNumber(userData.phoneNumber);
    setNewLocation(userData.location);
    setNewBirthDate(userData.birthday);
    setNewNationality(userData.Nationality);
    setNewEthnicity(userData.Ethnicity);
    setNewGender(userData.Gender);
    setNewGithub(userData.GithubLink);
    setNewLinkedin(userData.LinkedinLink);
    setNewMedium(userData.MediumLink);
    setNewFacebook(userData.FacebookLink);
    setNewBio(userData.bio);
    setOpen(false);
  };

  const personalInfo = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      value: newFirstName,
      setValue: setNewFirstName,
      edit: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      value: newlastName,
      setValue: setNewLastName,
      edit: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: newEmail,
      setValue: setNewEmail,
      edit: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      value: newPhoneNumber,
      setValue: setNewPhoneNumber,
      edit: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      value: newLocation,
      setValue: setNewLocation,
      edit: true,
    },
    {
      name: 'birthdate',
      label: 'Birthdate',
      type: 'date',
      value: newBirthDate,
      setValue: setNewBirthDate,
      edit: false,
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'list',
      list: storeTwo(),
      value: newNationality,
      setValue: setNewNationality,
      edit: true,
    },
    {
      name: 'ethnicity',
      label: 'Ethnicity',
      type: 'list',
      list: storeOne(),
      value: newEthnicity,
      setValue: setNewEthnicity,
      edit: true,
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'list',
      list: storeThree(),
      value: newGender,
      setValue: setNewGender,
      edit: true,
    },
  ];

  const socialMedia = [
    {
      name: 'linkedin',
      label: 'Linkedin',
      type: 'text',
      value: newLinkedin,
      setValue: setNewLinkedin,
      edit: true,
    },
    {
      name: 'github',
      label: 'Github',
      type: 'text',
      value: newGithub,
      setValue: setNewGithub,
      edit: true,
    },
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'text',
      value: newFacebook,
      setValue: setNewFacebook,
      edit: true,
    },
  ];

  return (
    <div className="tw-h-0" id="up-modal-container">
      <div id="up-modal" className="up-hide-modal">
        <div className="up-modal-header">
          <h1>Edit Profile</h1>
          <AiOutlineClose className="up-close" onClick={setOpen} />
        </div>
        <div className="up-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="up-modal-section">
              <div className="up-modal-section-header">
                <h2>Personal Information</h2>
              </div>
              <div className="up-modal-section-body">
                {personalInfo.map((field) => (
                  <div className="up-social" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <div className="up-input">
                      {field.type === 'list' ? (
                        <div className="up-select-container">
                          <select
                            name={field.name}
                            className="up-select"
                            value={field.value || ''}
                            onChange={(e) => {
                              field.setValue(e.target.value);
                            }}
                          >
                            {field.list.map((item) => (
                              <option value={item.value} key={item.label}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                          <RiArrowDropDownLine />
                        </div>
                      ) : (
                        <CustomInput
                          field={field}
                          readOnly={!field.edit}
                          onChange={(e) => {
                            field.setValue(e.target.value);
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="up-modal-section">
              <div className="up-modal-section-header">
                <h2>Additional Media</h2>
              </div>
              <div className="up-modal-section-body">
                {socialMedia.map((field) => (
                  <div className="up-social" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <div className="up-input">
                      <CustomInput
                        field={field}
                        onChange={(e) => {
                          field.setValue(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="up-modal-section">
              <div className="up-modal-section-header">
                <h2>Bio</h2>
              </div>
              <div className="up-modal-section-body">
                <textarea
                  placeholder="Describe your favorite code..."
                  value={newBio}
                  onChange={(e) => {
                    setNewBio(e.target.value);
                    // console.log(userData);
                    // console.log(newBio);
                  }}
                />
              </div>
            </div>
            <div className="up-modal-section">
              <div className="up-modal-section-body">
                <div className="up-button-row">
                  <button type="button" onClick={handleCancel}>Cancel</button>
                  <button className="green" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div id="up-overlay" className="up-hide-overlay" onClick={setOpen} />
    </div>
  );
};

export default UpdateProfileTwo;
