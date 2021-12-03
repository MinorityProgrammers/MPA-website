import React, { Component } from 'react'

export class MentorshipQuestion5 extends Component {
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
                <div>
                    <form className="tw-pb-20">
                        {values.isErrorMessage ? (
                            <div>
                                <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-2 md:tw-text-center tw-select-none">Description</h1>
                                <span className="tw-text-red-500 tw-select-none tw-m-0">Please type in atleast 10 characters</span>
                            </div>
                        ) : (
                            <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-8 md:tw-text-center tw-select-none">Description</h1>
                        )}
                        <textarea
                            className="tw-w-full tw-text-textGray tw-bg-white tw-py-3 tw-px-3 tw-border-4 tw-border-gray-300 tw-border-opacity-50 tw-rounded-2xl resize-none tw-outline-none"
                            name="description"
                            id="description"
                            rows="8"
                            placeholder="Type in your bio, your goals and other thoughts..."

                            onChange={handleChange('description')}
                        >
                            {values.description}
                        </textarea>
                    </form>
                </div>
                <div className="tw-absolute tw-w-full tw-bottom-12 tw-pr-48 md:tw-pr-20 md:tw-bottom-7 tw-text-center">
                    <div className="tw-w-140px tw-mx-auto tw-flex tw-justify-between">
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-14 tw-mb-8 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500 tw-mx-auto" onClick={this.back}><i className="fas fa-arrow-left tw-text-2xl tw-p-2"></i></button>
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-14 tw-mb-8 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500 tw-mx-auto" onClick={this.continue}><i className="fas fa-arrow-right tw-text-2xl tw-p-2"></i></button>
                    </div>

                    <span className="tw-block tw-text-center">{values.step}/6</span>
                    <div className="tw-w-full tw-bg-gradient-to-r tw-from-FFC700 tw-via-FF655B tw-to-FF00B8 tw-h-2 tw-rounded-2xl tw-relative">
                        <div className={`tw-bg-gray-300 tw-h-2 tw-rounded-2xl tw-absolute tw-right-0 tw-w-line-5/6`}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MentorshipQuestion5
