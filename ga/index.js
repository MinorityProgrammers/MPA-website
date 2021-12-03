// log the pageview with their URL
export const pageview = (url) => {
  window.gtag("config", process.env.GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag("event", action, params);
};
