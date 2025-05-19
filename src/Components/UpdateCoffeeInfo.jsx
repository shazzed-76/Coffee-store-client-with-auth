import React, { use, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { CoffeeContext } from '../Context/CoffeeProvider';
import status from 'daisyui/components/status';

const UpdateCoffeeInfo = () => {
    const navigate = useNavigate();
    const coffeeData = useLoaderData();
   const { setStatus, status } = use(CoffeeContext)
    // const { coffees } = use(CoffeeContext)

    const handleUpdateInfo = (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const updatedData = Object.fromEntries(formData.entries());

      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          //send the form data in the server and update the data that matched the id
          fetch(`https://coffee-store-server-with-auth-sooty.vercel.app/coffees/${coffeeData._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount) {
                setStatus(!status)
                Swal.fire({
                  title: "Updated!",
                  text: "Your data has been updated.",
                  icon: "success",
                });
              }
            });
        }
      });
    };
  
    
    return (
      <section className="max-w-7xl mx-auto px-56 py-20">
        <button className="btn mb-2" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="bg-[#f4f3f0] p-10">
          <h1 className="text-4xl lg:5xl font-semibold text-center mb-4">
            Add New Coffee
          </h1>
          <p className="text-sm font-normal text-center px-3">
            It is a long established fact that a reader will be distraceted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here.
          </p>
          <form onSubmit={handleUpdateInfo} className="py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <fieldset className="">
                <label className="label">Name</label>
                <input
                 type="text"
                  defaultValue={coffeeData?.coffeeName}                 
                  className="input w-full"
                  name="coffeeName"
                  placeholder="Enter coffee name"
                />
              </fieldset>
              <fieldset className="">
                <label className="label">Price</label>
                <input
                 type="text"
                  defaultValue={coffeeData?.price}
                  className="input w-full"
                  name="price"
                  placeholder="Enter price"
                />
              </fieldset>
              <fieldset className="">
                <label className="label">Qualtity</label>
                <input
                 type="text"
                  defaultValue={coffeeData?.quantity}
                  className="input w-full"
                  name="quantity"
                  placeholder="Enter quantity"
                />
              </fieldset>
              <fieldset className="">
                <label className="label">Taste</label>
                <input
                 type="text"
                  defaultValue={coffeeData?.taste}
                  className="input w-full"
                  name="taste"
                  placeholder="Enter taste"
                />
              </fieldset>
              <fieldset className="">
                <label className="label">Category</label>
                <input
                 type="text"
                  defaultValue={coffeeData?.category}
                  className="input w-full"
                  name="category"
                  placeholder="Enter category"
                />
              </fieldset>
              <fieldset className="">
                <label className="label">Details</label>
                <input
                 type="text"
                  defaultValue={coffeeData?.datails}
                  className="input w-full"
                  name="datails"
                  placeholder="Enter details"
                />
              </fieldset>
            </div>
            <fieldset className="mt-3">
              <label className="label">Photo</label>
              <input
               type="text"
                  defaultValue={coffeeData?.photoUrl}
                className="input w-full"
                name="photoUrl"
                placeholder="Enter photo url"
              />
            </fieldset>
            <button
              type="submit"
              className="btn w-full bg-[#d2b48c] text-white mt-3"
            >
              Update Coffee
            </button>
          </form>
        </div>
      </section>
    );
};

export default UpdateCoffeeInfo;