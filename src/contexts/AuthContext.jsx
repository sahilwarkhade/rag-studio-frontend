import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/apis/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const userData = await authAPI.getProfile();
          setUser(userData);
        } catch (error) {
          console.error("Session restoration failed:", error);
          setUser(null);
          localStorage.removeItem("accessToken");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);


  const login = async (credentials, navigate) => {
    try {
      const userData = await authAPI.login(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      localStorage.removeItem("accessToken");
    }
  };

  const register = async (data, navigate) => {
    return await authAPI.register(data, navigate);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    setLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading session...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
