import React from 'react';

const Input = (props) => {
  const {
    id, type, name, placeholder, value, onChange, ...rest
  } = props;
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export const CustomInput = ({ field, ...rest }) => (
  <Input
    id={field.name}
    name={field.name}
    placeholder={field.label}
    type={field.type}
    value={field.value || ''}
    {...rest}
  />
);

export const TextInput = (props) => (
  <Input type="text" {...props} />
);

export const PasswordInput = (props) => (
  <Input type="password" {...props} />
);

export const EmailInput = (props) => (
  <Input type="email" {...props} />
);

export const SearchInput = (props) => (
  <Input type="search" {...props} />
);
