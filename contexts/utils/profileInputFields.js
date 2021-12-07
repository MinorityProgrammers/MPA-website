import {
  languages, degrees, universities, polars, softSkills, programmingLanguages, proficiencies,
} from './fields';

export const firstNameField = {
  name: 'firstName',
  type: 'text',
  label: 'First Name',
  options: [],
  required: true,
};
export const lastNameField = {
  name: 'lastName',
  type: 'text',
  label: 'Last Name',
  options: [],
  required: true,
};
export const birthdateField = {
  name: 'birthday',
  type: 'date',
  label: 'Date Of Birth',
  options: [],
  required: true,
};
export const hometownField = {
  name: 'hometown',
  type: 'text',
  label: 'Hometown',
  options: [],
  required: true,
};
export const primaryLanguageField = {
  name: 'primaryLanguage',
  type: 'select',
  label: 'Primary Language',
  options: languages,
  required: true,
};

// page 2
export const educationLevelField = {
  name: 'educationLevel',
  type: 'select',
  label: 'Level of Education',
  options: degrees,
  required: true,
};
export const schoolNameField = {
  name: 'schoolName',
  type: 'text',
  label: 'School Name',
  options: [],
  required: true,
};
export const expectedGraduationYearField = {
  name: 'expectedGraduationYear',
  type: 'date',
  label: 'Expected Year of Graduation',
  options: [],
  required: true,
};
export const graduationStatusField = {
  name: 'graduationStatus',
  type: 'select',
  label: 'Did You Graduate?',
  options: polars,
  required: true,
};
export const degreeField = {
  name: 'degree',
  type: 'text',
  label: 'Degree/Certification',
  options: [],
  required: true,
};

// page 3
export const usernameField = {
  name: 'userName',
  type: 'text',
  label: 'Create Username',
  options: [],
  required: true,
};

// page 4
export const passionsField = {
  name: 'passions',
  type: 'text',
  label: 'Passions',
  options: [],
  required: false,
};
export const softSkillsField = {
  name: 'softSkills',
  type: 'select',
  label: 'Soft Skills',
  options: softSkills,
  required: false,
};
export const programmingLanguagesField = {
  name: 'programmingSkills',
  type: 'select',
  label: 'Programming Skills',
  options: programmingLanguages,
  required: false,
};
export const proficiencyField = {
  name: 'proficiency',
  type: 'select',
  label: 'Proficiency',
  options: proficiencies,
  required: false,
};
