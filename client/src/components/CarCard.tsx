import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CarCard = ({ car }: any) => {
  return (
    <motion.div
      className="rounded overflow-hidden shadow-lg mb-5"
      whileHover={{ scale: 1.1 }}
    >
      <Link to={`/car/${car._id}`}>
        <div className="h-40">
          {car.photos[0] ? (
            <img
              src={car.photos[0]}
              alt="Car"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex justify-center items-center h-full bg-gray-200">
              <p className="text-center text-gray-500">No photo</p>
            </div>
          )}
        </div>
        <div className="px-3">
          <span className="mr-1 text-gray-600 text-md">{car.manufacturer}</span>
          <span className="text-gray-500 text-md">{car.model}</span>
        </div>
        <p className="px-3 text-md text-gray-500">{car.year}</p>
      </Link>
    </motion.div>
  );
};

export default CarCard;
