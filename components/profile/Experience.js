/* eslint-disable react/no-unescaped-entities */
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import ButtonComponent from './ButtonComponent';

function Experience({
  experienceCards, isLoggedIn, ownsProfile,
  expEditMode, expAddMode, handleExpImgUpload, setExpImg,
  uploadedExpImg, setExpAddMode, expDateInputTo, setExpDateInputFrom,
  setExpDateInputTo, setExpJobTitleInput, expDateInputFrom, expJobTitleInput,
  company, setCompany, clearExpAdd, expLocationInput, removeExp,
  setExpLocationInput, link, completeExpAdd, setLink, setExpEditMode,
}) {
  return (
    <div className="profileTopSection tw-relative tw-py-10 tw-z-10">
      <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md topSection tw-py-10 tw-p-6 lg:tw-p-3 tw-flex tw-flex-col tw-justify-start">
        <div className="tw-w-full tw-flex tw-flex-row ">
          <div className="tw-m-2 tw-text-3xl lg:tw-text-xl tw-font-medium tw-text-left tw-px-10 tw-text-gray-600">Experience</div>
          {isLoggedIn && ownsProfile && !!experienceCards?.length && (
          <img
            onClick={() => {
              setExpEditMode(!expEditMode);
            }}
            className="tw-w-8 tw-h-8 tw-mt-2 tw-cursor-pointer"
            src="/assets/new/edit.png"
            alt="edit icon"
          />
          )}

        </div>

        <div className="tw-m-4 lg:tw-m-4 tw-px-8 lg:tw-px-4 tw-my-1 tw-w-full tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-row tw-flex-wrap lg:tw-w-col">
            {experienceCards?.length ? (
              experienceCards.map((exp) => (

                <div
                  key={exp._id}
                  className="tw-flex tw-py-5 tw-mx-4 lg:tw-mx-2 tw-w-1/3 lg:tw-w-full  tw-rounded-md tw-cursor-pointer"
                >
                  <div className="tw-flex tw-flex-row tw-w-full">
                    <div className="careerPic tw-rounded-md tw-flex tw-flex-col tw-mx-4">
                      <a href={exp?.link} target="_blank" rel="noreferrer">
                        <img
                          className="tw-w-20 tw-h-20 tw-mx-6"
                          src={exp.image}
                          alt={exp.title}
                        />
                      </a>
                      {expEditMode === true && (
                        <span
                          className="tw-my-4 tw-mx-3 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                          onClick={() => removeExp(exp?._id)}
                        >
                          Remove
                        </span>
                      )}
                    </div>
                    <div className="tw-flex tw-flex-col">
                      <p className="tw-text-white">{exp.company}</p>
                      <div className="tw-flex tw-flex-row tw-my-2">
                        <img
                          className="tw-w-6 tw-h-6 tw-mr-4"
                          src="/assets/images/profile/pin_alt.png"
                          alt="Location"
                        />
                        <p className="tw-text-white">{exp?.location}</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-my-2">
                        <img
                          className="tw-w-6 tw-h-6 tw-mr-4"
                          src="/assets/images/profile/user.png"
                          alt="user"
                        />
                        <p className="tw-text-white">{exp?.jobTitle}</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-my-2">
                        <img
                          className="tw-w-6 tw-h-6 tw-mr-4"
                          src="/assets/images/profile/calendar.png"
                          alt="calendar"
                        />
                        <p className="tw-text-white">
                          {' '}
                          {moment(exp?.from).calendar()}
                          {' '}
                          -
                          {' '}
                          {moment(exp?.to).calendar()}

                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <span className="note tw-text-white tw-m-4" style={{ cursor: 'default' }}>
                No Experience yet
              </span>
            )}

          </div>
          {isLoggedIn
                  && ownsProfile
                  && (!experienceCards?.length || !expEditMode) && (
                    <form
                      id="add-exp-fields"
                      className="add-exp-edu tw-flex lg:tw-flex-col tw-items-center tw-w-full tw-m-8 lg:tw-m-2"
                    >
                      {expAddMode && (
                      <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Job Title</label>
                          <input
                            type="text"
                            placeholder="Enter Job Title"
                            name="jobTitle"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={expJobTitleInput}
                            onChange={(e) => setExpJobTitleInput(e.target.value)}
                          />
                        </div>
                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Company</label>
                          <input
                            type="text"
                            placeholder="Company name"
                            name="company"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Started From</label>
                          <DatePicker
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={
                              expDateInputFrom === ''
                                ? 'From'
                                : expDateInputFrom
                            }
                            selected={expDateInputFrom}
                            name="from"
                            onChange={(date) => {
                              setExpDateInputFrom(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="from"
                            autoComplete="false"
                            required
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Up to</label>
                          <DatePicker
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            minDate={new Date(expDateInputFrom)}
                            maxDate={moment().toDate()}
                            name="to"
                            value={
                              expDateInputTo === '' ? 'To' : expDateInputTo
                            }
                            selected={expDateInputTo}
                            onChange={(date) => {
                              setExpDateInputTo(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="to"
                            autoComplete="false"
                            required
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Location</label>
                          <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={expLocationInput}
                            onChange={(e) => setExpLocationInput(e.target.value)}
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Link</label>
                          <input
                            type="text"
                            placeholder="Link"
                            name="link"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                          />
                        </div>

                      </div>
                      )}
                      <div className="addImg tw-mr-4 tw-cursor-pointer">
                        {expAddMode && (
                          <label
                            htmlFor="upload-exp-image"
                            className="tw-m-0 tw-w-full"
                          >
                            <input
                              type="file"
                              name="image"
                              id="upload-exp-image"
                              onChange={(e) => {
                                handleExpImgUpload(e.target.files[0]);
                                setExpImg(e.target.files[0]);
                              }}
                            />

                            <img
                              src={
                                uploadedExpImg
                                || '/assets/images/profile/addEntry.png'
                              }
                              alt="add item"
                              className="tw-w-full"
                            />
                            <p className="tw-text-sm tw-text-gray-500 tw-my-3">
                              add company's image (logo)
                            </p>
                          </label>
                        )}
                        {expAddMode && (
                        <div className="tw-flex tw-flex-row tw-justify-around tw-my-4">
                          <div
                            className="md:tw-w-11/12 md:tw-my-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-28 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2"
                            onClick={() => completeExpAdd()}
                          >
                            <p className="tw-text-center tw-text-white">Add</p>
                          </div>
                          <div
                            className="tw-bg-red-500 hover:tw-bg-red-600 tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-28 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2 tw-text-white"
                            onClick={() => clearExpAdd()}
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
              onClick={() => setExpAddMode(!expAddMode)}
            >
              <img className="tw-w-10 tw-h-10" src="/assets/images/profile/add.png" alt="add" />
              <p className="tw-text-gray-500 tw-mt-2">Add Experience</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default Experience;
