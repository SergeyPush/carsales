import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import { useHttp } from "../hooks/useHttp";
import Loader from "../components/Loader";

const MyCars = () => {
  const { fetch, isLoading } = useHttp("/cars/mycars", "GET");
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getListOfCars() {
      const response = await fetch();
      setData(response && response.data);
    }

    getListOfCars();
  }, [fetch]);

  return (
    <div>
      {!isLoading ? (
        <>
          <h1 className="text-center text-gray-600 text-4xl mb-6">
            List of your cars
          </h1>
          <div className="grid grid-cols-4 gap-8">
            {data &&
              data.length > 0 &&
              data.map((car: any) => <CarCard car={car} key={car._id} />)}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MyCars;
