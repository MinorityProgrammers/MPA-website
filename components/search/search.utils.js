export const getJobs = (data, val) => {
  const filteredData =
    data &&
    data
      .filter(
        (value) =>
          (value.job_industry &&
            value.job_industry.toLowerCase().includes(val.toLowerCase())) ||
          (value.job_title &&
            value.job_title.toLowerCase().includes(val.toLowerCase())) ||
          (value.job_type &&
            value.job_type.toLowerCase().includes(val.toLowerCase())) ||
          (value.location &&
            value.location.toLowerCase().includes(val.toLowerCase()))
      )
      .filter((_, idx) => idx < 20);

  return filteredData;
};

export const getEvents = (data, val) => {
  const filteredData =
    data &&
    data
      .filter(
        (value) =>
          value.eventName &&
          value.eventName.toLowerCase().includes(val.toLowerCase())
      )
      .filter((_, idx) => idx < 20);
  return filteredData;
};
