import React, { Provider } from "react";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { token, id, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const Routes = useRoutes(isAuthenticated);
  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{ token, id, login, logout, isAuthenticated }}
      >
        <div>
          <Header></Header>
          <div className="w-10/12 md:w-8/12 mx-auto py-8">{Routes}</div>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
