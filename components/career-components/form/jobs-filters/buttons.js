import React from "react";

const Button = ({ className, children, ...rest }) => (
  <button type="button" className={className} {...rest}>
    {children}
  </button>
);

export const ExpandButton = ({ onClick, children, ...rest }) => (
  <Button
    className="job-filter-item-title"
    onClick={(e) => onClick(e.currentTarget)}
    {...rest}
  >
    {children}
    <i className="tw-ml-3 fas fa-chevron-down"></i>
  </Button>
);

export const CancelButton = ({ onClick, ...rest }) => (
  <div className="job-filter-item-form-options">
    <Button
      className="job-filter-item-form-options-cancel"
      onClick={(e) => onClick(e.currentTarget)}
      {...rest}
    >
      Cancel
    </Button>
  </div>
);

export const ResetButton = ({ onClick, ...rest }) => (
  <Button className="job-filter-reset" onClick={() => onClick()} {...rest}>
    Clear filter
  </Button>
);
