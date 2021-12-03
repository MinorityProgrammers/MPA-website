import React, { Component } from 'react'
import MultiSelect from "react-multi-select-component";


export class MentorshipQuestion3 extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values, handleDropDown, handleChange } = this.props;
        this.props.values

        const interestOptions = [
            { label: "Front-end Development", value: "Front-end Development" },
            { label: "Back-end Development", value: "Back-end Development" },
            { label: "Graphic Design", value: "Graphic Design" },
            { label: "UX/UI", value: "UX/UI" },
            { label: "Data Science", value: "Data Science" },
        ];
        const learningStyleOptions = [
            { label: "Visual", value: "Visual" },
            { label: "Auditory", value: "Auditory" },
            { label: "Read/Write", value: "Read/Write" },
            { label: "Kinesthetic", value: "Kinesthetic" },
        ];
        const personalityTypeOptions = [
            { label: "Architect (INTJ)", value: "Architect (INTJ)" },
            { label: "Logician (INTP)", value: "Logician (INTP)" },
            { label: "Commander (ENTJ)", value: "Commander (ENTJ)" },
            { label: "Debater (ENTP)", value: "Debater (ENTP)" },
            { label: "Advocate (INFJ)", value: "Advocate (INFJ)" },
            { label: "Mediator (INFP)", value: "Mediator (INFP)" },
            { label: "Protagonist (ENFJ)", value: "Protagonist (ENFJ)" },
            { label: "Campaigner (ENFP)", value: "Campaigner (ENFP)" },
            { label: "Logistician (ISTJ)", value: "Logistician (ISTJ)" },
            { label: "Defender (ISFJ)", value: "Defender (ISFJ)" },
            { label: "Executive (ESTJ)", value: "Executive (ESTJ)" },
            { label: "Consul (ESFJ)", value: "Consul (ESFJ)" },
            { label: "Virtuoso (ISTP)", value: "Virtuoso (ISTP)" },
            { label: "Adventurer (ISFP)", value: "Adventurer (ISFP)" },
            { label: "Entrepreneur (ESTP)", value: "Entrepreneur (ESTP)" },
            { label: "Entertainer (ESFP)", value: "Entertainer (ESFP)" },
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
        return (
            <div className="tw-relative tw-mt-20 tw-font-redhat tw-bg-white tw-h-660px tw-w-950px tw-px-24 tw-pt-16 tw-pb-36 tw-rounded-3xl tw-shadow-mentor md:tw-h-auto md:tw-px-10 md:tw-py-30 tw-select-none">
                <form className="tw-pb-20">
                    {values.isErrorMessage ? (
                        <div>
                            <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-2 md:tw-text-center tw-select-none">Additional Details</h1>
                            <span className="tw-text-red-500 tw-select-none tw-m-0">Please fill in all the blank fields</span>
                        </div>
                    ) : (
                        <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-8 md:tw-text-center tw-select-none">Additional Details</h1>
                    )}
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col tw-text-textGray tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="interest">My Interests</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={interestOptions}
                                name="interest"
                                value={values.interest}
                                onChange={handleDropDown("interest")}
                                labelledBy="Select"
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="learningStyle">My learning style</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={learningStyleOptions}
                                name="learningStyle"
                                value={values.learningStyle}
                                onChange={handleDropDown("learningStyle")}
                                labelledBy="Select"
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col tw-text-textGray tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="personlityType">My personality type <a className="tw-text-blue-300" href="https://www.16personalities.com/" target="_blank">(www.16personalities.com)</a></label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={personalityTypeOptions}
                                name="personlityType"
                                value={values.personlityType}
                                onChange={handleDropDown("personlityType")}
                                labelledBy="Select"
                                hasSelectAll={false}
                                overrideStrings={{
                                    selectSomeItems: " "
                                }}
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="occupation">Occupation</label>
                            <input
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                type="text"
                                name="occupation"
                                onChange={handleChange('occupation')}
                                placeholder="Front-End Developer, Student..."
                                defaultValue={values.occupation}
                                maxLength="30"
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-row md:tw-flex-col">
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col tw-text-textGray tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-mr-3 md:tw-mr-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="occupationPlace">Place I work/Study</label>
                            <input
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                type="text"
                                name="occupationPlace"
                                onChange={handleChange('occupationPlace')}
                                placeholder="Google, Harvard..."
                                defaultValue={values.occupationPlace}
                                maxLength="50"
                            />
                        </div>
                        <div className="tw-flex tw-w-6/12 md:tw-w-full tw-flex-initial tw-flex-col  tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl tw-my-2 tw-ml-3 md:tw-ml-0">
                            <label className="tw-text-md tw-select-none tw-mb-0.5" htmlFor="primaryLang">My primary/secondary language</label>
                            <MultiSelect
                                className="tw-w-full tw-outline-none tw-text-darkGray tw-text-md"
                                options={languageOptions}
                                name="primaryLang"
                                value={values.primaryLang}
                                onChange={handleDropDown("primaryLang")}
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
                        <div className={`tw-bg-gray-300 tw-h-2 tw-rounded-2xl tw-absolute tw-right-0 tw-w-line-3/6`}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MentorshipQuestion3
