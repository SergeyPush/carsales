import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  const localStorageName = "userData";

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setId(id);
    localStorage.setItem(localStorageName, JSON.stringify({ jwtToken, id }));
  }, []);

  const logout = () => {
    console.log("Logout works");
    setToken("");
    setId("");
    localStorage.removeItem(localStorageName);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(localStorageName));
    if (data) {
      login(data.jwtToken, data.id);
    }
  }, [login]);
  return { token, id, login, logout };
};
