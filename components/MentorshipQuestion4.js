import React, { Component } from 'react'

import MultiSelect from "react-multi-select-component";

export class MentorshipQuestion4 extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values, handleDropDown } = this.props;
        this.props.values
        let lookingTitle = ""
        if (values.iAMa == "Mentor") {
            lookingTitle = "Mentee"
        }
        if (values.iAMa == "Mentee") {
            lookingTitle = "Mentor"
        }

        const educationOptions = [
            { label: "Associate’s", value: "Associate’s" },
            { label: "Bachelor’s", value: "Bachelor’s" },
            { label: "Master’s", value: "Master’s" },
            { label: "PhD", value: "PhD" },
        ];
        const skillOptions = [
            { label: "Beginner", value: "Beginner" },
            { label: "Average", value: "Average" },
            { label: "Skilled", value: "Skilled" },
            { label: "Specialist", value: "Specialist" },
        ];
        const availabilityOptions = [
            { label: "Less than 5 hours a week", value: "Less than 5 hours a week" },
            { label: "5-10 hours a week", value: "5-10 hours a week" },
            { label: "10-20 hours a week", value: "10-20 hours a week" },
            { label: "20-40 hours a week", value: "20-40 hours a week" },
            { label: "40+ hours a week", value: "40+ hours a week" },
        ];
        const genderOptions = [
            { label: "Female", value: "Female" },
            { label: "Male ", value: "Male " },
        ];
        const languageOptions = [
            { label: "Arabic", value: "Arabic" },
            { label: "Chinese", value: "Chinese" },
            { label: "English", value: "English" },
            { label: "French", value: "French" },
            { label: "Hindi", value: "Hindi" },
            { label: "Portuguese", value: "Portuguese" },
            { label: "Russian", value: "Russian" },
            { label: "Spanish", value: "Spanish" },
        ];
        const ethnicityOptions = [
            { label: "American Indian", value: "American Indian" },
            { label: "Asian", value: "Asian" },
            { label: "Black or African American", value: "Black or African American" },
            { label: "Hispanic or Latino", value: "Hispanic or Latino" },
            { label: "Native Hawaiian", value: "Native Hawaiian" },
            { label: "White", value: "White" },
        ];
        return (
            <div className="tw-relative tw-mt-20 tw-font-redhat tw-bg-white tw-h-660px tw-w-950px tw-px-24 tw-pt-16 tw-pb-36 tw-rounded-3xl tw-shadow-mentor md:tw-h-auto md:tw-px-10 md:tw-py-30 tw-select-none">
                <form className="tw-pb-20">
                    {values.isErrorMessage ? (
                        <div>
                            <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-2 md:tw-text-center tw-select-none">What am I looking for</h1>
                            <span className="tw-text-red-500 tw-select-none tw-m-0">Please fill in all the blank fields</span>
                        </div>
                    ) : (
                        <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-8 md:tw-text-center tw-select-none">What am I looking for</h1>
                    )}
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col tw-text-textGray tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="lookingForEdu">Education of the {lookingTitle}</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={educationOptions}
                                name="lookingForEdu"
                                value={values.lookingForEdu}
                                onChange={handleDropDown("lookingForEdu")}
                                labelledBy="Select"
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="lookingForExp">Skill Level of the {lookingTitle}</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={skillOptions}
                                name="lookingForExp"
                                value={values.lookingForExp}
                                onChange={handleDropDown("lookingForExp")}
                                labelledBy="Select"
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col tw-text-textGray tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="lookingForComm">Availability of the {lookingTitle}</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={availabilityOptions}
                                name="lookingForComm"
                                value={values.lookingForAvailability}
                                onChange={handleDropDown("lookingForAvailability")}
                                labelledBy="Select"
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="lookingForGender">Gender of the {lookingTitle}</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={genderOptions}
                                name="lookingForGender"
                                value={values.lookingForGender}
                                onChange={handleDropDown("lookingForGender")}
                                labelledBy="Select"
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col tw-text-textGray tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="lookingForLang">Language of the {lookingTitle}</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={languageOptions}
                                name="lookingForLang"
                                value={values.lookingForLang}
                                onChange={handleDropDown("lookingForLang")}
                                labelledBy="Select"
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="lookingForEthnicity">Ethnicity of the {lookingTitle}</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={ethnicityOptions}
                                name="lookingForEthnicity"
                                value={values.lookingForEthnicity}
                                onChange={handleDropDown("lookingForEthnicity")}
                                labelledBy="Select"
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                    </div>
                </form>
                <div className="tw-absolute tw-w-full tw-bottom-12 tw-pr-48 md:tw-pr-20 md:tw-bottom-7 tw-text-center">
                    <div className="tw-w-140px tw-mx-auto tw-flex tw-justify-between">
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-14 tw-mb-8 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500 tw-mx-auto" onClick={this.back}><i className="fas fa-arrow-left tw-text-2xl tw-p-2"></i></button>
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-14 tw-mb-8 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500 tw-mx-auto" onClick={this.continue}><i className="fas fa-arrow-right tw-text-2xl tw-p-2"></i></button>
                    </div>

                    <span className="tw-block tw-text-center">{values.step}/6</span>
                    <div className="tw-w-full tw-bg-gradient-to-r tw-from-FFC700 tw-via-FF655B tw-to-FF00B8 tw-h-2 tw-rounded-2xl tw-relative">
                        <div className={`tw-bg-gray-300 tw-h-2 tw-rounded-2xl tw-absolute tw-right-0 tw-w-line-4/6`}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MentorshipQuestion4
