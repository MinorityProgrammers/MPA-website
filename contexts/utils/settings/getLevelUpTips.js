export default (data) => [
  {
    name: 'First name',
    missing: !data?.firstName,
    step: 1,
  },
  {
    name: 'Last name',
    missing: !data?.lastName,
    step: 1,
  },
  {
    name: 'Birthday',
    missing: !data?.birthday,
    step: 1,
  },
  {
    name: 'Gender',
    missing: !data?.Gender,
    step: 1,
  },
  {
    name: 'Phone number',
    missing: !data?.phoneNumber,
    step: 1,
  },
  {
    name: 'Location',
    missing: !data?.location,
    step: 1,
  },
  {
    name: 'Nationality',
    missing: !data?.Nationality,
    step: 1,
  },
  {
    name: 'Ethnicity',
    missing: !data?.Ethnicity?.length,
    route: '/settings/profile/details',
    step: 1,
  },

  { name: 'Bio', missing: !data?.bio, route: '/settings' },
  {
    name: 'Primary language',
    missing: !data?.primaryLanguage,
    step: 1,
  },

  {
    name: 'Facebook link',
    missing: !data?.FacebookLink,
    step: 4,
  },
  {
    name: 'Linkedin link',
    missing: !data?.LinkedinLink,
    step: 4,
  },
  {
    name: 'Github link',
    missing: !data?.GithubLink,
    step: 4,
  },
  {
    name: 'Google link',
    missing: !data?.GoogleLink,
    step: 4,
  },
  {
    name: 'Figma link',
    missing: !data?.FigmaLink,
    step: 4,
  },
  {
    name: 'Dribble link',
    missing: !data?.DribbleLink,
    step: 4,
  },
  {
    name: 'Clickup link',
    missing: !data?.ClickupLink,
    step: 4,
  },

  {
    name: 'Passions',
    missing: !(
      !!data?.passions?.length
        && (data.passions.length === 1 ? data.passions[0] !== '' : true)
    ),
    step: 3,
  },

  {
    name: 'Soft skills',
    missing: !(
      !!data?.softSkills?.length
        && (data.softSkills.length === 1 ? data.softSkills[0] !== '' : true)
    ),
    step: 3,
  },

  {
    name: 'Programming skills',
    missing: !(
      !!data?.programmingSkills?.length
        && (data.programmingSkills.length === 1
          ? data.programmingSkills[0] !== ''
          : true)
    ),
    step: 3,
  },

  {
    name: 'Education level',
    missing: !data?.educationLevel,
    step: 2,
  },
  {
    name: 'School name',
    missing: !data?.schoolName,
    step: 2,
  },
  {
    name: 'Entered high school year',
    missing: !data?.enteredHighSchoolYear,
    step: 2,
  },
  {
    name: 'Expected graduation year',
    missing: !data?.expectedGraduationYear,
    step: 2,
  },
  {
    name: 'Student status',
    missing: !data?.studentStatus,
    step: 2,
  },
  {
    name: 'Degree',
    missing: !data?.degree,
    step: 2,
  },
];
