import React, { useState, createContext } from 'react';

export const uprContext = createContext();

// settings pages provider

export var SettingsPagesProvider = function ({ children }) {
  const [updatePasswordRedirection, setUpdatePasswordRedirection] = useState(false);

  return (
    <uprContext.Provider
      value={{
        updatePasswordRedirection,
        setUpdatePasswordRedirection,
      }}
    >
      {children}
    </uprContext.Provider>
  );
};
