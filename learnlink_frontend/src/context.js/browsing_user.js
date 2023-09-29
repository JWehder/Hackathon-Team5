import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BrowsingUserContext = React.createContext();

function UserProvider({ children }) {

  STATE


  return (
    <BrowsingUserContext.Provider
      value={{
        STATE
      }}
    >
      {children}
    </BrowsingUserContext.Provider>
  );
}

export { BrowsingUserContext, BrowsingUserProvider };