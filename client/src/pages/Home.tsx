import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import CarCard from "../components/CarCard";
import { useHttp } from "../hooks/useHttp";

const Home = () => {
  const { fetch, isLoading } = useHttp("/cars", "GET");
  const [cars, setCars] = useState([]);
  useEffect(() => {
    async function getListOfCars() {
      const response = await fetch();
      setCars(response && response.cars);
    }

    getListOfCars();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h1 className="text-center text-gray-600 text-4xl mb-6">
            List of cars
          </h1>
          <div className="grid grid-cols-4 gap-8">
            {cars &&
              cars.map((car: any) => <CarCard car={car} key={car._id} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
