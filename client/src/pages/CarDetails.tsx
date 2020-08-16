// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import ImageGalleryComponent from "../components/ImageGalleryComponent";
import { motion } from "framer-motion";
import { useHttp } from "../hooks/useHttp";
import Loader from "../components/Loader";
import { AuthContext } from "../context/authContext";
import Modal from "../components/Modal";
import UserInfo from "../components/UserInfo";
import "react-image-gallery/styles/css/image-gallery.css";

const CarDetails = () => {
  const match = useRouteMatch();
  const { id } = match.params;
  const [car, setCar] = useState();
  const { isAuthenticated, id: userId } = useContext(AuthContext);
  const { fetch } = useHttp(`/cars/${id}`, "GET");
  const { fetch: remove } = useHttp(`/cars/${id}`, "DELETE");
  const [isOpen, setIsOpen] = useState(false);
  const [galleryIsOpen, setGalleryIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    async function fetchCar() {
      const response = await fetch();
      setCar(response.car);
    }
    fetchCar();
  }, []);

  // TODO in future
  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };
  const handleOpenGallery = (id) => {
    setImageIndex(id);
    setGalleryIsOpen(true);
  };
  const handleDelete = async () => {
    await remove();
    setIsOpen(false);
    history.push("/");
  };

  return (
    <div className="lg:w-8/12 md:mx-auto">
      {car ? (
        <>
          <Modal
            show={isOpen}
            text=""
            onCancel={setIsOpen}
            onConfirm={handleDelete}
          />

          <ImageGalleryComponent
            show={galleryIsOpen}
            images={car.photos}
            close={setGalleryIsOpen}
            index={imageIndex}
          />

          {isAuthenticated && car.owner === userId && (
            <div className="flex justify-end">
              {/* <button
                className="py-1 px-4 border bg-orange-400 text-orange-700 rounded-md inline-flex items-center justify-center mr-2 hover:bg-orange-300 hover:text-orange-600 focus:outline-none"
                onClick={handleEdit}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
                <span>Edit</span>
              </button> */}
              <button
                className="py-1 px-4 border bg-red-400 text-red-700 rounded-md inline-flex items-center justify-center hover:bg-red-300 hover:text-red-600 focus:outline-none hover:shadow-sm"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="fill-current w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Delete</span>
              </button>
            </div>
          )}
          <h1 className="text-4xl text-gray-600 text-center mb-6">
            {car.manufacturer} {car.model}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {car.photos.length > 0
              ? car.photos.map((photo, id) => (
                  <motion.div
                    className="h-32"
                    key={id}
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      className="rounded shadow-lg object-cover w-full h-full cursor-pointer"
                      src={photo}
                      alt={photo}
                      onClick={() => handleOpenGallery(id)}
                    />
                  </motion.div>
                ))
              : null}
          </div>
          <p className="text-gray-600 text-3xl mb-4">
            {car.manufacturer} {car.model}
          </p>
          <p className="text-gray-600 text-2xl">Year</p>
          <p className="text-gray-600 text-lg mb-4 bg-gray-200 p-2 rounded">
            {car.year}
          </p>
          <p className="text-green-500 text-xl mb-4">Price: {car.price}$</p>
          <p className="text-gray-600 mb-4">{car.mileage} thousand/km</p>
          <div className="mb-6">
            <input
              type="checkbox"
              disabled
              className="mr-2"
              checked={car.exchange}
            />
            <span className="text-gray-600">Ready to exchange</span>
          </div>
          <p className="border rounded p-2 text-gray-600 h-32 bg-gray-200">
            {car.description}
          </p>
          <UserInfo userId={car.owner} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CarDetails;
