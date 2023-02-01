import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import {
  isAuthenticated,
  logout as unauthenticate,
  authenticate,
} from "../services/auth";

import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStoragedData() {
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error?.response?.status === 401) {
            console.log("deslogado");
            logout();
            setUser(null);
            navigation.navigate("signin");
          }
          return error;
        }
      );

      let { user } = await isAuthenticated();

      user && setUser(JSON.parse(user));

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const logout = () => {
    unauthenticate();
    setUser(null);
  };

  const login = async (login, password, alert = () => { }) => {
    let { user, failed, message } = await authenticate({
      login,
      password,
    });
    if (failed || !user) {
      alert(message ?? "Ocorreu um erro durante a autenticação", "error");
      return;
    }
    setUser(user);
    alert("Você conseguiu se conectar a " + user, "success");
    return;
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
