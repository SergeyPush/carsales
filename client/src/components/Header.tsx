import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/useHttp";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { fetch } = useHttp("/user/username", "GET");
  const [username, setUserName] = useState("");

  useEffect(() => {
    async function getUsername() {
      const response = await fetch();
      if (response && response.data) {
        setUserName(response.data.name);
      }
    }
    if (isAuthenticated) {
      getUsername();
    }
  }, [isAuthenticated, fetch]);

  return (
    <div className="w-full bg-gray-200">
      <div className=" w-10/12 md:w-8/12 flex justify-between m-auto">
        <Link
          to="/"
          className="flex py-2 uppercase font-bold text-xl text-indigo-600"
        >
          CarSale
        </Link>
        <ul className="hidden md:inline-flex text-indigo-600">
          <li className="my-auto mx-2 font-semibold">
            <NavLink to="/" exact activeClassName="text-red-400">
              Home
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className="my-auto mx-2 font-semibold">
              <NavLink to="/mycars" activeClassName="text-red-400">
                My cars
              </NavLink>
            </li>
          )}
          <li className="my-auto mx-2 font-semibold">
            <NavLink to="/addcar" activeClassName="text-red-400">
              Add car
            </NavLink>
          </li>
          {isAuthenticated && username && (
            <li className="my-auto mx-2 font-semibold">
              <NavLink to="/user" activeClassName="text-red-400">
                {username}
              </NavLink>
            </li>
          )}

          {!isAuthenticated && (
            <li className="my-auto mx-2 font-semibold">
              <NavLink to="/auth" activeClassName="text-red-400">
                Login
              </NavLink>
            </li>
          )}

          <li className="my-auto mx-2 font-semibold">
            {isAuthenticated && (
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            )}
          </li>
        </ul>
        <div className="text-indigo-900 md:hidden">
          <svg
            className="fill-current h-10 w-10"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
