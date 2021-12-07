export const getLevelUpTips = (data) => [
  {
    name: 'First name',
    missing: !data?.firstName,
    route: '/settings/profile/details',
  },
  {
    name: 'Last name',
    missing: !data?.lastName,
    route: '/settings/profile/details',
  },
  {
    name: 'Birthday',
    missing: !data?.birthday,
    route: '/settings/profile/details',
  },
  {
    name: 'Gender',
    missing: !data?.Gender,
    route: '/settings/profile/details',
  },
  {
    name: 'Phone number',
    missing: !data?.phoneNumber,
    route: '/settings/profile/details',
  },
  {
    name: 'Location',
    missing: !data?.location,
    route: '/settings/profile/details',
  },
  {
    name: 'Nationality',
    missing: !data?.Nationality,
    route: '/settings/profile/details',
  },
  {
    name: 'Ethnicity',
    missing: !data?.Ethnicity?.length,
    route: '/settings/profile/details',
  },

  { name: 'Bio', missing: !data?.bio, route: '/settings/profile/overview' },
  {
    name: 'Primary language',
    missing: !data?.primaryLanguage,
    route: '/settings/profile/overview',
  },

  {
    name: 'Facebook link',
    missing: !data?.FacebookLink,
    route: '/settings/profile/media',
  },
  {
    name: 'Linkedin link',
    missing: !data?.LinkedinLink,
    route: '/settings/profile/media',
  },
  {
    name: 'Github link',
    missing: !data?.GithubLink,
    route: '/settings/profile/media',
  },
  {
    name: 'Google link',
    missing: !data?.GoogleLink,
    route: '/settings/profile/media',
  },
  {
    name: 'Figma link',
    missing: !data?.FigmaLink,
    route: '/settings/profile/media',
  },
  {
    name: 'Dribble link',
    missing: !data?.DribbleLink,
    route: '/settings/profile/media',
  },
  {
    name: 'Clickup link',
    missing: !data?.ClickupLink,
    route: '/settings/profile/media',
  },

  {
    name: 'Passions',
    missing: !(
      !!data?.passions?.length
        && (data.passions.length === 1 ? data.passions[0] !== '' : true)
    ),
    route: '/settings/profile/background',
  },

  {
    name: 'Soft skills',
    missing: !(
      !!data?.softSkills?.length
        && (data.softSkills.length === 1 ? data.softSkills[0] !== '' : true)
    ),
    route: '/settings/profile/background',
  },

  {
    name: 'Programming skills',
    missing: !(
      !!data?.programmingSkills?.length
        && (data.programmingSkills.length === 1
          ? data.programmingSkills[0] !== ''
          : true)
    ),
    route: '/settings/profile/background',
  },

  {
    name: 'Education level',
    missing: !data?.educationLevel,
    route: '/settings/profile/education',
  },
  {
    name: 'School name',
    missing: !data?.schoolName,
    route: '/settings/profile/education',
  },
  {
    name: 'Entered high school year',
    missing: !data?.enteredHighSchoolYear,
    route: '/settings/profile/education',
  },
  {
    name: 'Expected graduation year',
    missing: !data?.expectedGraduationYear,
    route: '/settings/profile/education',
  },
  {
    name: 'Student status',
    missing: !data?.studentStatus,
    route: '/settings/profile/education',
  },
  {
    name: 'Degree',
    missing: !data?.degree,
    route: '/settings/profile/education',
  },
];
