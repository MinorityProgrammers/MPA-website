import React, { useState } from 'react';
import CreateProfileForm from './CreateProfileForm';
import CreateProfileInput from './CreateProfileInput';
import CreateProfileSkills from './CreateProfileSkills';
import { AiFillCloseCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import {
    passionsField,
    softSkillsField,
    programmingLanguagesField,
    proficiencyField
} from '../../contexts/utils/profileInputFields';


const CreateProfileQuestions4 = ({ state, setState, step, setStep, inputStates, closeProfileSetup }) => {
    const handleChange = (name, value) => {
        setState({ ...state, [step]: { ...state[step], [name]: value } });
    }
    // Get multiple values from multiple input fields within the same parent element
    const getFieldValues = (element, names) => {
        return names.map(name => element.parentNode.querySelector(`input[name='${name}']`));
    }
    // get values from input fields within same parent and add it as an array element to state
    const handleAdd = (e, names, reset) => {
        const fieldValues = getFieldValues(e.target, names);
        const name = names[0]
        const prevValues = state[step][names[0]];
        const value = Array.from(fieldValues).map(fieldValue => fieldValue.value).join('/');
        handleChange(name, [...new Set([...prevValues, value])]);
        const addedText = document.querySelectorAll('.css-1uccc91-singleValue')
        addedText.forEach(singleText => {
            singleText.textContent = reset
        });
        fieldValues.forEach(element => {
            element.value = reset
        });
        // fieldValues[0].value = reset;
    }
    const allInputFields = [passionsField, softSkillsField, programmingLanguagesField, proficiencyField];

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
            return (state[step][fieldName]) || !inputField.required;
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
            <div className="cp-top">
                <h1>Lets get to know you better!</h1>
                <h2>What are your passions + skillsets?</h2>
            </div>
            <CreateProfileForm grid={false}>
                <div className="cp-passionsPage">
                    <h2>What are your areas of interest?</h2>
                    <div className="cp-multiInputContainer">
                        <div className="cp-multiInput">
                            <CreateProfileInput
                                name={passionsField.name}
                                type={passionsField.type}
                                label={passionsField.label}
                                options={passionsField.options}
                                required={passionsField.required}
                            />
                            <button onClick={(e) => handleAdd(e, [passionsField.name], '')}>Add</button>
                        </div>
                        <CreateProfileSkills
                            values={[...state[step][passionsField.name]]}
                            setValue={(value) => { handleChange(passionsField.name, value) }}
                        />
                    </div>
                    <h2>What are your level of skillsets</h2>
                    <div className="cp-multiInputContainer">
                        <div className="cp-multiInput">
                            <CreateProfileInput
                                name={softSkillsField.name}
                                type={softSkillsField.type}
                                label={softSkillsField.label}
                                options={softSkillsField.options}
                                required={softSkillsField.required}
                            />
                            <CreateProfileInput
                                name={proficiencyField.name}
                                type={proficiencyField.type}
                                label={proficiencyField.label}
                                options={proficiencyField.options}
                                required={proficiencyField.required}
                            />
                            <button onClick={(e) => handleAdd(e, [softSkillsField.name, proficiencyField.name], '')}>Add</button>
                        </div>
                        <CreateProfileSkills
                            values={[...state[step][softSkillsField.name]]}
                            setValue={(value) => { handleChange(softSkillsField.name, value) }}
                        />
                    </div>
                    <div className="cp-multiInputContainer">
                        <div className="cp-multiInput">
                            <CreateProfileInput
                                name={programmingLanguagesField.name}
                                type={programmingLanguagesField.type}
                                label={programmingLanguagesField.label}
                                options={programmingLanguagesField.options}
                                required={programmingLanguagesField.required}
                            />
                            <CreateProfileInput
                                name={proficiencyField.name}
                                type={proficiencyField.type}
                                label={proficiencyField.label}
                                options={proficiencyField.options}
                                required={proficiencyField.required}
                            />
                            <button onClick={(e) => handleAdd(e, [programmingLanguagesField.name, proficiencyField.name], '')}>Add</button>
                        </div>
                        <CreateProfileSkills
                            values={[...state[step][programmingLanguagesField.name]]}
                            setValue={(value) => { handleChange(programmingLanguagesField.name, value) }}
                        />
                    </div>
                </div>
            </CreateProfileForm>
            <div className="cp-navButtonsContainer">
                <button className="cp-navButton" onClick={handlePrev}><AiOutlineArrowLeft /></button>
                <button className="cp-navButton" onClick={handleNext}><AiOutlineArrowRight /></button>
            </div>
        </div>
    );
}

export default CreateProfileQuestions4;
