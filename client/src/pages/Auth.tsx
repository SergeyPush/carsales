import React, { useState, MouseEvent, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { AuthContext } from "../context/authContext";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { login } = useContext(AuthContext);
  const path = hasAccount ? "register" : "login";
  const { fetch, error } = useHttp(`/auth/${path}`);

  const validate = (): boolean => {
    if (!(!!email && !!password)) {
      return true;
    }
    return false;
  };

  const handleSubmitForm = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch({
      name,
      email,
      password,
    });
    // setName("");
    // setPassword("");
    // setEmail("");

    if (response && response.token) {
      login(response.token, response.userId);
      history.push("/");
    }
  };

  return (
    <div className="flex justify-center align-center pt-32 w-full">
      <div className="bg-gray-200 md:w-6/12 xl:w-4/12 border rounded-lg border-gray-400 p-2 shadow-lg">
        <form action="" onSubmit={handleSubmitForm}>
          <div className="flex flex-col px-3 py-4 relative">
            {error && (
              <span className="text-red-500 text-xs absolute top-0">
                {error && error.response.data.message}
              </span>
            )}
            {hasAccount && (
              <input
                type="text"
                className="p-3 mb-3 border rounded-lg outline-none text-indigo-600"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            )}
            <input
              type="mail"
              className="p-3 mb-3 border rounded-lg outline-none text-indigo-600"
              placeholder="Mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="p-3 mb-3 border rounded-lg outline-none text-indigo-600"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div className="flex">
              <p className="text-sm text-indigo-400 mr-4 my-1">
                {hasAccount ? "Already has account?" : "Do not have account?"}
              </p>
              <button
                type="button"
                className="text-sm text-indigo-600 outline-none border-0 focus:outline-none"
                onClick={() => {
                  setHasAccount((hasAccount) => !hasAccount);
                }}
              >
                {hasAccount ? "Login" : "Register"}
              </button>
            </div>

            <button
              type="submit"
              className={`p-2 border border-indigo-400 text-indigo-600 m-0 mt-3 mx-16 rounded hover:bg-indigo-300 uppercase focus:shadow-outline ${
                validate() ? "opacity-50 cursor-not-allowed" : null
              }`}
              disabled={validate()}
            >
              {hasAccount ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
