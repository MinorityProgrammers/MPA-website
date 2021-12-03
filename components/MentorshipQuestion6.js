import React, { Component } from 'react'

import Link from 'next/link'


export class MentorshipQuestion6 extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values } = this.props;
        this.props.values
        let lookingTitle = ""
        if (values.iAMa == "Mentor") {
            lookingTitle = "Mentee"
        }
        if (values.iAMa == "Mentee") {
            lookingTitle = "Mentor"
        }

        return (
            <div className="tw-relative tw-mt-20 tw-font-redhat tw-bg-white tw-h-660px tw-w-950px tw-px-24 tw-pt-16 tw-pb-36 tw-rounded-3xl tw-shadow-mentor md:tw-h-auto md:tw-px-10 md:tw-py-30 tw-select-none">
                <form className="tw-pb-20">
                    <h1 className="tw-font-bold tw-text-black tw-text-5xl tw-mb-8 md:tw-text-center tw-select-none">Preview</h1>
                    <div className="tw-h-330px tw-overflow-y-scroll tw-border-4 tw-p-2 container">
                        <div className="row tw tw-mx-0">
                            <h2 className="tw-text-center tw-text-3xl tw-text-#222222 tw-font-bold tw-pb-4 col">{values.iAMa}'s Registration</h2>
                        </div>
                        <div className="row tw tw-mx-0">
                            <div className="col">
                                <h4>Personal Details</h4>
                                <hr />
                            </div>
                        </div>
                        <div className="tw-py-2 row tw tw-mx-0">
                            <div className="col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">Full Name</h5>
                                <p className="tw-m-0">{values.firstName} {values.lastName}</p>
                            </div>
                            <div className="col-sm-12 col-md-4 tw-text-center md:tw-text-left">
                                <h5 className="tw-font-bold tw-text-#222222">Level of Education</h5>
                                <p className="tw-m-0">{values.levelOfEducation[0].label}</p>
                            </div>
                            <div className="col-sm-12 col-md-4 tw-text-right md:tw-text-left">
                                <h5 className="tw-font-bold tw-text-#222222">Date of Birth</h5>
                                <p className="tw-m-0">{values.DOB}</p>
                            </div>

                        </div>
                        <div className="tw-pb-4 row tw tw-mx-0">
                            <div className="col">
                                <h5 className="tw-font-bold tw-text-#222222">Passions:</h5>
                                <p className="tw-m-0">
                                    {values.passions.map((passion) => (
                                        <span>{passion.label} </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className="tw-pb-4 row tw tw-mx-0">
                            <div className="col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">Country</h5>
                                <p className="tw-m-0">
                                    <p className="tw-m-0">{values.country[0].label} </p>
                                </p>
                            </div>
                            <div className="tw-text-center md:tw-text-left col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">Ocupation</h5>
                                <p className="tw-m-0">
                                    <p className="tw-m-0">{values.occupation} </p>
                                </p>
                            </div>
                            <div className="tw-text-right md:tw-text-left col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">Place I work/study in</h5>
                                <p className="tw-m-0">
                                    <p className="tw-m-0">{values.occupationPlace} </p>
                                </p>
                            </div>
                        </div>
                        <div className="tw-pb-4 row tw tw-mx-0">
                            <div className="col">
                                <h5 className="tw-font-bold tw-text-#222222">Interest:</h5>
                                <p className="tw-m-0">
                                    {values.interest.map((item) => (
                                        <span>{item.label} </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className="tw-pb-4 row tw tw-mx-0">
                            <div className="col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">Learning Style</h5>
                                <p className="tw-m-0">
                                    {values.learningStyle.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                            <div className="tw-text-center md:tw-text-left col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">Personality Type</h5>
                                <p className="tw-m-0">
                                    {values.personlityType.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                            <div className="tw-text-right md:tw-text-left col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">Languages</h5>
                                <p className="tw-m-0">
                                    {values.primaryLang.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className="tw-pb-4 row tw tw-mx-0">
                            <div className="col">
                                <h5 className="tw-font-bold tw-text-#222222">My description</h5>
                                <p className="tw-m-0">
                                    {values.description}
                                </p>
                            </div>
                        </div>

                        <div className="row tw tw-mx-0">
                            <div className="col">
                                <h4>I am looking for</h4>
                                <hr />
                            </div>
                        </div>
                        <div className="tw-py-4 row tw tw-mx-0">
                            <div className="col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">{lookingTitle}'s  Education</h5>
                                <p className="tw-m-0">
                                    {values.lookingForEdu.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                            <div className="tw-text-center md:tw-text-left col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">{lookingTitle}'s  Experience</h5>
                                <p className="tw-m-0">
                                    {values.lookingForExp.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                            <div className="tw-text-right md:tw-text-left col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">{lookingTitle}'s  Gender</h5>
                                <p className="tw-m-0">
                                    {values.lookingForGender.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className="tw-py-4 row tw tw-mx-0">
                            <div className="col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">{lookingTitle}'s  Availability</h5>
                                <p className="tw-m-0">
                                    {values.lookingForAvailability.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                            <div className="tw-text-center md:tw-text-left col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">{lookingTitle}'s  Language</h5>
                                <p className="tw-m-0">
                                    {values.lookingForLang.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                            <div className="tw-text-right md:tw-text-left col-sm-12 col-md-4">
                                <h5 className="tw-font-bold tw-text-#222222">{lookingTitle}'s  Ethnicity</h5>
                                <p className="tw-m-0">
                                    {values.lookingForEthnicity.map((item) => (
                                        <p className="tw-m-0">{item.label} </p>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="tw-absolute tw-w-full tw-bottom-12 tw-pr-48 md:tw-pr-20 md:tw-bottom-7 tw-text-center">
                    <div className="tw-w-280px tw-mx-auto tw-flex tw-justify-between">
                        <button className="tw-bg-NavDark tw-outline-none tw-rounded-md tw-w-32 tw-py-2 tw-mb-6 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500" onClick={this.back}>Edit</button>
                        <Link href="/mentorshipApp">
                            <button className="tw-bg-activeOrange tw-outline-none tw-rounded-md tw-w-32 tw-py-2 tw-mb-6 tw-text-white hover:tw-text-NavDark hover:tw-bg-white tw-duration-500">Complete</button>

                        </Link>
                    </div>

                    <span className="tw-block tw-text-center">{values.step}/6</span>
                    <div className="tw-w-full tw-bg-gradient-to-r tw-from-FFC700 tw-via-FF655B tw-to-FF00B8 tw-h-2 tw-rounded-2xl tw-relative">
                        <div className={`tw-bg-gray-300 tw-h-2 tw-rounded-2xl tw-absolute tw-right-0 tw-w-line-6/6`}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MentorshipQuestion6
