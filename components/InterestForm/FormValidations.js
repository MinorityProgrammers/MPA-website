const validateSection_1 = (values) => {
  if (values.profession !== 'student' && values.profession.length !== 0) return {};
  if (values.profession.length === 0 && values.profession !== 'student') return { profession: 'Please select a profession' };
  return {};
};

const validateSection_2 = (values) => {
  if (values.level.length === 0) return { level: 'Please select your level of education' };
  return {};
};

const validateSection_3 = (values) => {
  if (values.location.length === 0 || values.country.length === 0 || values.city.length === 0) return { school: 'Please fill in the missing fields' };
  return {};
};

const validateSection_4 = (values) => {
  if (values.interest.length === 0) return { interest: 'Please pick atleast one of your interests' };
  return {};
};
const validateSection_5 = (values) => {
  if (values.passion.length === 0) return { passion: 'Please pick atleast one of your passions' };
  return {};
};
const validateSection_6 = (values) => {
  if (values.description.length === 0) return { reasons: 'Please fill in the missing fields' };
  return {};
};

const validateSection_7 = (values) => {
  if (values.mission.length === 0) return { support: 'Please fill in the missing fields' };
  return {};
};

const validateSection_9 = (values) => {
  if (values.contact.length === 0) return { contact: 'Please select how we may contact you' };
  if (values.email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      return { contact: 'Invalid email address' };
    }
  }
  return {};
};

export const validateField = ({
  section_1, section_2, section_3, section_4, section_5, section_7, section_6,
}, values) => {
  if (section_1) {
    return validateSection_1(values);
  } if (section_2) {
    return validateSection_2(values);
  } if (section_3) {
    return validateSection_3(values);
  } if (section_4) {
    return validateSection_4(values);
  } if (section_5) {
    return validateSection_5(values);
  }
  if (section_6) {
    return validateSection_6(values);
  }
  if (section_7) {
    return validateSection_7(values);
  }
  // if (section_8) {
  //   return validateSection_8(values);
  // }
  return {};
};

export const validateStepper = (sections, values, nextStep) => {
  const sectionsToArray = Object.keys(sections);
  const indexOfNextStep = sectionsToArray.indexOf(nextStep);
  for (let i = 0; i < indexOfNextStep; i + 1) {
    if (sectionsToArray[i] === 'section_1' && Object.keys(validateSection_1(values)).length !== 0) {
      return { profession: 'Field 1 is required' };
    } if (sectionsToArray[i] === 'section_2' && Object.keys(validateSection_2(values)).length !== 0) {
      return { interest: 'Field 2 is required' };
    } if (sectionsToArray[i] === 'section_3' && Object.keys(validateSection_3(values)).length !== 0) {
      return { passion: 'Field 3 is required' };
    } if (sectionsToArray[i] === 'section_4' && Object.keys(validateSection_4(values)).length !== 0) {
      return { reasons: 'Field 4 is required' };
    } if (sectionsToArray[i] === 'section_5' && Object.keys(validateSection_5(values)).length !== 0) {
      return { support: 'Field 5 is required' };
    }
    if (sectionsToArray[i] === 'section_7' && Object.keys(validateSection_7(values)).length !== 0) {
      return { contact: 'Field 7 is required' };
    }
    if (sectionsToArray[i] === 'section_9' && Object.keys(validateSection_9(values)).length !== 0) {
      return { contact: 'Field 7 is required' };
    }
  }
  return {};
};

export const validateForm = (values) => {
  if (Object.entries(validateSection_1(values)).length !== 0) return validateSection_1(values);
  if (Object.entries(validateSection_3(values)).length !== 0) return validateSection_3(values);
  if (Object.entries(validateSection_4(values)).length !== 0) return validateSection_4(values);
  if (Object.entries(validateSection_5(values)).length !== 0) return validateSection_5(values);
  if (Object.entries(validateSection_6(values)).length !== 0) return validateSection_6(values);
  if (Object.entries(validateSection_7(values)).length !== 0) return validateSection_7(values);
  if (Object.entries(validateSection_9(values)).length !== 0) return validateSection_9(values);
  return {};
};
