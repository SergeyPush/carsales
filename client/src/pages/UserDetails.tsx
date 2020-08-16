// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHttp } from "../hooks/useHttp";
import { AuthContext } from "../context/authContext";
import Loader from "../components/Loader";

const UserDetails = () => {
  const [user, setUser] = useState();
  const { fetch, isLoading } = useHttp("/user/userdata", "GET");
  const { fetch: patch, isLoading: isUpdating } = useHttp(
    "/user/userdata",
    "PATCH"
  );

  const { register, handleSubmit } = useForm();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function getUserData() {
      const { data } = await fetch();
      setUser(data);
    }
    if (isAuthenticated) {
      getUserData();
    }
  }, []);

  const onSubmit = async (data: any) => {
    await patch(data);
  };
  const label = "block text-lg text-gray-700 mb-2";
  const input =
    "block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full";

  const fields = [
    { name: "name", label: "First Name", type: "text", disabled: false },
    {
      name: "second_name",
      label: "Second name",
      type: "text",
      disabled: false,
    },
    { name: "email", label: "Email", type: "email", disabled: true },
    { name: "phone", label: "Phone", type: "text", disabled: false },
  ];

  return (
    <div className="lg:w-8/12 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {user ? (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {fields.map((field, id) => {
                const field_name = field.name;

                return (
                  <div className="" key={id}>
                    <label htmlFor={field.name} className={label}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      ref={register}
                      id={field.name}
                      name={field.name}
                      className={`${input} ${
                        field.disabled ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                      autoComplete="off"
                      defaultValue={user[field_name]}
                      disabled={field.disabled}
                    />
                  </div>
                );
              })}
            </div>

            <div className="text-right">
              <button
                type="submit"
                className={`px-4 py-2 border border-indigo-500 rounded-md uppercase text-indigo-500 hover:text-white hover:bg-indigo-500 focus:outline-none font-semibold ${
                  isUpdating && "opacity-75 cursor-not-allowed"
                }`}
                disabled={isUpdating}
              >
                Save data
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </form>
    </div>
  );
};

export default UserDetails;
