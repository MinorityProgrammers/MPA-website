export const getProgressPercentage = (data) => {
  const userProfileDatas = [
    data?.firstName,
    data?.lastName,
    data?.birthday,
    data?.Gender,
    data?.phoneNumber,
    data?.location,
    data?.Nationality,
    data?.Ethnicity,

    data?.bio,
    data?.primaryLanguage,

    data?.FacebookLink,
    data?.LinkedinLink,
    data?.GithubLink,
    data?.GoogleLink,
    data?.FigmaLink,
    data?.DribbleLink,
    data?.ClickupLink,

    data?.passions,
    data?.softSkills,
    data?.programmingSkills,

    data?.educationLevel,
    data?.schoolName,
    data?.enteredHighSchoolYear,
    data?.expectedGraduationYear,
    data?.studentStatus,
    data?.degree,
  ];

  const datasInBool = [
    !!data?.firstName,
    !!data?.lastName,
    !!data?.birthday,
    !!data?.Gender,
    !!data?.phoneNumber,
    !!data?.location,
    !!data?.Nationality,
    !!data?.Ethnicity?.length,

    !!data?.bio,
    !!data?.primaryLanguage,

    !!data?.FacebookLink,
    !!data?.LinkedinLink,
    !!data?.GithubLink,
    !!data?.GoogleLink,
    !!data?.FigmaLink,
    !!data?.DribbleLink,
    !!data?.ClickupLink,

    !!data?.passions?.length
      && (data.passions.length === 1 ? data.passions[0] !== '' : true),

    !!data?.softSkills?.length
      && (data.softSkills.length === 1 ? data.softSkills[0] !== '' : true),

    !!data?.programmingSkills?.length
      && (data.programmingSkills.length === 1
        ? data.programmingSkills[0] !== ''
        : true),

    !!data?.educationLevel,
    !!data?.schoolName,
    !!data?.enteredHighSchoolYear,
    !!data?.expectedGraduationYear,
    !!data?.studentStatus,
    !!data?.degree,
  ];

  return Math.round(
    (datasInBool.filter((data) => data).length * 100) / userProfileDatas.length,
  );
};
