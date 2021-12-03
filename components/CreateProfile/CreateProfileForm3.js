
import React, { useEffect, useState } from 'react';
import CreateProfileForm from './CreateProfileForm';
import CreateProfileInput from './CreateProfileInput';
import CreateProfileSkills from './CreateProfileSkills';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCloseCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import {
    all
} from '../../contexts/utils/profileInputFields1';
const CreateProfileQuestions3 = ({ state, setState, step, setStep, inputStates, closeProfileSetup }) => {
    const [startDate, setStartDate] = useState(new Date());
    const handleChange = (step, name, value) => {
        setState({ ...state, [step]: { ...state[step], [name]: value } });
    }
    const allInputFields = [all.firstNameField, all.lastNameField, all.birthdateField, all.hometownField, all.primaryLanguageField];

    const [displayWarning, setDisplayWarning] = useState(false);
    const toggleWarning = (on) => {
        if (on) {
            if (!displayWarning) {
                const warning = "<p class='cp-warning'>Fill in Required Slots</p>";
                document.getElementsByClassName("cp-form")[0].insertAdjacentHTML('afterbegin', warning);
                setDisplayWarning(true);

            }
        }
        else {
            if (displayWarning) {
                document.getElementsByClassName("cp-warning")[0].remove();
                setDisplayWarning(false);

            }
        }
    }
    // go back one step
    const handlePrev = () => {
        setStep(step - 1);
        toggleWarning(false);
    }
    // go forward one step
    const handleNext = () => {
        const inputFieldNames = Object.keys(state[step]);
        const allRequiredFilled = inputFieldNames.every(fieldName => {
            const inputField = allInputFields.find(inputField => inputField.name == fieldName);
            return (inputField.required && state[step][fieldName]) || !inputField.required;
        });
        if (allRequiredFilled) {
            setStep(step + 1);
            toggleWarning(false);
            localStorage.setItem('datas', JSON.stringify(inputStates));
            localStorage.setItem('activeStep', step)
        } else {
            /* raise alert to fill out all required */
            toggleWarning(true);
        }
    }
   


    return (
        <div className="cp-body">
            <AiFillCloseCircle className="cp-close" onClick={closeProfileSetup} style={{cursor: 'pointer'}} />
            <div className="cp-top cp-top-border">
                <h1>Setup Profile Page</h1>
                <h2>It's quick and easy!</h2>
            </div>
            <CreateProfileForm>
                <div className="cp-formGrid">
                    {  // display an input component for each input field
                        [
                            all.firstNameField,
                            all.lastNameField,
                            all.birthdateField,
                            all.hometownField,
                            all.primaryLanguageField
                        ].map((field, key) => (
                            <CreateProfileInput
                                name={field.name}
                                type={field.type}
                                label={field.label}
                                options={field.options}
                                required={field.required}
                                value={state[step][field.name]}
                                setValue={(value) => { handleChange(step, field.name, value) }}
                                key={key}
                            />
                        ))
                    }
                </div>
            </CreateProfileForm>
            <div className="cp-navButtonsContainer">
                <button className="cp-navButton" onClick={handlePrev}><AiOutlineArrowLeft /></button>
                <button className="cp-navButton" onClick={handleNext}><AiOutlineArrowRight /></button>
            </div>
        </div>
    );
}

export default CreateProfileQuestions3;