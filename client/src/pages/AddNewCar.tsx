// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { manufacturers, years } from "../data/staticData";
import { useHttp } from "../hooks/useHttp";
import { useHistory } from "react-router-dom";

const AddNewCar = () => {
  const { register, handleSubmit, errors } = useForm();
  const label = "block text-xl text-gray-700 mb-2";
  const dropdown =
    "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500";
  const required = <span className="text-red-500 text-lg">*</span>;

  const [images, setImages] = useState([]);
  const history = useHistory();

  const { fetch: post } = useHttp("/cars", "POST", "multipart/form-data");

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((item) => formData.append(item, data[item]));
    formData.delete("photos");

    for (let i = 0; i < data.photos.length; i++) {
      formData.append(`file${i}`, data.photos[i]);
    }
    await post(formData);

    history.push("/");
  };

  const handleAddfiles = (e: any) => {
    for (var i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = function () {
        setImages((images) => [...images, reader.result]);
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  };

  const handleImageDelete = (id) => {
    setImages((images) => images.filter((image, i) => id !== i));
  };
  return (
    <div className="lg:w-8/12 md:mx-auto">
      <h1 className="text-2xl text-gray-600 text-center">Add new car</h1>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-6">
          <label
            htmlFor="manufacturer"
            className="block text-xl text-gray-700 mb-2"
          >
            Manufacturer {required}
          </label>
          <select
            name="manufacturer"
            id="manufacturer"
            placeholder="Vendor"
            ref={register}
            className={dropdown}
          >
            <option value="select">select...</option>
            {manufacturers.map((item, id) => (
              <option value={item} key={id}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="relative mb-6">
          <label htmlFor="car_model" className={label}>
            Model {required}
            {errors && (
              <span className="text-xs pl-2 text-red-500">
                {errors.car_model?.message}
              </span>
            )}
          </label>

          <input
            type="text"
            name="car_model"
            id="car_model"
            placeholder="Enter car model..."
            autoComplete="off"
            ref={register({ required: "Model is required", minLength: 2 })}
            className={dropdown}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="price" className={label}>
            Price {required}
            {errors && (
              <span className="text-xs pl-2 text-red-500">
                {errors.price?.message}
              </span>
            )}
          </label>
          <input
            name="price"
            type="number"
            className={dropdown}
            placeholder="Provide reasonable price"
            ref={register({ required: "Price is required", minLength: 2 })}
            autoComplete="off"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="mileage" className={label}>
            Mileage {required}
            {errors && (
              <span className="text-xs pl-2 text-red-500">
                {errors.mileage?.message}
              </span>
            )}
          </label>
          <input
            name="mileage"
            type="number"
            className={dropdown}
            placeholder="Provide current mileage"
            ref={register({ required: "Mileage is required", minLength: 2 })}
            autoComplete="off"
          />
        </div>

        <div className="relative mb-6">
          <label htmlFor="gear" className={label}>
            Gear type {required}
          </label>
          <select name="gearType" id="gear" ref={register} className={dropdown}>
            <option value="mechanical">select...</option>
            <option value="mechanical">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        <div className="relative mb-6">
          <label htmlFor="year" className={label}>
            Year {required}
          </label>
          <select name="year" id="year" ref={register} className={dropdown}>
            <option value="">select...</option>
            {years
              .map((item, id) => {
                return (
                  <option value={item} key={id}>
                    {item}
                  </option>
                );
              })
              .reverse()}
          </select>
        </div>

        <div className="mb-6">
          <label className={label}>Ready for exchange</label>
          <label htmlFor="exchange">
            <input
              type="checkbox"
              name="exchange"
              id="exchange"
              className="mr-2 leading-tight"
              ref={register}
            />
            <span className="select-none text-gray-600">
              Check if you are ready to change to other auto
            </span>
          </label>
        </div>

        <div className="relative mb-6">
          <label htmlFor="description" className={label}>
            Description
          </label>
          <textarea
            name="description"
            id="description"
            cols={100}
            rows={5}
            placeholder="Enter few words about your car"
            ref={register}
            className={dropdown}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className={label}>Photos</label>
          <label
            htmlFor="photos"
            className="text-gray-600 font-semibold uppercase border rounded border-gray-600 px-4 py-2 cursor-pointer inline-block text-sm hover:bg-gray-600 hover:text-white"
          >
            Add few files
          </label>
          <input
            multiple
            name="photos"
            type="file"
            id="photos"
            ref={register}
            className="text-white opacity-0 absolute"
            title="Add one or multiple photos"
            autoComplete="off"
            onChange={(e) => handleAddfiles(e)}
          />
          {images && (
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
              {images.map((image, id) => (
                <div key={id} className="relative">
                  <div
                    className="absolute z-50 text-white top-0 right-0 cursor-pointer border-2 border-white rounded-full mt-1 mr-1 hover:text-red-500 hover:border-red-500"
                    onClick={() => handleImageDelete(id)}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="x w-6 h-6 fill-current"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <img
                    className="block object-cover w-full h-32 relative"
                    src={image}
                  ></img>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="bg-transparent hover:bg-indigo-500 text-indigo-600 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded uppercase">
          Create car
        </button>
      </form>
    </div>
  );
};

export default AddNewCar;
