import axios from "axios";
import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/authContext";
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const useHttp = (
  path,
  method = "POST",
  contentType = "application/json"
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

  const fetch = useCallback(
    async (payload = null) => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await axios({
          method,
          url: path,
          data: payload,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": contentType,
          },
        });

        return data.data;
      } catch (error) {
        setIsLoading(false);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [contentType, method, path, token]
  );

  return { fetch, isLoading, error, setError };
};
