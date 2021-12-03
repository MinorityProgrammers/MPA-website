/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React,{useContext, useState, useEffect} from 'react';
import { AiFillHome } from 'react-icons/ai';
import { useHistory } from 'react-router';
import DashboardInputs from './DashboardInputs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { GlobalContext } from "../contexts/provider";
import { updateProfile } from "../contexts/actions/profile/updateProfile";
import {storeOne,storeFour,storeThree,storeTwo} from '../contexts/utils/fields';
import FormData from 'form-data';

const UpdateForm = ({ setOpen, setNotice, setLog, user}) => {

  // states

  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newlastName, setNewLastName] = useState(user.lastName);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPhoneNumber, setNewPhoneNumber] = useState(user.phoneNumber);
  const [newLocation, setNewLocation] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');
  const [newGender, setNewGender] = useState('');
  const [newNationality, setNewNationality] = useState('');
  const [newExperience, setNewExperience] = useState('');
  const [newEthinicity, setNewEthinicity] = useState('');
  const [newGithub, setNewGithub] = useState('');
  const [newLinkedin, setNewLinkedin] = useState('');
  const [newBio, setNewBio] = useState(user.bio)
  const [newProfileImage, setNewProfileImage] = useState('')
  const [submit, setSubmit] = useState(false)
  const [spin, setSpin] = useState(false);



  const {
    profileDispatch,
    profileState: {
      profile: { profileLoading, profileError, profileData, profileIsUpdated },
    },
  } = useContext(GlobalContext);

  // multi/formdata

  const formData = new FormData();
  formData.append("firstName", newFirstName || user.firstName || "");
  formData.append("lastName", newlastName || user.lastName || "");
  formData.append("email", newEmail || user.email || "");
  formData.append("phoneNumber", newPhoneNumber || user.phoneNumber || "");
  formData.append("location", newLocation || user.location || "");
  formData.append("birthday", newBirthDate || "");
  formData.append("Gender", newGender || user.Gender || "");
  formData.append("Nationality", newNationality || user.Nationality || "");
  formData.append("experience", newExperience || user.experience || "");
  formData.append("Ethnicity", newEthinicity || user.Ethnicity || "");
  formData.append("GithubLink", newGithub || user.GithubLink || "");
  formData.append("LinkedinLink", newLinkedin || user.LinkedinLink || "");
  formData.append("bio", newBio || user.bio || "");
  formData.append("profilePicture", newProfileImage || user.profilePicture || "");

   // redirecting the user

   useEffect(() => {
    if (profileData && submit && !profileError) {
        toast.success('profile sucessfuly updated', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setTimeout(() => {
                window.location.href = '/dashboard/user/singleProfile'
                setSubmit(false)
            }, 3000);
        
    }
  }, [profileData]);


     // handling the form submission 

    const handleSubmit = async (e) => {


        e.preventDefault();  
        setSubmit(true)


        setSpin(true)

        updateProfile(user._id,formData)(profileDispatch);
               
    }

  return (


        <>
          <div
            className={`
             tw-col-end-13 tw-bg-profileDark tw-col-start-1 lg:tw-col-start-3  tw-row-start-2  tw-row-end-4 tw-p-3`}
            onClick={() =>{ setOpen(false); setLog(false); setNotice(false)}}
          >
            <div className="tw-flex tw-justify-between">
              <div className="tw-text-gray-100">
                <h2 className="tw-font-bold tw-text-primary-200 tw-text-xl md:tw-text-2xl"> Profile</h2>
                <span className="tw-text-xs tw-font-light"> Student panel</span>
              </div>
              <div className="tw-flex tw-mt-6 tw-text-gray-100 ">
                <span>
                  <AiFillHome className="tw-text-primary-200 tw-mr-1" />
                </span>
                /<span className="tw-mx-1 tw-text-gray-100  tw-text-sm">User</span>/
                <span className="tw-mx-1 tw-text-gray-100  tw-text-sm ">
                  Update profile
                </span>
              </div>
            </div>

            <div
              className={`tw-rounded-md tw-bg-gray-100 tw-shadow-xl tw-w-full tw-my-4`}
            >
              <div className="tw-text-main tw-px-4 tw-py-4 tw-text-xl  ">
                <h2 className="tw-mx-5 tw-font-light"> Update profile</h2>
              </div>

              <form className="tw-w-full  tw-pb-4" onSubmit={handleSubmit}>
                <div className="tw-grid  tw-grid-cols-1 md:tw-grid-cols-2 tw-w-full tw-justify-items-center">
                  <DashboardInputs holder={user.firstName || null} name="firstName" new={newFirstName} setNew={setNewFirstName}/>
                  <DashboardInputs holder={user.lastName || null} name="lastName" new={newlastName} setNew={setNewLastName}/>
                       
                </div>
                <div className="tw-grid  tw-grid-cols-1 md:tw-grid-cols-2 tw-w-full tw-justify-items-center">
                <DashboardInputs holder={user.email || "Your email"} name="email" new={newEmail} setNew={setNewEmail}/>
                <DashboardInputs  holder={user.phoneNumber || "phoneNumber"} name="phoneNumber" new={newPhoneNumber} setNew={setNewPhoneNumber}/>
                </div>
                <div className="tw-grid  tw-grid-cols-1 md:tw-grid-cols-2 tw-w-full tw-justify-items-center">
                <DashboardInputs  holder="Location" name="location" new={newLocation} setNew={setNewLocation}/>
                <DashboardInputs  holder="Birth Date (MM/DD/YY)" name="birthDay" new={newBirthDate} setNew={setNewBirthDate}/>
                </div>{' '}
                <div className="tw-grid  tw-grid-cols-1 md:tw-grid-cols-2 tw-w-full tw-justify-items-center">
                    <div className="tw-flex tw-flex-row tw-h-10 tw-items-center  tw-rounded tw-my-3 tw-shadow-xl tw-w-10/12 inp">
                      <Select
                            options={storeThree()}
                            className="tw-flex-shrink tw-flex-grow tw-flex-auto tw-leading-normal tw-text-gray-500 tw-border-none tw-border-white tw-rounded tw-self-center tw-h-10  tw-text-md tw-outline-none"
                            placeholder="Select your Gender"
                            name="Gender"
                            onChange={(e)=>{setNewGender(e.value);}}
                            isMulti={false}
                            
                          />
                  </div>
                    {/* <DashboardInputs icon="fas fa-user-circle" holder="Ethnicity"/> */}
                  <div className="tw-flex tw-flex-row tw-h-10 tw-items-center  tw-rounded tw-my-3 tw-shadow-xl tw-w-10/12 inp">
                    <Select
                          options={storeTwo()}
                          className="tw-flex-shrink tw-flex-grow tw-flex-auto tw-leading-normal tw-text-gray-500 tw-border-none tw-border-white tw-rounded tw-self-center tw-h-10  tw-text-md tw-outline-none"
                          placeholder="Select your Nationality"
                          name="Nationality"
                          onChange={(e)=>{setNewNationality(e.value);}}
                          isMulti={false}
                        />
                  </div>
                </div>
                <div className="tw-grid  tw-grid-cols-1 md:tw-grid-cols-2 tw-w-full tw-justify-items-center">
                  <div className="tw-flex tw-flex-row tw-h-10 tw-items-center  tw-rounded tw-my-3 tw-shadow-xl tw-w-10/12 inp">
                      <Select
                            options={storeFour()}
                            className="tw-flex-shrink tw-flex-grow tw-flex-auto tw-leading-normal tw-text-gray-500 tw-border-none tw-border-white tw-rounded tw-self-center tw-h-10  tw-text-md tw-outline-none"
                            placeholder="Select your Experience"
                            name="experience"
                            onChange={(e)=>{setNewExperience(e.value);}}
                            isMulti={false}
                          />
                    </div>
                    <div className="tw-flex tw-flex-row tw-h-10 tw-items-center  tw-rounded tw-my-3 tw-shadow-xl tw-w-10/12 inp">
                      <Select
                            options={storeOne()}
                            className="tw-flex-shrink tw-flex-grow tw-flex-auto tw-leading-normal tw-text-gray-500 tw-border-none tw-border-white tw-rounded tw-self-center tw-h-10  tw-text-md tw-outline-none"
                            placeholder="Select your Ethinicity"
                            name="Ethnicity"
                            onChange={(e)=>{setNewEthinicity(e.value);}}
                            isMulti={false}
                          />
                  </div>
                </div>
                <div className="tw-grid  tw-grid-cols-1 md:tw-grid-cols-2 tw-w-full tw-justify-items-center">
                  <DashboardInputs icon="fas fa-user-circle" name="GithubLink" holder="Github" new={newGithub} setNew={setNewGithub}/>
                  <DashboardInputs icon="fas fa-user-circle" name="LinkedinLink" holder="Linkedin" new={newLinkedin} setNew={setNewLinkedin}/>
                </div>
                <div className="tw-grid  tw-grid-cols-1 md:tw-grid-cols-2 tw-w-full tw-justify-items-center">
                <div className="tw-flex tw-flex-row  tw-bg-white tw-items-center tw-rounded tw-my-3 tw-shadow-xl tw-w-10/12 inp">
                <textarea
                type="text"
                value={newBio}
                name="bio"
                className="tw-flex-shrink tw-flex-grow tw-flex-auto tw-leading-normal tw-border-0 tw-rounded tw-p-5 tw-text-gray-500  tw-self-center tw-h-20  tw-text-md tw-outline-none"
                placeholder={user.bio || "your bio"}
                onChange={(e)=>{setNewBio(e.target.value)}}
                                    ></textarea>
                </div>

                <div className="tw-flex  tw-flex-col   tw-w-5/12 md:tw-w-11/12 tw-ml-7  md:tw-ml-10 ">
                  <label htmlFor="image" className="tw-my-2 ">
                    {' '}
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="profilePicture"
                    className="tw-py-4 tw-h-12 tw-mr-10 md:tw-m-0 focus:tw-border-none  tw-text-xs"
                    onChange={(e)=>{setNewProfileImage(e.target.files[0]);}}
                  />
                </div>
                </div>
                
                <div className="tw-flex tw-items-center  tw-w-5/12 md:tw-w-11/12 tw-ml-7 md:tw-ml-10 tw-my-10">
                  <button
                    type="submit"
                    className="tw-px-8 tw-py-1  tw-text-white tw-bg-hover tw-flex tw-flex-row tw-justify-between"
                  >
                    {spin && profileLoading && (<img src="../../loader.svg" alt="Loader" className="tw-w-3 tw-h-3 tw-mt-1 tw-animate-spin" />)}
                    <p className="tw-ml-3">Update</p>
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </>
  );
};

export default UpdateForm;
