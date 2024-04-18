import React, { createContext, useState } from "react";

export const loggedInContext = createContext();

export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ user_id, setUser_id ] = useState(0)
  const [ refreshToggle, setRefreshToggle ] = useState(false)
  return (
    <loggedInContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user_id,
        setUser_id,
        refreshToggle,
        setRefreshToggle
      }}
    >
      {children}
    </loggedInContext.Provider>
  );
};