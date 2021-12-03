import React from 'react';

// if prop grid true, child elements are displayed in rows with two cells
const CreateProfileForm = ({ children, grid = false }) => {
    return (
        <div className={`cp-form ${grid && 'cp-formGrid'}`}>
            {children}
        </div>
    );
}

export default CreateProfileForm;