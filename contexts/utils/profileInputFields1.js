import { useState } from 'react';
import {
  languages, degrees, universities, polars, softSkills, programmingLanguages, proficiencies,
} from './fields';
import CustomDate from './CustomDate';

export const all = {
  usernameField: {
    name: 'userName',
    type: 'text',
    label: 'Create Username',
    options: [],
    required: true,
  },
  // page2
  educationLevelField: {
    name: 'educationLevel',
    type: 'select',
    label: 'Level of Education',
    options: degrees,
    required: false,
  },
  schoolNameField: {
    name: 'schoolName',
    type: 'text',
    label: 'School Name',
    options: universities,
    required: false,
  },
  expectedGraduationYearField: {
    name: 'expectedGraduationYear',
    type: 'date',
    label: 'Expected Year of Graduation',
    options: [],
    required: false,
  },
  graduationStatusField: {
    name: 'graduationStatus',
    type: 'select',
    label: 'Did You Graduate?',
    options: polars,
    required: false,
  },
  degreeField: {
    name: 'degree',
    type: 'text',
    label: 'Degree/Certification',
    options: [],
    required: false,
  },
  // page 3
  firstNameField: {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    options: [],
    required: false,
  },
  lastNameField: {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    options: [],
    required: false,
  },
  birthdateField: {
    name: 'birthday',
    type: 'date',
    label: 'Date Of Birth',
    options: [],
    required: false,
  },
  hometownField: {
    name: 'hometown',
    type: 'text',
    label: 'Hometown',
    options: [],
    required: false,
  },
  primaryLanguageField: {
    name: 'primaryLanguage',
    type: 'select',
    label: 'Primary Language',
    options: languages,
    required: false,
  },
  // page 4
  passionsField: {
    name: 'passions',
    type: 'text',
    label: 'Passions',
    options: [],
    required: false,
  },
  softSkillsField: {
    name: 'softSkills',
    type: 'select',
    label: 'Soft Skills',
    options: softSkills,
    required: false,
  },
  programmingLanguagesField: {
    name: 'programmingSkills',
    type: 'select',
    label: 'Programming Skills',
    options: programmingLanguages,
    required: false,
  },
  proficiencyField: {
    name: 'proficiency',
    type: 'select',
    label: 'Proficiency',
    options: proficiencies,
    required: false,
  },

};
