import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res =
          await API.get(
            "/auth/profile"
          );

        console.log(
          "PROFILE DATA:",
          res.data
        );

        setUser(
          res.data.user ||
            res.data
        );
      } catch (error) {
        console.error(error);

        localStorage.removeItem(
          "token"
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);