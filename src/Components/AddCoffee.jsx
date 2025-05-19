import React, { use } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { CoffeeContext } from "../Context/CoffeeProvider";

const AddCoffee = () => {
    const navigate = useNavigate();
    const { coffees, setCoffees } = use(CoffeeContext);

    const hangleAddNewCoffee = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const coffeeData = Object.fromEntries(formData.entries())
        

        // send coffee data in the database
        fetch("https://coffee-store-server-with-auth-sooty.vercel.app/coffees", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(coffeeData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                coffeeData._id = data.insertedId;
                const newCoffees = [ ...coffees, coffeeData]
                setCoffees(newCoffees)
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Coffee added successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });

                form.reset()
            }
        });

        
    }
  return (
    <section className="max-w-7xl mx-auto px-56 py-20">
        <button className="btn mb-2" onClick={() => navigate(-1)}>Back</button>
      <div className="bg-[#f4f3f0] p-10">
        <h1 className="text-4xl lg:5xl font-semibold text-center mb-4">
          Add New Coffee
        </h1>
        <p className="text-sm font-normal text-center px-3">
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
        <form onSubmit={hangleAddNewCoffee} className="py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <fieldset className="">
              <label className="label">Name</label>
              <input
                type="text"
                className="input w-full"
                name="coffeeName"
                placeholder="Enter coffee name"
              />
            </fieldset>
            <fieldset className="">
              <label className="label">Price</label>
              <input
                type="text"
                className="input w-full"
                name="price"
                placeholder="Enter price"
              />
            </fieldset>
            <fieldset className="">
              <label className="label">Qualtity</label>
              <input
                type="text"
                className="input w-full"
                name="quantity"
                placeholder="Enter quantity"
              />
            </fieldset>
            <fieldset className="">
              <label className="label">Taste</label>
              <input
                type="text"
                className="input w-full"
                name="taste"
                placeholder="Enter taste"
              />
            </fieldset>
            <fieldset className="">
              <label className="label">Category</label>
              <input
                type="text"
                className="input w-full"
                name="category"
                placeholder="Enter category"
              />
            </fieldset>
            <fieldset className="">
              <label className="label">Details</label>
              <input
                type="text"
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
              className="input w-full"
              name="photoUrl"
              placeholder="Enter photo url"
            />
          </fieldset>
          <button type="submit" className="btn w-full bg-[#d2b48c] text-white mt-3">Add Coffee</button>
        </form>
      </div>
    </section>
  );
};

export default AddCoffee;
