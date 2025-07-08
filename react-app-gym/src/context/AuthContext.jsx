import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  useEffect(() => {
    // Sync admin on storage change (e.g., if logged out in another tab)
    const handleStorageChange = () => {
      const storedAdmin = localStorage.getItem("admin");
      setAdmin(storedAdmin ? JSON.parse(storedAdmin) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (adminData) => {
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
