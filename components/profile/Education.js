/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import ButtonComponent from './ButtonComponent';

function Education({
  isLoggedIn, ownsProfile, educationCards, eduEditMode, setEduEditMode, removeEdu, eduAddMode, eduDateGrad,
  eduDateInput, eduTitleInput, EducationMajor, setEduTitleInput, setUnIMG, setEduDateInput, setEduDateGrad, setEducationMajor,
  handleEduImgUpload, uploadedEduImg, setUniversity, setEduAddMode, University, clearEduAdd, completeEduAdd,
}) {
  return (
    <div className="profileTopSection tw-relative tw-py-10 tw-z-10">
      <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md topSection tw-py-10 tw-p-6 lg:tw-p-3 tw-flex tw-flex-col tw-justify-start">
        <div className="tw-w-full tw-flex tw-flex-row ">
          <div className="tw-m-2 tw-text-3xl lg:tw-text-xl tw-font-medium tw-text-left tw-px-10 tw-text-gray-600">Education</div>
          {isLoggedIn && ownsProfile && !!educationCards?.length && (
          <img
            onClick={() => {
              setEduEditMode(!eduEditMode);
            }}
            className="tw-w-8 tw-h-8 tw-mt-2 tw-cursor-pointer"
            src="/assets/new/edit.png"
            alt="edit icon"
          />
          )}

        </div>

        <div className="tw-m-4 lg:tw-m-4 lg:tw-px-4 tw-my-1 tw-w-full tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-row tw-flex-wrap lg:tw-w-col">
            {educationCards?.length ? (
              (
                educationCards.map((edu) => (

                  <div
                    key={edu._id}
                    className="tw-flex tw-py-5 tw-mx-2 lg:tw-mx-2 tw-w-full lg:tw-w-full  tw-rounded-md tw-cursor-pointer"
                  >
                    <div className="tw-flex tw-flex-row tw-w-full">
                      <div className="tw-rounded-md tw-flex tw-flex-col tw-mx-4">
                        <a href={edu?.link} target="_blank" rel="noreferrer">
                          <img
                            className="tw-w-40 tw-h-40 tw-mx-6 tw-rounded-md"
                            src={edu.image}
                            alt={edu.title}
                          />
                        </a>
                        {eduEditMode === true && (
                          <span
                            className="tw-my-4 tw-mx-3 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                            onClick={() => removeEdu(edu?._id)}
                          >
                            Remove
                          </span>
                        )}
                      </div>
                      <div className="tw-flex tw-flex-col">
                        <p className="tw-text-white tw-text-2xl">{edu.name}</p>
                        <div className="tw-flex tw-flex-row tw-my-2">
                          <p className="tw-text-white">{edu?.location}</p>
                        </div>
                        <div className="tw-flex tw-flex-row tw-my-2">
                          <p className="tw-text-white">
                            {edu?.major}
                          </p>
                        </div>
                        <div className="tw-flex tw-flex-row tw-my-2">
                          <p className="tw-text-white">
                            {' '}
                            {moment(edu?.from).calendar()}
                            {' '}
                            -
                            {' '}
                            {moment(edu?.to).calendar()}

                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                ))
              )
            ) : (
              <span className="note tw-text-white tw-m-4 tw" style={{ cursor: 'default' }}>
                No Education yet
              </span>
            )}

          </div>
          {isLoggedIn
                  && ownsProfile
                  && (!educationCards?.length || !eduEditMode) && (
                    <form
                      id="add-Edu-fields"
                      className="add-Edu-edu tw-flex lg:tw-flex-col tw-items-center tw-w-full tw-m-8 lg:tw-m-2"
                    >
                      {eduAddMode && (
                      <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Institution Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Institute Name"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={eduTitleInput}
                            onChange={(e) => setEduTitleInput(e.target.value)}
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Date attended</label>
                          <DatePicker
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={
                              eduDateInput === ''
                                ? 'Date attended'
                                : eduDateInput
                            }
                            name="date"
                            selected={eduDateInput}
                            onChange={(date) => {
                              setEduDateInput(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="Started"
                            autoComplete="false"
                            required
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Graduation Date</label>
                          <DatePicker
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            minDate={new Date(eduDateInput)}
                            name="gradDate"
                            value={
                                eduDateGrad === '' ? 'Graduation Date' : eduDateGrad
                              }
                            selected={eduDateGrad}
                            onChange={(date) => {
                              setEduDateGrad(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="Graduation Date"
                            autoComplete="false"
                            required
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Major</label>

                          <input
                            type="text"
                            placeholder="Enter course studied"
                            name="Enter course studied"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={EducationMajor}
                            onChange={(e) => setEducationMajor(e.target.value)}
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Major</label>

                          <input
                            type="text"
                            placeholder="School link"
                            name="link"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={University}
                            onChange={(e) => setUniversity(e.target.value)}
                          />
                        </div>

                      </div>
                      )}
                      <div className="addImg tw-mr-4 tw-cursor-pointer">
                        {eduAddMode && (
                          <label
                            htmlFor="upload-Edu-image"
                            className="tw-m-0 tw-w-full"
                          >
                            <input
                              type="file"
                              name="image"
                              id="upload-Edu-image"
                              onChange={(e) => {
                                handleEduImgUpload(e.target.files[0]);
                                setUnIMG(e.target.files[0]);
                              }}
                            />

                            <img
                              src={
                                uploadedEduImg
                                || '/assets/images/profile/addEntry.png'
                              }
                              alt="add item"
                              className="tw-w-full"
                            />
                            <p className="tw-text-sm tw-text-gray-500 tw-my-3">
                              add University's image (logo)
                            </p>
                          </label>
                        )}
                        {eduAddMode && (
                        <div className="tw-flex tw-flex-row tw-justify-around tw-my-4">
                          <div
                            className="md:tw-w-11/12 md:tw-my-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-28 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2"
                            onClick={() => completeEduAdd()}
                          >
                            <p className="tw-text-center tw-text-white">Add</p>
                          </div>
                          <div
                            className="tw-bg-red-500 hover:tw-bg-red-600 tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-28 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2 tw-text-white"
                            onClick={() => clearEduAdd()}
                          >
                            <p className="tw-text-center tw-text-white">Cancel</p>
                          </div>
                        </div>
                        )}
                      </div>
                    </form>
          )}
          {isLoggedIn && ownsProfile && (
            <div
              className="tw-m-8 tw-flex tw-flex-row tw-justify-evenly tw-rounded-md tw-cursor-pointer hover:tw-bg-gray-800 tw-w-1/4 lg:tw-w-1/2 topSection"
              onClick={() => setEduAddMode(!eduAddMode)}
            >
              <img className="tw-w-10 tw-h-10" src="/assets/images/profile/add.png" alt="add" />
              <p className="tw-text-gray-500 tw-mt-2">Add Education</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default Education;
