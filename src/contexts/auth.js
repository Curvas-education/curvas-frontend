import React, { createContext, useState, useEffect } from "react";
import {
  isAuthenticated,
  logout as unauthenticate,
  authenticate,
} from "../services/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      let { user } = await isAuthenticated();

      user && setUser(JSON.parse(user));

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const logout = async () => {
    await unauthenticate();
    setUser(null);
  };

  const login = async (login, password) => {
    let { user } = await authenticate(login, password);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, signed: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
