import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {

  STATE


  useEffect(() => {
    fetchUser('/me', 'GET')
  }, []);

  const fetchUser = async (url, method, body = false) => {
    // LOGIN ERRORS
    const messages = (url, err) => {
      if (url === "/login") {
        setLoginError(err)
      } else if (url === "/signup") {
        setSignUpError(err)
      }
    }
    // MIGHT have a body, sending user signup / login or user requests
    try {
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        navigate('/');
      } else if (response.status === 401) {
        // LIST MESSAGES for response error
      }
    } catch (error) {
      // LIST MESSAGES for HTTP error
    }
  };


  return (
    <UserContext.Provider
      value={{
        STATE
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };