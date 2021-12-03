import React, { Component } from 'react'

export class MentorshipQuestion2 extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values, handleChange } = this.props;
        this.props.values
        return (
            <div className="tw-relative tw-mt-20 tw-font-redhat tw-bg-white tw-h-660px tw-w-950px tw-px-24 tw-pt-16 tw-pb-36 tw-rounded-3xl tw-shadow-mentor md:tw-h-auto md:tw-px-10 md:tw-py-30 tw-select-none">
                <form className="tw-pb-20">
                    {values.isErrorMessage ? (
                        <div>
                            <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-2 md:tw-text-center tw-select-none">I am a</h1>
                            <span className="tw-text-red-500 tw-select-none tw-m-0">Please select one option</span>
                        </div>
                    ) : (
                        <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-8 md:tw-text-center tw-select-none">I am a</h1>
                    )}
                    <div className="tw-flex tw-flex-row tw-justify-between md:tw-flex-col">
                        <label className="tw-w-49% md:tw-w-full tw-cursor-pointer" htmlFor="FirstSelect">

                            <input
                                id="FirstSelect"
                                className="tw-outline-none tw-hidden"
                                type="radio"
                                name="iAMa"
                                onChange={handleChange('iAMa')}
                                defaultValue="Mentor"
                                defaultChecked={values.iAMa === 'Mentor'}
                            />
                            <img className="tw-w-full tw-h-240px tw-mx-auto tw-object-cover tw-rounded-t-2xl tw-filter tw-grayscale label-checked:tw-filter-none" src="/assets/images/Mentorship/mentorSelect.jpg" alt="Mentor Image" />
                            <div className="tw-flex tw-justify-center tw-text-gray-400 tw-text-opacity-70 tw-h-20 tw-text-center tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-b-2xl tw-border-t-white tw-text-3xl label-checked:tw-bg-NavDark label-checked:tw-font-bold label-checked:tw-text-white label-checked:tw-border-NavDark">Mentor</div>
                        </label>
                        <label className="tw-w-49% md:tw-w-full tw-cursor-pointer" htmlFor="SecondSelect">
                            <input
                                id="SecondSelect"
                                className="tw-outline-none tw-hidden"
                                type="radio"
                                name="iAMa"
                                onChange={handleChange('iAMa')}
                                defaultValue="Mentee"
                                defaultChecked={values.iAMa === 'Mentee'}
                            />
                            <img className="tw-w-full tw-h-240px tw-mx-auto tw-object-cover tw-rounded-t-2xl tw-filter tw-grayscale label-checked:tw-filter-none" src="/assets/images/Mentorship/menteeSelect.jpeg" alt="Mentee Image" />
                            <div className="tw-flex tw-justify-center tw-text-gray-400 tw-text-opacity-70 tw-h-20 tw-text-center tw-bg-white input-area tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-b-2xl tw-border-t-white tw-text-3xl label-checked:tw-bg-NavDark label-checked:tw-font-bold label-checked:tw-text-white label-checked:tw-border-NavDark">Mentee</div>
                        </label>
                    </div>
                </form>
                <div className="tw-absolute tw-w-full tw-bottom-12 tw-pr-48 md:tw-pr-20 md:tw-bottom-7 tw-text-center">
                    <div className="tw-w-140px tw-mx-auto tw-flex tw-justify-between">
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-14 tw-mb-8 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500 tw-mx-auto" onClick={this.back}><i className="fas fa-arrow-left tw-text-2xl tw-p-2"></i></button>
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-14 tw-mb-8 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500 tw-mx-auto" onClick={this.continue}><i className="fas fa-arrow-right tw-text-2xl tw-p-2"></i></button>
                    </div>

                    <span className="tw-block tw-text-center">{values.step}/6</span>
                    <div className="tw-w-full tw-bg-gradient-to-r tw-from-FFC700 tw-via-FF655B tw-to-FF00B8 tw-h-2 tw-rounded-2xl tw-relative">
                        <div className={`tw-bg-gray-300 tw-h-2 tw-rounded-2xl tw-absolute tw-right-0 tw-w-line-2/6`}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MentorshipQuestion2