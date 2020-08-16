import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  id: null,
  login: (token: any, id: any) => {},
  logout: () => {},
  isAuthenticated: false,
});
