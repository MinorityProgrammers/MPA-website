import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { CirclePicker } from 'react-color';
import { ChromePicker } from 'react-color';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateProfileInput = ({ label, type, name, options, required, value, setValue, className }) => {
    const [colorPickerVisibility, setColorPickerVisibility] = useState(false);

    const findLabel = (element, num = 0) => {
        if (element.parentNode.classList.contains("cp-input")) {
            return element.parentNode;
        } else {
            if (num < 10) {
                return findLabel(element.parentNode, num + 1);
            } else {
                return null;
            }
        }
    }
    const handleFocus = (e) => {
        const label = findLabel(e.target);
        if (label) {
            label.classList.add("cp-highlight");
        }
    }
    const handleBlur = (e) => {
        const label = findLabel(e.target);
        if (label) {
            label.classList.remove("cp-highlight");
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        if (setValue) {
            setValue(e.target.value);
        }
    }
    const handleDateChange = (e) => {
        setStartDate(startDate)
        // setValue(e.target.value);
    }
    const handleSwitchChange = () => {
        return (setValue ? {
            value: options.find(option => option.label == value),
            onChange: (e) => { setValue(e.value); }
        } : {})
    }
    const handleColorChange = (color, e) => {
        setValue(color.hex);
    }
    switch (type) {
        case 'select':
            return (
                <label className="cp-input" >
                    <p>{label}{required ? <span className="cp-required">*</span> : ''}</p>
                    <Select
                        className="tw-text-md"
                        options={options}
                        name={name}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...handleSwitchChange()}
                    />
                </label>
            );
        case 'color':
            return (
                <label className="cp-input">
                    <p>{label}{required ? <span className="cp-required">*</span> : ''}</p>
                    <CirclePicker colors={options} onChange={handleColorChange} />
                </label>
            );
        case 'background':
            return (
                <label className="cp-input">
                    <p>{label}{required ? <span className="cp-required">*</span> : ''}</p>
                    <div className="color-picker-toggle">
                        <div 
                        className="cpt-btn" 
                        onClick={() => setColorPickerVisibility(!colorPickerVisibility)} 
                        style={colorPickerVisibility ? {backgroundColor: "#8a8a8a"} : {backgroundColor: "#393b97"}}
                        >
                            {!colorPickerVisibility ? 'Pick a Color' : 'Close Color Picker'}
                        </div>
                    </div>
                    {colorPickerVisibility && (<div className="react-color">
                        <ChromePicker color={value} onChange={handleColorChange} />
                    </div>)}
                </label>
            );
        case 'date':
            return (
                <label className="cp-input">
                    <p>{label}{required ? <span className="cp-required">*</span> : ''}</p>
                    <DatePicker
                        minDate={name === "birthday" && new Date(1950, 0, 1)}
                        maxDate={name === "birthday" && new Date(2010, 11, 31)}
                        minDate={name === "expectedGraduationYear" && new Date(1970, 0, 1)}
                        className="datepicker"
                        value={value}
                        selected={value}
                        onChange={(date) => { setValue(date) }}
                        dateFormat="MM/dd/yyyy"
                        placeholder="mm/dd/yyyy"
                        required
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </label>
            );
        default:
            return (
                <label className={`cp-input ${className}`}>
                    <p>{label}{required ? <span className="cp-required">*</span> : ''}</p>
                    <input
                        type={type}
                        name={name}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={value}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>
            );
    }

}

export default CreateProfileInput;
