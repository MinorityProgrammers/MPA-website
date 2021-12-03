import React, { Component } from 'react'
import MultiSelect from "react-multi-select-component";
import Select from 'react-dropdown-select';

let countries = []
export class MentorshipQuestion1 extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(res => res.json())
            .then(
                (result) => {
                    for (let i = 0; i < result.length; i++) {
                        let country = { "label": result[i]["name"], "value": result[i]["name"] }
                        countries.push(country)
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log("lol")
                }
            )
    }

    render() {
        const { values, handleChange, handleDropDown } = this.props;
        this.props.values

        const eduOptions = [
            { label: "Middle School", value: "Middle School" },
            { label: "High School", value: "High School" },
            { label: "Associate’s", value: "Associate’s" },
            { label: "Bachelor’s", value: "Bachelor’s" },
            { label: "Master’s", value: "Master’s" },
            { label: "PHD", value: "PHD" },
        ];
        const passionOptions = [
            { label: "Technology", value: "Technology" },
            { label: "Nature", value: "Nature" },
            { label: "Music", value: "Music" },
            { label: "Sports", value: "Sports" },
            { label: "Entreprenuership", value: "Entreprenuership" },
            { label: "Reading", value: "Reading" },
            { label: "Volunteering", value: "Volunteering" },
            { label: "Arts", value: "Arts" },
            { label: "Dancing", value: "Dancing" },
            { label: "Comedy", value: "Comedy" },
            { label: "Gaming", value: "Gaming" },
            { label: "Cooking", value: "Cooking" },
            { label: "Animals", value: "Animals" },
            { label: "Travel", value: "Travel" },
        ];

        return (
            <div className="tw-relative tw-mt-20 tw-font-redhat tw-bg-white tw-h-660px tw-w-950px tw-px-24 tw-pt-16 tw-pb-36 tw-rounded-3xl tw-shadow-mentor md:tw-h-auto md:tw-px-10 md:tw-py-30">
                <form className="tw-pb-6">
                    {values.isErrorMessage ? (
                        <div>
                            <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-2 md:tw-text-center tw-select-none">Personal Details</h1>
                            <span className="tw-text-red-500 tw-select-none tw-m-0">Please fill in all the blank fields</span>
                        </div>

                    ) : (<h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-8 md:tw-text-center tw-select-none">Personal Details</h1>)}
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="firstName">First Name</label>
                            <input
                                className="tw-outline-none tw-text-darkGray tw-text-md"
                                type="text"
                                name="firstName"
                                onChange={handleChange('firstName')}
                                defaultValue={values.firstName}
                                maxLength="16"
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="lastName">Last Name</label>
                            <input
                                className="tw-outline-none tw-text-darkGray tw-text-md"
                                type="text"
                                name="lastName"
                                onChange={handleChange('lastName')}
                                defaultValue={values.lastName}
                                maxLength="16"
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="DOB">Date of Birth</label>
                            <input

                                className="tw-outline-none tw-text-darkGray tw-text-md"
                                type="date"
                                name="DOB"
                                onChange={handleChange('DOB')}
                                defaultValue={values.DOB}
                                placeholder=""
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="country">Country</label>
                            <Select
                                className="tw-outline-none tw-text-darkGray tw-text-md"
                                options={countries}
                                onChange={handleDropDown("country")}
                                name="country"
                                values={[values.country[0]]}
                                placeholder=""
                                color="#00A3FF"
                                autocomplete="off"
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col tw-text-textGray tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="levelOfEducation">Level of Education</label>
                            <Select
                                className="tw-outline-none tw-text-darkGray tw-text-md"
                                options={eduOptions}
                                onChange={handleDropDown("levelOfEducation")}
                                name="levelOfEducation"
                                values={[values.levelOfEducation[0]]}
                                placeholder=""
                                color="#00A3FF"
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="passions">Passions</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={passionOptions}
                                name="passions"
                                value={values.passions}
                                onChange={handleDropDown("passions")}
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
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-14 tw-mb-8 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500 tw-mx-auto tw-select-none" onClick={this.back}><i className="fas fa-arrow-left tw-text-2xl tw-p-2"></i></button>
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-14 tw-mb-8 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500 tw-mx-auto tw-select-none" onClick={this.continue}><i className="fas fa-arrow-right tw-text-2xl tw-p-2"></i></button>
                    </div>

                    <span className="tw-block tw-text-center tw-select-none">{values.step}/6</span>
                    <div className="tw-w-full tw-bg-gradient-to-r tw-from-FFC700 tw-via-FF655B tw-to-FF00B8 tw-h-2 tw-rounded-2xl tw-relative">
                        <div className={`tw-bg-gray-300 tw-h-2 tw-rounded-2xl tw-absolute tw-right-0 tw-w-line-1/6`}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MentorshipQuestion1