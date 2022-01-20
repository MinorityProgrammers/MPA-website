/* eslint-disable brace-style */
import React, { Component } from 'react';
// import MentorshipQuestion1 from './MentorshipQuestion1';
import MentorshipQuestion2 from './MentorshipQuestion2';
import MentorshipQuestion3 from './MentorshipQuestion3';
import MentorshipQuestion4 from './MentorshipQuestion4';
// import MentorshipQuestion5 from './MentorshipQuestion5';
import MentorshipQuestion6 from './MentorshipQuestion6';

export class MentorshipRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
    // starts at 0
      step: 0,
      isErrorMessage: false,
      firstName: '',
      lastName: '',
      DOB: '',
      country: [{ label: '', value: '' }],
      levelOfEducation: [{ label: '', value: '' }],
      passions: [],
      iAMa: '',
      interest: [],
      learningStyle: [],
      personlityType: [],
      occupation: '',
      occupationPlace: '',
      primaryLang: [],
      lookingForEdu: [],
      lookingForExp: [],
      lookingForAvailability: [],
      lookingForGender: [],
      lookingForLang: [],
      lookingForEthnicity: [],
      description: '',
    };
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    if (step === 0) {
      this.setState({
        isErrorMessage: false,
        step: step + 1,
      });
    }
    // Validation for step 1
    // else if (
    //   step == 1 &&
    //   this.state.firstName.length > 0 &&
    //   this.state.lastName.length > 0 &&
    //   this.state.DOB.length > 0 &&
    //   this.state.DOB.length < 11 &&
    //   this.state.levelOfEducation[0].label.length > 0 &&
    //   this.state.country[0].label.length > 0 &&
    //   this.state.passions.length > 0
    // ) {
    //   this.setState({
    //     isErrorMessage: false,
    //     step: step + 1,
    //   });
    // }
    // Validation for step 2
    else if (step === 1 && this.state.iAMa.length > 0) {
      this.setState({
        isErrorMessage: false,
        step: step + 1,
      });
    } // Validation for step 3
    else if (
      step === 2
      && Object.keys(this.state.interest).length > 0
      && Object.keys(this.state.learningStyle).length > 0
      && Object.keys(this.state.personlityType).length > 0
      && Object.keys(this.state.availability).length > 0
      && this.state.occupationPlace.length > 0
      // Object.keys(this.state.primaryLang).length > 0 &&
      && this.state.occupation.length > 0
    ) {
      this.setState({
        isErrorMessage: false,
        step: step + 1,
      });
    } // Validation for step 4
    else if (
      step === 3
      && Object.keys(this.state.lookingForEdu).length > 0
      && Object.keys(this.state.lookingForExp).length > 0
      && Object.keys(this.state.lookingForAvailability).length > 0
      && Object.keys(this.state.lookingForGender).length > 0
      && Object.keys(this.state.lookingForLang).length > 0
      && Object.keys(this.state.lookingForEthnicity).length > 0
    ) {
      this.setState({
        isErrorMessage: false,
        step: step + 1,
      });
    }
    // Validation for step 5
    // else if (step == 4 && this.state.description.length > 9) {
    //   this.setState({
    //     isErrorMessage: false,
    //     step: step + 1,
    //   });
    // }
    else {
      this.setState({
        isErrorMessage: true,
      });
    }
  };

  // Proceed to Prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
      isErrorMessage: false,
    });
  };

  continue = (e) => {
    e.preventDefault();
    this.nextStep();
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  // Handle Multi or Single DropDown change
  handleDropDown = (e) => (selected) => {
    this.setState({ [e]: selected });
  };

  // componentDidMount() {
  //   console.log(this.state.interest);
  // }

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      DOB,
      country,
      levelOfEducation,
      passions,
      iAMa,
      interest,
      learningStyle,
      personlityType,
      occupation,
      occupationPlace,
      availability,
      primaryLang,
      lookingForEdu,
      lookingForExp,
      lookingForAvailability,
      lookingForGender,
      lookingForLang,
      lookingForEthnicity,
      description,
      isErrorMessage,
    } = this.state;

    const values = {
      step,
      firstName,
      lastName,
      DOB,
      country,
      levelOfEducation,
      passions,
      iAMa,
      interest,
      learningStyle,
      personlityType,
      occupation,
      occupationPlace,
      availability,
      primaryLang,
      lookingForEdu,
      lookingForExp,
      lookingForAvailability,
      lookingForGender,
      lookingForLang,
      lookingForEthnicity,
      description,
      isErrorMessage,
    };

    switch (step) {
      case 0:
        return (
          <div className="tw-mt-20">
            <section id="MentorshipRegister">
              <div className="MentorshipRegister__circle">
                <h1>Register for Mentorship Program</h1>
              </div>
              <p>You Must Be Logged Into MPA for Mentorship Program</p>
              <button type="button" onClick={this.continue}>Continue</button>
            </section>
          </div>
        );
      // case 1:
      //   return (
      //     <MentorshipQuestion1
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       handleDropDown={this.handleDropDown}
      //       values={values}
      //     />
      //   );
      case 1:
        return (
          <MentorshipQuestion2
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <MentorshipQuestion3
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropDown={this.handleDropDown}
            values={values}
          />
        );
      case 3:
        return (
          <MentorshipQuestion4
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleDropDown={this.handleDropDown}
            values={values}
          />
        );
      // case 4:
      //   return (
      //     <MentorshipQuestion5
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       values={values}
      //     />
      //   );
      case 4:
      default:
        return <MentorshipQuestion6 prevStep={this.prevStep} values={values} />;
    }
  }
}

export default MentorshipRegister;
