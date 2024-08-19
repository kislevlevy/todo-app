// Imports:
import { createContext, useState } from 'react';
import axios from 'axios';
import { BACK_END } from '../utils/config';

// Context initiation:
const AuthContext = createContext();

///////////////////////////////////////////////////
// Provider
export function AuthProvider({ children }) {
  // State veriables:
  const login = async function (body, setCurrentUser) {
    try {
      const reqConfig = {
        url: `${BACK_END}/api/v1/user/login`,
        method: 'post',
        data: body,
        withCredentials: true,
      };
      const { data } = await axios(reqConfig);
      return setCurrentUser({ ...data.user, isLogedIn: true });
    } catch (err) {
      console.log(err);
    }
  };
  const register = async function (body, setCurrentUser) {
    try {
      const reqConfig = {
        url: `${BACK_END}/api/v1/user/register`,
        method: 'post',
        data: body,
        withCredentials: true,
      };
      const { data } = await axios(reqConfig);

      return setCurrentUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };
  const logout = async function (setCurrentUser) {
    try {
      const reqConfig = {
        url: `${BACK_END}/api/v1/user/logout`,
        method: 'post',
        withCredentials: true,
      };
      await axios(reqConfig);

      return setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Set provider veriables:
  const globalVariables = {
    login,
    logout,
    register,
  };

  // Return Provider:
  return (
    <AuthContext.Provider value={globalVariables}>{children}</AuthContext.Provider>
  );
}
export default AuthContext;
