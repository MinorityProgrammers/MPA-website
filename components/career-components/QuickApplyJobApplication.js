import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FormData from "form-data";
import { successToast } from "../../contexts/utils/toasts";

const QuickApplyJobApplication = (props) => {
  const { job, open, closeModal, data, getAppliedJobs } = props;

  const router = useRouter();

  const userInfo =
    typeof window !== "undefined"
      ? window.localStorage.getItem("userInfo")
      : null;
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("jwtToken")
      : null;

  const userDataFromLS = JSON.parse(userInfo)?.user;

  const [quickApp, setQuickApp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    jobTitle: "",
    company: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [additional, setAdditional] = useState(null);
  const [resumeSizeWarning, setResumeSizeWarning] = useState(false);
  const [additionalSizeWarning, setAdditionalSizeWarning] = useState(false);

  const modalRef = useRef();

  const clickOutsideFunction = (e) => {
    if (modalRef.current === e.target) {
      closeModal(false);
    }
  };
  const handleChange = (e) => {
    setQuickApp({
      ...quickApp,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeInput = (e) => {
    const file = e.target.files[0];
    if (file == null) {
      setResumeSizeWarning(false);
    } else if (file.size > 4e6) {
      setResumeSizeWarning(true);
    } else {
      setResumeSizeWarning(false);
      setResume(file);
    }
  };
  const handleAdditionalInput = (e) => {
    const file = e.target.files[0];
    if (file == null) {
      setAdditionalSizeWarning(false);
    } else if (file.size > 4e6) {
      setAdditionalSizeWarning(true);
    } else {
      setAdditionalSizeWarning(false);
      setAdditional(file);
    }
  };

  const formData = new FormData();
  formData.append("firstName", quickApp.firstName || "");
  formData.append("lastName", quickApp.lastName || "");
  formData.append("email", quickApp.email || "");
  formData.append("country", quickApp.country || "");
  formData.append("city", quickApp.city || "");
  formData.append("state", quickApp.state || "");
  formData.append("jobTitle", quickApp.jobTitle || "");
  formData.append("company", quickApp.company || "");
  formData.append("coverLetter", quickApp.coverLetter || "");
  formData.append("resume", resume || "");
  formData.append("additional", additional || "");
  formData.append("job_id", job?._id || "");

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://koinstreet-learn-api.herokuapp.com/api/v1/easyApply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        successToast(`Applied ${job.job_title} position Successfully!`);
        getAppliedJobs();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    closeModal();
  };

  return (
    <div
      ref={modalRef}
      onClick={clickOutsideFunction}
      className="tw-z-50 tw-absolute tw-ml-auto tw-mr-auto tw-w-full tw-h-auto tw-bg-black tw-bg-opacity-50 tw--mt-10"
      style={open ? { display: "block" } : { display: "none" }}
    >
      <div className="tw-bg-white tw-w-11/12 2xl:tw-w-3/6 tw-ml-auto tw-mr-auto tw-mt-36 tw-mb-10 tw-rounded-2xl tw-text-darkGray">
        <div className="tw-bg-gradient-to-r tw-from-purple-700 tw-to-yellow-300 tw-mb-4 tw-pb-1 tw-rounded-t-2xl">
          <div className="tw-bg-white tw-pl-10 tw-pr-10 tw-pt-8 tw-rounded-t-2xl">
            <p>Minority Programmers Association</p>
            <h1 className="tw-font-bold tw-text-2xl">{job?.job_title}</h1>
            <p className="tw-pb-2.5 tw-text-m tw-font-medium tw-italic">
              {job?.location}
            </p>
          </div>
        </div>

        <div className="tw-pl-10 tw-pr-10 tw-pb-10 tw-pt-2">
          {userDataFromLS && (
            <div className="tw-flex sm:tw-flex-col sm:tw-text-center tw-items-center tw-rounded-2xl tw-bg-gradient-to-r tw-from-blue-900 tw-p-10 tw-text-white tw-h-52 sm:tw-h-full tw-mb-3 sm:tw-text-gray-900">
              <img
                src={
                  userDataFromLS.profilePicture
                    ? userDataFromLS.profilePicture
                    : "/assets/images/profile.png"
                }
                alt="User's Avatar"
                className="quickAppAvatar tw-rounded-full tw-mr-10 sm:tw-mr-0 sm:tw-mb-4"
              />
              <div>
                <h1 className="tw-font-bold tw-text-4xl tw-mb-1">
                  {userDataFromLS.firstName} {userDataFromLS.lastName}
                </h1>
                <p className="tw-text-yellow-200 tw-mb-1">
                  {userDataFromLS.location}
                </p>
              </div>
            </div>
          )}

          <p className="tw-mb-1">
            <span className="tw-text-pink-400">*</span> Required Fields
          </p>
          <form
            onSubmit={submitHandler}
            className="tw-flex tw-flex-col"
            id="jobApply"
          >
            <div className="tw-border-2 tw-border-gray-500 tw-pt-6 tw-pb-2 tw-pl-8 tw-pr-8 tw-flex tw-flex-col tw-mb-10">
              <div className="sm:tw-flex sm:tw-flex-col">
                <label
                  className="tw-pb-4 tw-font-medium tw-w-6/12 tw-pr-4 sm:tw-pr-0 sm:tw-w-full"
                  htmlFor="firstName"
                >
                  <span className="tw-text-pink-400">*</span> First Name
                  <br />
                  <input
                    className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full"
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={quickApp.firstName}
                    placeholder={userDataFromLS ? userDataFromLS.firstName : ""}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  className="tw-pb-4 tw-font-medium tw-w-6/12 tw-pl-4 sm:tw-pl-0 sm:tw-w-full"
                  htmlFor="lastName"
                >
                  <span className="tw-text-pink-400">*</span> Last Name
                  <br />
                  <input
                    className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full"
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={quickApp.lastName}
                    placeholder={userDataFromLS ? userDataFromLS.lastName : ""}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="sm:tw-flex sm:tw-flex-col">
                <label
                  className="tw-pb-4 tw-font-medium tw-w-6/12 tw-pr-4 sm:tw-pr-0 sm:tw-w-full"
                  htmlFor="email"
                >
                  <span className="tw-text-pink-400">*</span> Email
                  <br />
                  <input
                    className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full"
                    id="email"
                    type="text"
                    name="email"
                    value={quickApp.email}
                    placeholder={userDataFromLS ? userDataFromLS.email : ""}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  className="tw-pb-4 tw-font-medium tw-w-6/12 tw-pl-4 sm:tw-pl-0 sm:tw-w-full"
                  htmlFor="country"
                >
                  <span className="tw-text-pink-400">*</span> Country
                  <br />
                  <input
                    className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full"
                    id="country"
                    type="text"
                    name="country"
                    value={quickApp.country}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="sm:tw-flex sm:tw-flex-col">
                <label
                  className="tw-pb-4 tw-font-medium tw-w-6/12 tw-pr-4 sm:tw-pr-0 sm:tw-w-full"
                  htmlFor="state"
                >
                  <span className="tw-text-pink-400">*</span> State
                  <br />
                  <input
                    className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full"
                    id="state"
                    type="text"
                    name="state"
                    value={quickApp.state}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  className="tw-pb-4 tw-font-medium tw-w-6/12 tw-pl-4 sm:tw-pl-0 sm:tw-w-full"
                  htmlFor="city"
                >
                  <span className="tw-text-pink-400">*</span> City
                  <br />
                  <input
                    className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full"
                    id="city"
                    type="text"
                    name="city"
                    value={quickApp.city}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div className="tw-border-2 tw-border-gray-500 tw-pt-6 tw-pb-2 tw-pl-8 tw-pr-8 tw-flex-col tw-mb-8">
              <h2 className="tw-font-bold tw-text-xl tw-mb-1">
                Relevant Experience
              </h2>
              <div className="sm:tw-flex sm:tw-flex-col">
                <label
                  className="tw-pb-4 tw-font-medium tw-w-6/12 tw-pr-4 sm:tw-pr-0 sm:tw-w-full"
                  htmlFor="jobTitle"
                >
                  Job Title
                  <br />
                  <input
                    className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full"
                    id="jobTitle"
                    type="text"
                    name="jobTitle"
                    value={quickApp.jobTitle}
                    onChange={handleChange}
                  />
                </label>

                <label
                  className="tw-pb-4 tw-font-medium tw-w-6/12 tw-pl-4 sm:tw-pl-0 sm:tw-w-full"
                  htmlFor="company"
                >
                  Company
                  <br />
                  <input
                    className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full"
                    id="company"
                    type="text"
                    name="company"
                    value={quickApp.company}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <label
              className="tw-pb-4 tw-font-medium tw-w-full"
              htmlFor="coverLetter"
            >
              Cover Letter
              <br />
              <textarea
                className="tw-h-10 tw-p-3 tw-mt-1 tw-border-2 tw-border-gray-500 tw-bg-gray-200 tw-w-full tw-h-40 tw-text-darkGray"
                id="coverLetter"
                type="text"
                name="coverLetter"
                value={quickApp.coverLetter}
                onChange={handleChange}
              />
            </label>

            <div className="tw-flex tw-flex-col tw-mb-4">
              <h3 className="tw-text-lg tw-mb-1 tw-font-medium">
                {" "}
                <span className="tw-text-pink-400">*</span> Upload Your Resume
              </h3>
              <input
                className="quickApplyUpload"
                name="resume"
                type="file"
                onChange={handleResumeInput}
                required
              />
              {resumeSizeWarning && (
                <p className="tw-text-red-500">File size can't exceed 5mb.</p>
              )}
            </div>

            <div className="tw-flex tw-flex-col tw-mb-8">
              <h3 className="tw-text-lg tw-mb-1 tw-font-medium">
                Upload Any Additional Document
              </h3>
              <input
                className="quickApplyUpload"
                name="additional"
                type="file"
                onChange={handleAdditionalInput}
              />
              {additionalSizeWarning && (
                <p className="tw-text-red-500">File size can't exceed 5mb.</p>
              )}
              <img src={setResume.file} />
            </div>

            <div className="tw-flex tw-justify-between">
              <input
                className="tw-pl-5 tw-pr-5 tw-pt-3 tw-pb-3 tw-text-white tw-bg-blue-900 hover:tw-bg-blue-700 tw-w-52 sm:tw-w-full tw-text-lg"
                type="submit"
                value="Quick Apply"
              />
              <input
                className="tw-pl-5 tw-pr-5 tw-pt-3 tw-pb-3 tw-text-blue-800 tw-bg-white hover:tw-bg-blue-100 tw-w-52 sm:tw-w-full tw-text-lg tw-border-2 tw-border-blue-800 tw-font-bold"
                type="submit"
                value="Cancel"
                onClick={closeModal}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuickApplyJobApplication;
