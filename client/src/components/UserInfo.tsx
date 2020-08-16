import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import Loader from "./Loader";

interface UserInfo {
  name: String;
  second_name: String;
  phone: String;
  email: String;
}

const UserInfo = ({ userId }: any) => {
  const [user, setUser] = useState<UserInfo>();
  const { fetch, isLoading } = useHttp(`/user/userinfo?owner=${userId}`, "GET");

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch();
      setUser({ ...response.data });
    }

    getUserInfo();
  }, []);
  return (
    <div className="border-2 rounded-md mt-8 p-4">
      {!isLoading ? (
        <div>
          <h2 className="p-1 text-xl text-indigo-600">Contact Owner</h2>
          {user && (
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 text-gray-600">
              <div>
                <p className="p-1">
                  <span className="text-indigo-600 font-semibold">Name:</span>{" "}
                  {user.name}
                </p>
                <p className="p-1">
                  <span className="text-indigo-600 font-semibold">
                    Second name:
                  </span>{" "}
                  {user.second_name}
                </p>
              </div>
              <div>
                <p className="p-1">
                  <span className="text-indigo-600 font-semibold">Phone:</span>{" "}
                  {user.phone}
                </p>
                <p className="p-1">
                  <span className="text-indigo-600 font-semibold">Email:</span>{" "}
                  {user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserInfo;
